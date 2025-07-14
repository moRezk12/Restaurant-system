import { Component , ViewChild , HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private eRef: ElementRef) {}

  @ViewChild('powersBox', { static: false }) powersBox!: ElementRef;



  dropdownOpenPowers = false;

  @HostListener('document:click', ['$event.target'])
  handleClickOutside(target: HTMLElement) {
    if (this.dropdownOpenPowers && this.powersBox && !this.powersBox.nativeElement.contains(target)) {
      this.dropdownOpenPowers = false;
    }
  }



    // Powers
    allOptionsPowers = ['Users', 'Reports', 'Objections', 'Rating', 'Questions'];
    selectedPowers: string[] = [];

    selectAll(){
      this.selectedPowers = this.allOptionsPowers.slice();
    }

    deleteAll(){
      this.selectedPowers = [];
    }

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

}
