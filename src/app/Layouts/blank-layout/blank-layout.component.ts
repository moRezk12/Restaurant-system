import { Component } from '@angular/core';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {

  sidebarOpen = false;

  lang : string = 'en' ;

  constructor(private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe((lang) => {
      this.lang = lang
    });
    console.log(this.lang);

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


}
