import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

    grid = [
    {name: 'users', value: 7 , icon : 'fas fa-users  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'Tasks', value: 7 , icon : 'fas fa-tasks  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Normal', value: 7 , icon : 'fas fa-circle  ', bg: "#22C55E33" , color: "#22C55E"},
  ]

}
