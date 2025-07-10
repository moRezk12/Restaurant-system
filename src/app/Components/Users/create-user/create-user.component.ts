import { Component, ViewChild , ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  constructor(private eRef: ElementRef) {}

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
