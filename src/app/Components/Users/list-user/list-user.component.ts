import { Component } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class AddUserComponent {

    grid = [
    {name: 'users', value: 7 , icon : 'fas fa-users  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'Tasks', value: 7 , icon : 'fas fa-tasks  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Normal', value: 7 , icon : 'fas fa-circle  ', bg: "#22C55E33" , color: "#22C55E"},
  ]

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

}
