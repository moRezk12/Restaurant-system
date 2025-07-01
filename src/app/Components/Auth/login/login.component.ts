import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showPassword: boolean = false;

  lang : string = 'en' ;

  constructor(private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe((lang) => {
      this.lang = lang
    });
    console.log(this.lang);

  }

  ngOnInit(): void {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
