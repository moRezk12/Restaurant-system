import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // login
  login(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/loginRestaurant`, body);
  }

  // register
  register(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/registerRestaurant`, body);
  }

  // forgetPassword
  forgetPassword(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/forgetpassword`, body);
  }

  // confirmPassword
  confirmPassword(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/resetpassword`, body);
  }

  // confirmPassword
  verifyEmail(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/confirmOTP`, body);
  }

}
