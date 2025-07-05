import { Component } from '@angular/core';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent {

    tasks = [
    {name: 'Number of sites', icon: 'fa-layer-group'},
    {
      name1: 'New',
      progress1: 2,
      name2: 'Under Construction',
      progress2: 3,
      name3: 'Implementation',
      progress3: 2
    }
  ]

  table = [
    {id : 1 , link : '/detailsForonetask' , task : 'task 1' , date : '12/7/2022' , rate : '80%' , numberOfQuations : 2 },
    {id : 2 , link : '/detailsForonetask' , task : 'task 2' , date : '12/3/2022' , rate : '30%' , numberOfQuations : 5 },
    {id : 3 , link : '/detailsForonetask' , task : 'task 3' , date : '12/2/2022' , rate : '90%' , numberOfQuations : 8 },
  ]

}
