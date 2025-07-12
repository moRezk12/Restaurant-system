import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City } from 'country-state-city';
import { SiteService } from 'src/app/Core/Services/Sites/site.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  branchForm ! : FormGroup;
  // Search
  searchTerm: string = '';

  mode : boolean = false;

  selectedId! : number ;

  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  totalBrances: number = 0;
  itemsPerPage: number = 10;

  allBrances: any = [];

  constructor(private fb: FormBuilder, private siteServices: SiteService) { }


  ngOnInit(): void {
    this.branchForm = this.fb.group({
      branchCode: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.getSites(this.currentPage); // أول صفحة
  }

  getSites(page: number = 1) {
    // this.itemsPerPage
    this.siteServices.getBranches(page).subscribe({
      next: (res: any) => {
        console.log( "get Branches");
        console.log(res);

        this.allBrances = res.message.branches;
        this.totalBrances = res.message.totalBranches;
        this.currentPage = res.message.page;
        this.totalPages = res.message.totalPages;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Search
  get searchedBrances() {

    return this.allBrances.filter((branch: any) =>
      branch.branchName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      branch.country.toLowerCase().includes(this.selectedCountryCode.toLowerCase())
    );
  }

  getDisplayedPages(): number[] {
    const visiblePages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let end = start + visiblePages - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.getSites(page); // جلب البيانات للصفحة الجديدة
    }
  }

  // Country
  countries = Country.getAllCountries(); // يجلب جميع الدول
  cities : any;

  selectedCountryCode: string = '';
  selectedCity: string = '';

  onCountryChange(code: string) {
    console.log('Selected country code:', code);
    console.log('Cities:', this.cities);
    console.log(Country.getAllCountries());
    this.cities = City.getCitiesOfCountry(code);
  }


  countriesform = Country.getAllCountries(); // يجلب جميع الدول
  citiesform : any;

  selectedCountryCodeform: string = '';
  selectedCityform: string = '';

  onCountryChangeform(code: string) {
    console.log('Selected country code:', code);
    console.log('Cities:', this.citiesform);
    console.log(Country.getAllCountries());
    this.citiesform = City.getCitiesOfCountry(code);
  }


  // popup
  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    this.mode = true;
  }

  closePopup() {
    this.showPopup = false;
    this.branchForm.reset();
    this.selectedCountryCodeform = '';
    this.selectedCityform = '';
    this.selectedCountryCode = '';
    this.selectedCity = '';
    this.mode = false;
  }


  // Create Branch
  onSubmit() {
    console.log(this.branchForm.value);

    if (!this.branchForm.valid) {
      return this.swalError('Please fill all required fields');
    }

    if(this.mode) {
      this.siteServices.createBranch(this.branchForm.value).subscribe({
        next : (res : any) => {
          this.swalSuccess(res.message.message);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success',
          //   text: res.message.message || 'Branch created successfully'  ,
          //   confirmButtonColor: '#28a745',
          //   confirmButtonText: 'OK',
          //   timerProgressBar: true,
          //   customClass: {
          //     confirmButton: 'mySuccess'
          //   }
          // }).then(() => {
          //   this.closePopup();
          //   this.branchForm.reset();
          // })
        },
        error : (err) => {
          this.swalError(err.error.message);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: err.error.message || 'An error occurred'  ,
          //   confirmButtonColor: '#dc3545',
          //   confirmButtonText: 'OK',
          //   timerProgressBar: true,
          //   customClass: {
          //     confirmButton: 'myError'
          //   }
          // })
        }
      })
    }else {
      this.siteServices.updateBranch( this.selectedId , this.branchForm.value).subscribe({
        next : (res : any) => {
          this.swalSuccess(res.message.message);
        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      })

    }
  }

  // Edit Branch

  editBranch(branch: any) {
    console.log(branch);
    this.selectedId = branch._id;
    this.mode = false;

    // 🟢 دور على الدولة حسب الاسم علشان تجيب isoCode
    const selectedCountry = this.countriesform.find(
      country => country.isoCode === branch.country
    );

    if (selectedCountry) {
      this.selectedCountryCodeform = selectedCountry.isoCode;

      // 🟢 هات المدن الخاصة بالدولة
      this.citiesform = City.getCitiesOfCountry(this.selectedCountryCodeform);

      // 🟢 اضبط الفورم بعد ما تجهز كل حاجة
      this.branchForm.patchValue({
        branchCode: branch.branchCode,
        branchName: branch.branchName,
        country: branch.country, // الاسم
        city: branch.city,
        phone: branch.phone,
        address: branch.address
      });

      // 🟢 علشان تظبط الـ select city
      this.selectedCityform = branch.city;
    }

    this.showPopup = true;
  }


  // Delete Branch
  deleteBranch (id : number){
    console.log(id);

    this.siteServices.deleteBranch(id).subscribe({
      next : (res : any) => {
        this.swalSuccess(res.message.message);
      },
      error : (err) => {
        this.swalError(err.error.message);
      }
    })
  }

  swalSuccess( message : any ) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message || 'Branch created successfully'  ,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'mySuccess'
      }
    }).then(() => {
      this.closePopup();
      this.branchForm.reset();
      this.getSites(this.currentPage);
    })
  }

  swalError( message : any ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message || 'An error occurred'  ,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'myError'
      }
    })
  }

}
