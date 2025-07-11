import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import intlTelInput from 'intl-tel-input';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LanguageService } from 'src/app/Core/Services/Language/language.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  showPassword = false;
  showConfirmPassword = false;
  lang: string = 'en';

  iti: any; // intl-tel-input instance

  constructor(private fb: FormBuilder, private languageService: LanguageService ,
    private route: Router,
  private _authService: AuthService) {
    this.languageService.getLanguage().subscribe(lang => this.lang = lang);
  }

ngOnInit(): void {
  this.registerForm = this.fb.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subdomain: [''],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],

      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordsMatchValidator }
  );

  const input: HTMLInputElement = document.querySelector('#phone')!;

  this.iti = intlTelInput(input, {
    initialCountry: 'eg',
    separateDialCode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  } as any ) ;

  input.addEventListener('blur', () => {
    const dialCode = this.iti.getSelectedCountryData().dialCode;
    const nationalNumber = input.value.replace(/^0+/, '');
    const fullPhone = `+${dialCode}${nationalNumber}`;

    this.registerForm.patchValue({ phone: fullPhone });
  });
}


  // ✅ دمج كود الدولة + الرقم
  updatePhoneWithCode() {
    if (this.iti) {
      const fullPhone = this.iti.getNumber(); // e.g. +201001234567
      this.registerForm.get('phone')?.setValue(fullPhone, { emitEvent: false });
    }
  }

  // ⛔ تطابق كلمة المرور
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // 👁️‍🗨️ Toggle
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // ✅ إرسال الفورم
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('✅ Final Form Data:', this.registerForm.value);
      this._authService.register(this.registerForm.value).subscribe({
        next: (res : any ) => {
          console.log(res);
          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: res.message.message || 'User created successfully'  ,
              confirmButtonColor: '#28a745',
              confirmButtonText: 'OK',
              timer: 3000, // الوقت بالـ milliseconds (3 ثواني)
              timerProgressBar: true, // شريط وقت العد التنازلي
          }).then(() => {
            this.route.navigate(['/login']);
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
            timer: 3000, // الوقت بالـ milliseconds (3 ثواني)
            timerProgressBar: true, // شريط وقت العد التنازلي
            allowOutsideClick: false, // ما يختفيش بالضغط بره
          });
        }
      });
    } else {
      console.log('❌ Invalid Form Data:', this.registerForm.value);

      this.registerForm.markAllAsTouched();
    }
  }
}
