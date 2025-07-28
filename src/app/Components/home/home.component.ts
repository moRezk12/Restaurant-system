import { SubgroupService } from 'src/app/Core/Services/Groups/subGroup/subgroup.service';
import { Component , ViewChild , HostListener, ElementRef, OnInit } from '@angular/core';
import { SiteService } from 'src/app/Core/Services/Sites/site.service';
import { RatesiteService } from 'src/app/Core/Services/Home/ratesite.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rateForm! : FormGroup;
  constructor(private eRef: ElementRef ,
    private fb: FormBuilder,
    private rateOfSiteService : RatesiteService ,
    private SubgroupService : SubgroupService ,
    private branchService : SiteService ) {}


    ngOnInit(): void {
      this.getSubGroups();
      this.getBranches();
      this.rateForm = this.fb.group({
        managerName: ['', Validators.required],
        subGroups: this.fb.array([], Validators.required),
        locationId: ['', Validators.required]
      });


    }


    // get all sub groups
    allOptionsPowers: any;
    getSubGroups() {
      return this.SubgroupService.getSubGroups().subscribe({
        next : (res : any) => {
          console.log(res);
          this.allOptionsPowers = res.subGroups;
          console.log(this.allOptionsPowers);

        },
        error : (err) => {
          console.log(err);
        }

      });
    }

    // Powers
    selectedPowers: any;

    dropdownOpenPowers = false;
  @ViewChild('powersBox', { static: false }) powersBox!: ElementRef;

  @HostListener('document:click', ['$event.target'])
  handleClickOutside(target: HTMLElement) {
    if (this.dropdownOpenPowers && this.powersBox && !this.powersBox.nativeElement.contains(target)) {
      this.dropdownOpenPowers = false;
    }
  }

  toggleDropdownPowers() {
    this.dropdownOpenPowers = !this.dropdownOpenPowers;
  }

  // تحقق هل العنصر مختار
  isPowerSelected(option: any): boolean {
    return this.selectedPowers.some((p:any) => p._id === option._id);
  }

  // تحديد عنصر
  selectPower(option: any) {
    if (!this.isPowerSelected(option)) {
      this.selectedPowers.push(option);
      this.addToFormArray(option._id);
    }
  }

  // إزالة عنصر
  removePower(option: any) {
    this.selectedPowers = this.selectedPowers.filter((p:any) => p._id !== option._id);
    this.removeFromFormArray(option._id);
  }

  // تحديد الكل
  selectAll() {
    this.selectedPowers = [...this.allOptionsPowers];
    const formArray = this.rateForm.get('subGroups') as FormArray;
    formArray.clear();
    this.selectedPowers.forEach((opt:any) => formArray.push(this.fb.control(opt._id)));
  }

  // إزالة الكل
  deleteAll() {
    this.selectedPowers = [];
    const formArray = this.rateForm.get('subGroups') as FormArray;
    formArray.clear();
  }

  // إضافة عنصر في الفورم
  private addToFormArray(id: string) {
    const formArray = this.rateForm.get('subGroups') as FormArray;
    formArray.push(this.fb.control(id));
  }

  // إزالة عنصر من الفورم
  private removeFromFormArray(id: string) {
    const formArray = this.rateForm.get('subGroups') as FormArray;
    const index = formArray.controls.findIndex(control => control.value === id);
    if (index !== -1) {
      formArray.removeAt(index);
    }
  }


  // get all branches
  allbranchs : any;
  getBranches() {
    return this.branchService.getBranches().subscribe({
      next : (res : any) => {
        console.log(res);
        this.allbranchs = res.message.branches;
      },
      error : (err) => {
        console.log(err);
      } });
    }



   // إرسال الفورم
  createRate() {
    if (this.rateForm.invalid) {
      this.rateForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.rateForm.value,
      subGroups: this.rateForm.value.subGroups // IDs only
    };

    this.rateOfSiteService.createMode(formData).subscribe({
      next: (res: any) => {
        console.log('تم الحفظ:', res);
        this.swalSuccess(res.message);
      },
      error: (err) => {
        console.error('خطأ أثناء الحفظ:', err);
        this.swalError(err.error.message);
      }
    });
  }


  grid = [
    {name: 'Report', value: 7 , icon : 'fas fa-chart-bar  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'Locations', value: 7 , icon : 'fas fa-map-marker-alt  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Groups', value: 7 , icon : 'fas fa-layer-group  ', bg: "#22C55E33" , color: "#22C55E"},
    {name: 'Questions', value: 7 , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

  circumference = 2 * Math.PI * 50; // 2πr

  ratings = [
    { percent: 87, label: 'customer service' },
    { percent: 62, label: 'Food quality' },
    { percent: 43, label: 'Cleanliness of the place' },
  ];

  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    this.selectedPowers = [];
  }

  closePopup() {
    this.showPopup = false;
    this.selectedPowers = [];
  }

  // pagination

  totalPages = 15;
  currentPage = 1;

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
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // هنا حمّل البيانات حسب الصفحة مثلاً
    }
  }

  percent = 30;
  hovered: 'orange' | 'gray' | null = null;

  tooltipX = 0;
  tooltipY = 0;

  updateTooltipPosition(event: MouseEvent) {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    this.tooltipX = event.clientX - rect.left;
    this.tooltipY = event.clientY - rect.top - 10; // فوق الموس بشوية
  }

  percentCook = 60;
  hoveredCook: 'orange' | 'gray' | null = null;

  tooltipXCook = 0;
  tooltipYCook = 0;

  updateTooltipPositionCook(event: MouseEvent) {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    this.tooltipXCook = event.clientX - rect.left;
    this.tooltipYCook = event.clientY - rect.top - 10; // فوق الموس بشوية
  }

  percentCircle = 51; // النسبة اللي تتحرك بناءً عليها

  getNeedleRotation(percent: number): string {
    // نحرك السهم من -90deg (يسار) إلى +90deg (يمين)
    const angle = (percent / 100) * 180 - 90;
    return `translate(-50%, -100%) rotate(${angle}deg)`;
  }



  swalSuccess( message : any ) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: message || 'Check your email '  ,
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
          timerProgressBar: true,
          customClass: {
            confirmButton: 'mySuccess'
          }
        }).then(() => {
          this.getBranches();

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
