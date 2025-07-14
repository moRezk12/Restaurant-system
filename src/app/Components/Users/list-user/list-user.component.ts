import { Component, ViewChild , ElementRef, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaingroupService } from 'src/app/Core/Services/Groups/mainGroup/maingroup.service';
import { SubgroupService } from 'src/app/Core/Services/Groups/subGroup/subgroup.service';
import { SiteService } from 'src/app/Core/Services/Sites/site.service';
import { UsersService } from 'src/app/Core/Services/Users/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class AddUserComponent implements OnInit {

  UserForm! : FormGroup;
  isEditMode: boolean = false;

  // allGroups : any ;
  allOptionsMainGroup : any;
  allPermissions : any;
  allBranches : any;
  allUsers : any;

  constructor(private eRef: ElementRef ,
    private fb: FormBuilder,
    private mainGroup : MaingroupService,
    private siteServices : SiteService ,
    private subGroup : SubgroupService,
    private userServices : UsersService
  ) {

    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      phone: [''],
      password: ['' , [Validators.required , Validators.minLength(8) , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
      permissions: [[] , [Validators.required]],
      branch: [[] , [Validators.required]],
      subGroups: [[] , [Validators.required]],
      mainGroups: [[] , [Validators.required]],
      image: this.fb.array([]),
    });

  }



    // Get images array from form
    get imagesArray(): FormArray {
      return this.UserForm.get('image') as FormArray;
    }


    selectedFiles: File[] = [];
    images: string[] = [];
    allowedExtensions : string[] = ['jpg', 'jpeg', 'png', 'gif'];

    onFileSelected(event: any): void {
      const files: FileList = event.target.files;

      if (files.length + this.imagesArray.length > 3) {
        Swal.fire({
          icon: 'warning',
          title: 'Limit Exceeded!',
          text: 'You can upload up to 3 images only!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 2 * 1024 * 1024) {
          Swal.fire({
            icon: 'warning',
            title: 'Limit Exceeded!',
            text: 'Image size must be less than 2 MB.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
        }
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !this.allowedExtensions.includes(fileExtension)) {
          Swal.fire({
            icon: 'error',
            title: 'تنبيه!',
            text: ' فقط .jpg أو .jpeg أو .png أو .gif الرجاء اختيار صورة بصيغة  ',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.imagesArray.length < 3 && !this.imagesArray.value.includes(e.target.result)) {
            this.imagesArray.push(this.fb.control(e.target.result));
            this.selectedFiles.push(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }

        // حذف الصورة
    removeImage(index: number) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Image deleted successfully',
        confirmButtonColor: '#28a745',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          confirmButton: 'mySuccess'
        }
      }).then(() => {
        // this.getProducts();
        this.imagesArray.removeAt(index);
        this.selectedFiles.splice(index, 1);
      });
    }


    ngOnInit(): void {

      this.getAllDateOnComponent();

    }

    getAllDateOnComponent(){
            // Get all users
      this.getAllUsers();

      // this.getAllMainGroups();
      this.getAllMainGroups();

      // this.getAllPermissions();
      this.getAllPermissions();

      // this.getAllSites();
      this.getAllSites();
    }

    // Searce

    searchText: string = '';

  get search() {
    if (!this.allUsers) return []; // Return empty array if allUsers is not loaded yet
    return this.allUsers.filter((user: any) =>
      user.email?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


    // Get all users
    getAllUsers() {
      this.userServices.getAllUsers().subscribe({
        next: (res: any) => {
          console.log("Users fetched successfully");
          console.log(res);

          this.allUsers = res.admins;
        },
        error: (err) => {
            console.error(err);
          }
        });
      }
    // Get all main groups
    getAllMainGroups(){
      this.mainGroup.getMainGroups().subscribe({
        next : (res : any) => {
          this.allOptionsMainGroup = res.data;
        },
        error : (err) => {
          console.log(err);
        }
      });
    }

  // Get all powers
  getAllPermissions() {
    this.userServices.getAllPermissions().subscribe({
      next: (res: any) => {
        this.allPermissions = res.permissions;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Get all sites
  getAllSites() {
    this.siteServices.getBranches().subscribe({
      next: (res: any) => {
        this.allBranches = res.message.branches ;

        // this.allOptionsSite = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // get all sub groups by main group id
  // getSubGroupsByMainGroupId(mainGroupId: number) {
  //   this.subGroup.getSubGroupsByMainGroupId(mainGroupId).subscribe({
  //     next: (res: any) => {
  //       console.log("Subgroups fetched successfully");
  //       console.log(res);
  //       // this.allOptionsSubGroup = res.data;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

    grid = [
    {name: 'users', value: 7 , icon : 'fas fa-users  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'Tasks', value: 7 , icon : 'fas fa-tasks  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Normal', value: 7 , icon : 'fas fa-circle  ', bg: "#22C55E33" , color: "#22C55E"},
  ]

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


  // Popup
  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.clearDate();
  }


  // @ViewChild('fileInput') fileInput!: ElementRef;

  @ViewChild('powersBox') powersBox!: ElementRef;
  @ViewChild('mainGroupBox') mainGroupBox!: ElementRef;
  @ViewChild('subGroupBox') subGroupBox!: ElementRef;
  @ViewChild('siteBox') siteBox!: ElementRef;

  dropdownOpenPowers = false;
  dropdownOpenMainGroup = false;
  dropdownOpenSubGroup = false;
  dropdownOpenSite = false;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (this.powersBox && !this.powersBox.nativeElement.contains(target)) {
      this.dropdownOpenPowers = false;
    }
    if (this.mainGroupBox && !this.mainGroupBox.nativeElement.contains(target)) {
      this.dropdownOpenMainGroup = false;
    }
    if (this.subGroupBox && !this.subGroupBox.nativeElement.contains(target)) {
      this.dropdownOpenSubGroup = false;
    }
    if (this.siteBox && !this.siteBox.nativeElement.contains(target)) {
      this.dropdownOpenSite = false;
    }
  }

  // Powers
  // allOptionsPowers = ['Users', 'Reports', 'Objections', 'Rating', 'Questions'];
  selectedPowers: string[] = []; // for UI display
  selectedPermissionIDs: string[] = []; // for backend

  toggleDropdownPowers() {
    this.dropdownOpenPowers = !this.dropdownOpenPowers;
  }

  selectPower(option: any) {
    if (!this.selectedPowers.includes(option.name)) {
      this.selectedPowers.push(option.name);
      this.selectedPermissionIDs.push(option._id);
    }
  }

  removePower(optionName: any) {
    const index = this.selectedPowers.findIndex(p => p === optionName);
    if (index !== -1) {
      this.selectedPowers.splice(index, 1);
      this.selectedPermissionIDs.splice(index, 1);

    }

      console.log(this.selectedMainGroup);
  console.log(this.selectedSubgroup);
  console.log(this.selectedPowers);
  console.log(this.selectedSitePermissions);

  }

  isPowerSelected(option: any): boolean {
    return this.selectedPowers.includes(option.name);
  }




  // Site permissions
  // allOptionsSite = ['Healthy and Sick', 'Doctors Only', 'Admin Panel', 'Limited Access'];
  selectedSitePermissions: string[] = [];       // For display
  selectedSiteBranhIDs: string[] = [];     // For backend

  toggleDropdownSite() {
    this.dropdownOpenSite = !this.dropdownOpenSite;
  }

  selectSite(option: any) {
    if (!this.selectedSitePermissions.includes(option.branchName)) {
      this.selectedSitePermissions.push(option.branchName);
      this.selectedSiteBranhIDs.push(option._id);
    }
  }

  removeSite(option: any) {
    const index = this.selectedSitePermissions.findIndex(p => p === option);
    if (index !== -1) {
      this.selectedSitePermissions.splice(index, 1);
      this.selectedSiteBranhIDs.splice(index, 1);
    }

      console.log(this.selectedMainGroup);
  console.log(this.selectedSubgroup);
  console.log(this.selectedPowers);
  console.log(this.selectedSitePermissions);

  }

  isSiteSelected(option: any): boolean {
    return this.selectedSitePermissions.includes(option.branchName);
  }



  // All subgroups that appear based on selected main groups
  allOptionsSubgroup: { name: string, _id: string }[] = [];

  // Selected items (names)
  selectedMainGroup: string[] = [];
  selectedSubgroup: string[] = [];

  // Selected items (IDs to send)
  selectedMainGroupByID: string[] = [];
  selectedSubGroupByID: string[] = [];

  // Toggle
  toggleDropdownMainGroup() {
    this.dropdownOpenMainGroup = !this.dropdownOpenMainGroup;
  }

  toggleDropdownSubgroup() {
    this.dropdownOpenSubGroup = !this.dropdownOpenSubGroup;
  }

  // Main Group handlers
  selectMainGroup(option: any) {
    if (!this.selectedMainGroup.includes(option.name)) {
      this.selectedMainGroup.push(option.name);
      this.selectedMainGroupByID.push(option._id);

      // Add subGroups
      if (Array.isArray(option.subGroups)) {
        option.subGroups.forEach((sub: any) => {
          const alreadyExists = this.allOptionsSubgroup.some(s => s._id === sub._id);
          if (!alreadyExists) {
            this.allOptionsSubgroup.push({ name: sub.name, _id: sub._id });
          }
        });
      }
    }
  }

  removeMainGroup(name: string) {
    const group = this.allOptionsMainGroup.find((g: any) => g.name === name);
    if (!group) return;

    // remove name + ID
    this.selectedMainGroup = this.selectedMainGroup.filter(n => n !== name);
    this.selectedMainGroupByID = this.selectedMainGroupByID.filter(id => id !== group._id);

    // remove related subgroups
    if (Array.isArray(group.subGroups)) {
      group.subGroups.forEach((sub: any) => {
        this.allOptionsSubgroup = this.allOptionsSubgroup.filter(s => s._id !== sub._id);
        this.selectedSubgroup = this.selectedSubgroup.filter(n => n !== sub.name);
        this.selectedSubGroupByID = this.selectedSubGroupByID.filter(id => id !== sub._id);
      });
    }

      console.log(this.selectedMainGroup);
  console.log(this.selectedSubgroup);
  console.log(this.selectedPowers);
  console.log(this.selectedSitePermissions);

  }

  isMainGroupSelected(option: any): boolean {
    return this.selectedMainGroup.includes(option.name);
  }

  // Subgroup handlers
  selectSubgroup(option: { name: string, _id: string }) {
    if (!this.selectedSubgroup.includes(option.name)) {
      this.selectedSubgroup.push(option.name);
      this.selectedSubGroupByID.push(option._id);
    }
  }

  removeSubgroup(name: string) {
    const option = this.allOptionsSubgroup.find(s => s.name === name);
    if (!option) return;

    this.selectedSubgroup = this.selectedSubgroup.filter(n => n !== name);
    this.selectedSubGroupByID = this.selectedSubGroupByID.filter(id => id !== option._id);

      console.log(this.selectedMainGroup);
  console.log(this.selectedSubgroup);
  console.log(this.selectedPowers);
  console.log(this.selectedSitePermissions);

  }

  isSubgroupSelected(option: { name: string, _id: string }): boolean {
    return this.selectedSubgroup.includes(option.name);
  }


  createUser() {

    this.UserForm.get('mainGroups')?.setValue(this.selectedMainGroupByID);
    this.UserForm.get('subGroups')?.setValue(this.selectedSubGroupByID);
    this.UserForm.get('permissions')?.setValue(this.selectedPermissionIDs);
    this.UserForm.get('branch')?.setValue(this.selectedSiteBranhIDs);

    const formData = new FormData();

    formData.append('name', this.UserForm.get('name')?.value);
    formData.append('email', this.UserForm.get('email')?.value);
    formData.append('phone', this.UserForm.get('phone')?.value);
    formData.append('password', this.UserForm.get('password')?.value);

    // أرسل كل عنصر في الـ array بشكل منفصل
    this.selectedMainGroupByID.forEach(id => formData.append('mainGroup[]', id));
    this.selectedSubGroupByID.forEach(id => formData.append('subGroup[]', id));
    this.selectedPermissionIDs.forEach(id => formData.append('permissions[]', id));
    this.selectedSiteBranhIDs.forEach(id => formData.append('branch[]', id));

    // صورة واحدة فقط
    if (this.selectedFiles.length > 0) {
      formData.append('image', this.selectedFiles[0]);
    }

    console.log("User Form Values:");

    console.log(this.UserForm.value);



    if(!this.isEditMode){
      console.log("Creating new user");

      this.userServices.createUser(formData).subscribe({
        next : (res : any) => {
          this.swalSuccess(res.message);
        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      });
    }else {
      console.log("Updating user with ID:", this.selectedId);


      this.UserForm.get('mainGroups')?.setValue(this.selectedMainGroupByID);
      this.UserForm.get('subGroups')?.setValue(this.selectedSubGroupByID);
      this.UserForm.get('permissions')?.setValue(this.selectedPermissionIDs);
      this.UserForm.get('branch')?.setValue(this.selectedSiteBranhIDs);

      console.log("selected values By ID :");
      console.log(this.selectedMainGroupByID);
      console.log(this.selectedSubGroupByID);
      console.log(this.selectedPermissionIDs);
      console.log(this.selectedSiteBranhIDs);


      console.log("Form Data to be sent update :");
      console.log(this.UserForm.value);
      // Update user logic here
      this.userServices.updateUser(this.selectedId, formData).subscribe({
        next: (res: any) => {
          console.log("User updated successfully");
          console.log(res);
          this.swalSuccess(res.message);
        },
        error: (err) => {
          console.error(err);
          this.swalError(err.error.message);
        }
      });
    }


  }

  // View user details
  showUser : boolean = false;

  toggleUserDetails() {
    this.showUser = !this.showUser;
  }

  selectedUser: any;

  viewUser(user: any) {
    this.selectedUser = user;
    this.showUser = true;
  }

  // Edit user
  selectedId!: number;
  previewImageUrl: string | null = null;
editUser(user: any) {

      this.getAllDateOnComponent();

  console.log("user to edit:");
  console.log(user);



  this.selectedMainGroup = [];
  this.selectedSubgroup = [];
  this.selectedPowers = [];
  this.selectedSitePermissions = [];
  console.log(user);

  this.selectedId = user._id;
  this.isEditMode = true;

  // تعيين القيم للفورم
  this.UserForm.patchValue({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    password: user.password || '', // اختياري، حسب السيكيوريتي
    mainGroups: user.mainGroup.map((g: any) => g._id),
    subGroups: user.subGroup.map((g: any) => g._id),
    permissions: user.permissions.map((p: any) => p._id),
    branch: user.branch.map((b: any) => b._id),
  });




  this.selectedMainGroup = user.mainGroup.map((g: any) => g.name);
  this.selectedSubgroup = user.subGroup.map((g: any) => g.name);
  this.selectedPowers  = user.permissions.map((p: any) => p.name);
  this.selectedSitePermissions= user.branch.map((b: any) => b.branchName);

  this.selectedMainGroupByID = user.mainGroup.map((g: any) => g._id);
  this.selectedSubGroupByID = user.subGroup.map((g: any) => g._id);
  this.selectedPermissionIDs = user.permissions.map((p: any) => p._id);
  this.selectedSiteBranhIDs = user.branch.map((b: any) => b._id);
  // this.selectedPermissionIDs = user.permissions.map((p: any) => p._id);

  // تحميل صورة المستخدم في selectedFiles (صورة واحدة فقط)
  if (user.profileImage?.secure_url) {
    this.selectedFiles = [];
    this.imagesArray.clear(); // Clear existing images
    console.log(user.profileImage.secure_url);

    fetch(user.profileImage.secure_url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "image.jpg", { type: blob.type });
      this.selectedFiles = [file];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagesArray.clear();
        this.imagesArray.push(this.fb.control(e.target.result));

        // بعد ما تخلص قراءة الصورة، افتح المودال
        this.showPopup = true;
      };
      reader.readAsDataURL(file);
    });

  } else {
    this.imagesArray.clear();
    this.selectedFiles = [];
  }
  this.previewImageUrl = user.profileImage?.secure_url;

  this.showPopup = true;

  console.log(this.selectedMainGroup);
  console.log(this.selectedSubgroup);
  console.log(this.selectedPowers);
  console.log(this.selectedSitePermissions);

  this.rebuildSubGroupsFromSelectedMainGroups();
}


rebuildSubGroupsFromSelectedMainGroups() {
  this.allOptionsSubgroup = [];

  this.selectedMainGroupByID.forEach(mainGroupId => {
    const mainGroup = this.allOptionsMainGroup.find((g  : any) => g._id === mainGroupId);
    if (mainGroup && Array.isArray(mainGroup.subGroups)) {
      mainGroup.subGroups.forEach((sub : any ) => {
        const alreadyExists = this.allOptionsSubgroup.some(s => s._id === sub._id);
        if (!alreadyExists) {
          this.allOptionsSubgroup.push({ name: sub.name, _id: sub._id });
        }
      });
    }
  });
}


  // delete user
  deleteUser(userId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',  // Use 'warning' icon
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
        this.userServices.deleteUser(userId._id).subscribe({
          next: (res: any) => {
            this.swalSuccess(res.message);
            this.getAllUsers(); // Refresh user list after deletion
          },
          error: (err) => { this.swalError(err.error.message); }
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
        this.clearDate();
        this.getAllUsers();

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

  clearDate() {
    this.UserForm.reset();
    this.selectedMainGroup = [];
    this.selectedMainGroupByID = [];
    this.selectedSubgroup = [];
    this.selectedSubGroupByID = [];
    this.selectedPowers = [];
    this.selectedPermissionIDs = [];
    this.selectedSitePermissions = [];
    this.selectedSiteBranhIDs = [];
    this.selectedFiles = [];
    // this.imagesArray = [];
    this.imagesArray.clear();
    this.selectedFiles = [];
    this.allOptionsSubgroup = [];
    this.allUsers = [];
    this.getAllUsers();
    this.getAllMainGroups();
    this.getAllPermissions();
    this.getAllSites();
    this.isEditMode = false;
  }

}
