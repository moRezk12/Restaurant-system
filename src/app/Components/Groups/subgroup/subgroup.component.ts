import { Component } from '@angular/core';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent {


  grid = [
    {name: 'SubGroups', value: 7 , icon : 'fas fa-sitemap  ', bg: "#22C55E33" , color: "#22C55E"},
    {name: 'Questions', value: 7 , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]




  // Popup
  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }


  constructor() {

  }

  name = '';

  status: boolean = false;
  logStatus(value: boolean) {
    console.log('New status:', value); // هتطبع true / false حسب الحالة الجديدة
  }

}
