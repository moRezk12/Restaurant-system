import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  loginForm!: FormGroup;

    constructor(private fb: FormBuilder ,
      private router : Router,
      private _loginService : AuthService
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required , Validators.email]],
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
    //           this.router.navigate(['/confirmepassword']);
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

}
