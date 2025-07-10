import { Component , ViewChild , HostListener, ElementRef } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  activeTab: string = 'colors';


      constructor(private eRef: ElementRef) {}

    @ViewChild('powersBox', { static: false }) powersBox!: ElementRef;

    @HostListener('document:click', ['$event.target'])
    handleClickOutside(target: HTMLElement) {
      if (
        this.dropdownOpenPowers &&
        this.powersBox &&
        !this.powersBox.nativeElement.contains(target)
      ) {
        this.dropdownOpenPowers = false;
      }
    }

  colorRanges = [
    { from: '', to: '', color: '' }
  ];

  addColorRange() {
    this.colorRanges.push({ from: '', to: '', color: '' });
  }

  removeColorRange(index: number) {
    this.colorRanges.splice(index, 1);
  }

  // popup
  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

   // Add Question


    mainGroups = [
    {
      name: 'Health and Nutrition',
      subGroups: ['Eating Habits', 'Physical activity']
    },
    {
      name: 'Daily habits',
      subGroups: ['Sleep and mental health', 'Productivity and time management']
    }
  ];

  selectedGroup: string = '';
  selectedSubGroup: string = '';
  filteredSubGroups: string[] = [];

  questions = [
    { ar: '', en: '', tr: '', active: true }
  ];

  onGroupChange() {
    const selected = this.mainGroups.find(g => g.name === this.selectedGroup);
    this.filteredSubGroups = selected ? selected.subGroups : [];
    this.selectedSubGroup = '';
  }



    // Powers
    dropdownOpenPowers : boolean = false
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

}
