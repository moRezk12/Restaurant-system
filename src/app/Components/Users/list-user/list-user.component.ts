import { Component, ViewChild , ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class AddUserComponent {


  constructor(private eRef: ElementRef) { }

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
  }


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
    allOptionsPowers = ['Users', 'Reports', 'Objections', 'Rating', 'Questions'];
    selectedPowers: string[] = [];

    toggleDropdownPowers() {
      this.dropdownOpenPowers = !this.dropdownOpenPowers;
    }
    selectPower(option: string) {
      if (!this.selectedPowers.includes(option)) {
        this.selectedPowers.push(option);
      }
    }
    removePower(option: string) {
      this.selectedPowers = this.selectedPowers.filter(o => o !== option);
    }
    isPowerSelected(option: string): boolean {
      return this.selectedPowers.includes(option);
    }

    // Subgroup
    allOptionsSubgroup = ['Users', 'Reports', 'Objections', 'Rating', 'Questions'];
    selectedSubgroup: string[] = [];

    toggleDropdownSubgroup() {
      this.dropdownOpenSubGroup = !this.dropdownOpenSubGroup;
    }
    selectSubgroup(option: string) {
      if (!this.selectedSubgroup.includes(option)) {
        this.selectedSubgroup.push(option);
      }
    }
    removeSubgroup(option: string) {
      this.selectedSubgroup = this.selectedSubgroup.filter(o => o !== option);
    }
    isSubgroupSelected(option: string): boolean {
      return this.selectedSubgroup.includes(option);
    }

    // Site permissions
    allOptionsSite = ['Healthy and Sick', 'Doctors Only', 'Admin Panel', 'Limited Access'];
    selectedSitePermissions: string[] = [];

    toggleDropdownSite() {
      this.dropdownOpenSite = !this.dropdownOpenSite;
    }
    selectSite(option: string) {
      if (!this.selectedSitePermissions.includes(option)) {
        this.selectedSitePermissions.push(option);
      }
    }
    removeSite(option: string) {
      this.selectedSitePermissions = this.selectedSitePermissions.filter(o => o !== option);
    }
    isSiteSelected(option: string): boolean {
      return this.selectedSitePermissions.includes(option);
    }

    // Main group
    allOptionsMainGroup = ['Healthy and Sick', 'Adults', 'Children', 'Elderly'];
    selectedMainGroup: string[] = [];

    toggleDropdownMainGroup() {
      this.dropdownOpenMainGroup = !this.dropdownOpenMainGroup;
    }

    selectMainGroup(option: string) {
      if (!this.selectedMainGroup.includes(option)) {
        this.selectedMainGroup.push(option);
      }
    }

    removeMainGroup(option: string) {
      this.selectedMainGroup = this.selectedMainGroup.filter(o => o !== option);
    }

    isMainGroupSelected(option: string): boolean {
      return this.selectedMainGroup.includes(option);
  }

}
