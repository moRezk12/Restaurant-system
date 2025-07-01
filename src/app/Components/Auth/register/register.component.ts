import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
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
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


}
