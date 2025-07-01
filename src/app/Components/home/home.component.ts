import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  grid = [
    {name: 'Report', value: 7 , icon : 'fas fa-chart-bar  '},
    {name: 'Locations', value: 7 , icon : 'fas fa-map-marker-alt  '},
    {name: 'Groups', value: 7 , icon : 'fas fa-layer-group  '},
    {name: 'Questions', value: 7 , icon : 'fas fa-question-circle '},
  ]

  circumference = 2 * Math.PI * 50; // 2πr

  ratings = [
    { percent: 87, label: 'خدمة العملاء' },
    { percent: 62, label: 'جودة الطعام' },
    { percent: 43, label: 'نظافة المكان' },
  ];


}
