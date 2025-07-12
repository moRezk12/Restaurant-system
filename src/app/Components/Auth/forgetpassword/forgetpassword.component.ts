import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  forgetForm!: FormGroup;

    constructor(private fb: FormBuilder ,
      private router : Router,
      private _loginService : AuthService
    ) {}

    ngOnInit(): void {
      this.forgetForm = this.fb.group({
        email: ['', [Validators.required , Validators.email]],
      });

    }

    // Login
    ForgetPass() {

      localStorage.setItem('email', this.forgetForm.value.email);
      console.log(this.forgetForm.value);
      if (this.forgetForm.valid) {

        this._loginService.forgetPassword(this.forgetForm.value).subscribe({
          next : (res : any ) => {
            this.swalSuccess(res);
          },
          error : (err) => {
            this.swalError(err.error.message);

          }
        })
      }else {
        this.forgetForm.markAllAsTouched();
      }

    }

  swalSuccess( res : any ) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: res.message.message || 'Check your email '  ,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
      timerProgressBar: true,
      customClass: {
        confirmButton: 'mySuccess'
      }
    }).then(() => {
      this.router.navigate(['/confirmepassword']);
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
