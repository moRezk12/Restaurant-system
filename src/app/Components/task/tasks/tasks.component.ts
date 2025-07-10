import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks = [
    {name: 'Number of sites', progress: 2},
    {name: 'Total number of tasks', progress: 3},
    {
      name1: 'New',
      progress1: 2,
      name2: 'In Progress',
      progress2: 3,
      name3: 'Completed',
      progress3: 2
    }
  ]

  location = [
    { id: 1 , link : '/detailsTask' ,  name: 'Cook Door' , progress1: 2 , progress2: 3 , progress3: 2 ,  progress4: 2 , icon : 'fa-layer-group'},
    { id: 2 , link : '/detailsTask' ,  name: 'Moods' , progress1: 2 , progress2: 3 , progress3: 0 ,  progress4: 0 , icon : 'fa-layer-group'},
  ]


}
