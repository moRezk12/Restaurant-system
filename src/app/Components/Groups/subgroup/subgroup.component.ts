import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaingroupService } from 'src/app/Core/Services/Groups/mainGroup/maingroup.service';
import { SubgroupService } from 'src/app/Core/Services/Groups/subGroup/subgroup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent implements OnInit {

  subGroupForm!: FormGroup;
  isEditMode: boolean = false;
  showPopup: boolean = false;

  allGroups: any[] = [];
  selectedId!: number;

  constructor(
    private fb: FormBuilder,
    private mainGroupService: MaingroupService,
    private subGroupService: SubgroupService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getGroups();
  }

    grid = [
    {name: 'SubGroups', value: 7 , icon : 'fas fa-sitemap  ', bg: "#22C55E33" , color: "#22C55E"},
    {name: 'Questions', value: 7 , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

  initForm() {
    this.subGroupForm = this.fb.group({
      name: ['', Validators.required],
      mainGroupId: ['', Validators.required],
    });
  }

  getGroups() {
    this.mainGroupService.getMainGroups().subscribe({
      next: (res: any) => {
        this.allGroups = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openPopup() {
    this.showPopup = true;
    this.isEditMode = false;
    this.subGroupForm.reset();
  }

  closePopup() {
    this.showPopup = false;
    this.subGroupForm.reset();
    this.isEditMode = false;
  }

  onSubmit() {
    if (this.subGroupForm.invalid) {
      return this.swalError('Please fill all required fields');
    }

    const payload = this.subGroupForm.value;

    if (this.isEditMode) {
      // Update
      this.subGroupService.updateSubGroup(this.selectedId, payload).subscribe({
        next: (res: any) => this.swalSuccess(res.message),
        error: (err) => this.swalError(err.error.message),
      });
    } else {
      // Create
      this.subGroupService.createSubGroup(payload).subscribe({
        next: (res: any) => this.swalSuccess(res.message),
        error: (err) => this.swalError(err.error.message),
      });
    }
  }

  editSubGroup(sub: any) {
    this.selectedId = sub._id;
    this.isEditMode = true;
    this.showPopup = true;

    this.subGroupForm.patchValue({
      name: sub.name,
      mainGroupId: sub.mainGroup,
    });
  }

  deleteSubGroup(sub: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${sub.name}"?`,
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
        this.subGroupService.deleteSubGroup(sub._id).subscribe({
          next: (res: any) => this.swalSuccess(res.message),
          error: (err) => this.swalError(err.error.message),
        });
      }
    });
  }

  swalSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message || 'Operation completed successfully',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'mySuccess'
      }
    }).then(() => {
      this.closePopup();
      this.getGroups();
    });
  }

  swalError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message || 'An error occurred',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'myError'
      }
    });
  }
}
