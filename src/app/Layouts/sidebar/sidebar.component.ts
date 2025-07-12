import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor() { }

  @Output() closeSidebar = new EventEmitter<void>();
  toggleSidebar() {
    this.closeSidebar.emit();
  }

  links = [
  {
    name: 'Home',
    icon: 'fa-home',
    link: '/home'
  },
  {
    name: 'Tasks',
    icon: 'fa-tasks',
    link: '/tasks'
  },
  {
    name: 'Users',
    icon: 'fa-users',
    open: false,
    children: [
      { name: 'List User', icon: 'fa-user-plus', link: '/list-user' },
      { name: 'Powers', icon: 'fa-user-shield', link: '/powers' }
    ]
  },
  {
    name: 'Report',
    icon: 'fa-chart-bar',
    link: '/report'
  },
  {
    name: 'Objections',
    icon: 'fa-thumbs-down',
    link: '/objections'
  },
  {
    name: 'Question Rating Reports',
    icon: 'fa-poll',
    link: '/question-rating-reports'
  },
  {
    name: 'Ratings',
    icon: 'fa-star',
    link: '/ratings'
  },
  {
    name: 'Sites',
    icon: 'fa-map-marker-alt',
    link: '/sites'
  },
  {
    name: 'Groups',
    icon: 'fa-layer-group',
    open: false,
    children: [
      {
        name: 'Main Group',
        icon: 'fa-object-group',
        link: '/main-group'
      },
      {
        name: 'SubGroup',
        icon: 'fa-sitemap',
        link: '/subgroup'
      },
    ]
  },
  {
    name: 'Quetions',
    icon: 'fa-question-circle',
    open: false,
    children: [
      {
        name: 'Add Question',
        icon: 'fa-plus-circle',
        link: '/add-question'
      },
      {
        name: 'Question Score',
        icon: 'fa-clipboard-check',
        link: '/question-score'
      },
      {
        name: 'Import Questions',
        icon: 'fa-file-import',
        link: '/import-questions'
      },
    ]
  },
  {
    name: 'Settings',
    icon: 'fa-cog',
    link: '/settings'
  }
];


    toggleDropdown(clickedItem: any) {
    this.links.forEach(item => {
      if (item.children) {
        item.open = item === clickedItem ? !item.open : false;

      }
    });
  }

  closeAllDropdowns() {
    this.links.forEach(item => {
      if (item.children) {
        item.open = false;
      }
    });

    this.toggleSidebar();

  }


}
