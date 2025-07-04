import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
  }

  closePopup() {
    this.showPopup = false;
  }

}
