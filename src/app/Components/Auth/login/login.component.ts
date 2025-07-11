import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';
import { LocalstorageService } from 'src/app/Core/Services/localStorage/localstorage.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup
  showPassword: boolean = false;

  lang : string = 'en' ;

  constructor(private fb: FormBuilder, private languageService: LanguageService ,
    private route: Router,
    private _authService: AuthService ,
    private localStorage: LocalstorageService )  {
    this.languageService.getLanguage().subscribe((lang) => {
      this.lang = lang
    });
    console.log(this.lang);

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next: (res : any ) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.message.message || 'Login successfully',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK',
            showConfirmButton: true,
            timer: 3000, // 3 ثواني
            timerProgressBar: true,
          }).then(() => {
            this.localStorage.setToken(res.message.access_Token);
            this.route.navigate(['/home']);
          });

        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message || 'An error occurred'  ,
            confirmButtonColor: '#dc3545',
            confirmButtonText: 'OK',
            showConfirmButton: true,
            timer: 3000, // الوقت بالـ milliseconds (3 ثواني)
            timerProgressBar: true, // شريط وقت العد التنازلي
            allowOutsideClick: false, // ما يختفيش بالضغط بره
          });

        }
      })
    }
  }



}
