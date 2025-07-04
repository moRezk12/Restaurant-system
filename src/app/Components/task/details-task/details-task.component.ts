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

}
