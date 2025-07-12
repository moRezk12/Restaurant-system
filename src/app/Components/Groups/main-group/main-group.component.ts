import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaingroupService } from 'src/app/Core/Services/Groups/mainGroup/maingroup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-group',
  templateUrl: './main-group.component.html',
  styleUrls: ['./main-group.component.css']
})
export class MainGroupComponent implements OnInit {

  isEditMode : boolean = false;

  mainGroupForm !: FormGroup
  constructor( private fb : FormBuilder , private mainGroupService : MaingroupService) {

  }

  allGroups : any ;
  totalMainGroups : number = 0;
  totalSubGroups : number = 0;
  ngOnInit(): void {
    this.mainGroupForm = this.fb.group({
      name: ['', [Validators.required ]],
      status: ['', [Validators.required]],
    });

    this.getMainGroups();

  }






  // Popup
  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    this.isEditMode = false;
    console.log(this.isEditMode);

  }

  closePopup() {
    this.showPopup = false;
    this.mainGroupForm.reset();
    // this.isEditMode = false;
  }



  name = '';

  status: boolean = false;
  logStatus(value: boolean) {
    console.log('New status:', value); // هتطبع true / false حسب الحالة الجديدة
  }

  // get main groups
  getMainGroups() {
    this.mainGroupService.getMainGroups().subscribe({
      next : (res : any) => {
        console.log(res);
        this.allGroups = res.data;
        this.totalMainGroups = res.count;
        this.totalSubGroups = res.totalSubGroups;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  searchTerm = '';

  get search() {
    return (this.allGroups || []).filter((group: any) =>
      group.name?.toLowerCase().includes(this.searchTerm?.toLowerCase() || '')
    );
  }


  grid = [
    // {name: 'Report', value: 7 , icon : 'fas fa-chart-bar  ', bg: "#F0EBEB" , color: "#F97316"},
    // {name: 'Locations', value: 7 , icon : 'fas fa-map-marker-alt  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'Main Groups' , icon : 'fas fa-object-group  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'SubGroups',  icon : 'fas fa-sitemap  ', bg: "#22C55E33" , color: "#22C55E"},
    {name: 'Questions' , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

  // Submit
  onSubmit(){
    console.log(this.mainGroupForm.value);
    if(!this.mainGroupForm.valid){
      console.log(this.mainGroupForm.value);
      return this.swalError('Please fill all required fields');
    }

    console.log(this.isEditMode);

    if(!this.isEditMode ){
      console.log("create");

      this.mainGroupService.createMainGroup(this.mainGroupForm.value).subscribe({
        next : (res : any) => {
          this.swalSuccess(res.message);
        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      })
    }else  {
      console.log("update");

      this.mainGroupService.updateMainGroup( this.selectedId , this.mainGroupForm.value ).subscribe({
        next : (res : any) => {
          this.swalSuccess(res.message);

        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      })
    }



  }

  selectedId !: number;
  editMainGroup(group : any){
    console.log(group);
    this.selectedId = group._id;
    this.isEditMode = true;
    this.mainGroupForm.patchValue({
      name: group.name,
      status: group.status,
    })
      this.status = this.mainGroupForm.get('status')?.value;


    console.log( "status "+ this.status);
    this.logStatus(this.status);
    this.showPopup = true;

  }

deleteMainGroup(item: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete "${item.name}"? This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    customClass: {
        confirmButton: 'mywarning',
        cancelButton: 'myError'
      }
  }).then((result) => {
    if (result.isConfirmed) {
      this.mainGroupService.deleteMainGroup(item._id).subscribe({
        next: (res: any) => {
          this.swalSuccess(res.message);
        },
        error: (err) => {
          this.swalError(err.error.message);
        }
      });
    }
  });
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
      this.closePopup();
      this.mainGroupForm.reset();
      this.getMainGroups();
          this.isEditMode = false;

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
