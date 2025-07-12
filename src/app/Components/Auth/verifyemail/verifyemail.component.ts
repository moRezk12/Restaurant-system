import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {


  timer: number = 120; // 2 دقائق = 120 ثانية
  interval: any;
  showResend: boolean = false;

  loginForm!: FormGroup;
  lang: string = 'en';
  constructor(private fb: FormBuilder ,
    private router : Router,
    private _loginService : AuthService,
    private languageService: LanguageService
  ) {

    this.languageService.getLanguage().subscribe(lang => this.lang = lang);
  }

  email : string = '' ;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    this.email = localStorage.getItem('email') || '';
  }



  // Login
  verifyEmail() {
    const data = {
      ...this.loginForm.value,
      email: this.email
    };
    if (data) {
      this._loginService.verifyEmail(data).subscribe({
        next : (res : any ) => {
          this.swalSuccess(res);
        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      })
    }else {
      this.loginForm.markAllAsTouched();
    }

  }





  //  Toggle
  showPassword : boolean = false
  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  //
  swalSuccess( res : any ) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: res.message.message || 'Verify email successfully'  ,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'mySuccess'
      }
    }).then(() => {
      this.router.navigate(['/login']);
    })
  }

  swalError( message : any ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message || 'An error occurred'  ,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'myError'
      }
    })
  }

}
