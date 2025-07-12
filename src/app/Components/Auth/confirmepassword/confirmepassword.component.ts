import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';

@Component({
  selector: 'app-confirmepassword',
  templateUrl: './confirmepassword.component.html',
  styleUrls: ['./confirmepassword.component.css']
})
export class ConfirmepasswordComponent {


  loginForm!: FormGroup;
  lang: string = 'en';
  constructor(private fb: FormBuilder ,
    private router : Router,
    private _loginService : AuthService,
    private languageService: LanguageService
  ) {

    this.languageService.getLanguage().subscribe(lang => this.lang = lang);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

      // Check if the value is a phone number
    this.loginForm.get('phone')?.valueChanges.subscribe(value => {
      if (this.isPhoneNumber(value)) {
        if (!value.startsWith('+966')) {
          this.loginForm.patchValue({ phone: `+966${value}` }, { emitEvent: false });
        }
      }
    });

  }

  isPhoneNumber(value: string): boolean {
    return /^[0-9]{1,}$/.test(value);
  }

  // Login
  ForgetPass() {

  //   if (this.loginForm.valid) {
  //     const data = this.loginForm.value;
  //     this._loginService.forgetpass(data).subscribe({
  //       next : (res : any ) => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Success',
  //           text: res.message,
  //           confirmButtonColor: '#28a745',
  //           confirmButtonText: 'OK',
  //           timer: 2000,
  //           timerProgressBar: true,
  //         }).then(() => {
  //           localStorage.setItem('phone', this.loginForm.value.phone);
  //           this.router.navigate(['/confirmpass']);
  //         });
  //       },
  //       error : (err) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: err.error?.message,
  //           confirmButtonColor: '#d33',
  //           confirmButtonText: 'Close',
  //           timer: 2000,
  //           timerProgressBar: true,
  //         });
  //       }
  //     })
  //   }else {
  //     this.loginForm.markAllAsTouched();
  //   }

  }


  // 👁️‍🗨️ Toggle
  showPassword : boolean = false
  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
