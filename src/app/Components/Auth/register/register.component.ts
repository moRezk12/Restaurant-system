import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';
// import * as intlTelInput from 'intl-tel-input';
import intlTelInput from 'intl-tel-input';

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
    const inputElement : any = document.querySelector('#phone');
    intlTelInput(inputElement, {
      initialCountry: 'sa',
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    } as any)
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Code
  countryCode: string = '+20';
  mobileNumber: string = '';

}
