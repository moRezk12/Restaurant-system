import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmepassword',
  templateUrl: './confirmepassword.component.html',
  styleUrls: ['./confirmepassword.component.css']
})
export class ConfirmepasswordComponent implements OnInit {


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
      password: ['', [Validators.required , Validators.minLength(8) , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
    });

    this.email = localStorage.getItem('email') || '';
    this.startTimer(); // تشغيل المؤقت عند تحميل الصفحة
  }



  // Login
  confirmePass() {
    const data = {
      ...this.loginForm.value,
      email: this.email
    };
    if (data) {
      this._loginService.confirmPassword(data).subscribe({
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

  // يحوّل الثواني لدقيقة:ثانية
  get timerDisplay(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  startTimer() {
    this.showResend = false;
    this.timer = 120;

    this.interval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(this.interval);
        this.showResend = true;
      }
    }, 1000);
  }


  resendCode() {
    console.log(this.email);

    if (this.email) {

      this._loginService.forgetPassword(this.email).subscribe({
        next : (res : any ) => {
          this.swalSuccess(res);
          this.startTimer();
        },
        error : (err) => {
          this.swalError(err.error.message);
        }
      })
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
      text: res.message.message || 'Change password successfully'  ,
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
