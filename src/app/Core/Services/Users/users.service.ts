import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // Get all Permissions
  getAllPermissions() {
    return this.http.get(`${environment.apiUrl}/auth/getAllPermissions`);
  }

  //  getAllUsers
  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/auth/getAllAdminUsers`);
  }

  // Create User
  createUser(body: any) {
    return this.http.post(`${environment.apiUrl}/auth/createAdminUser`, body);
  }

  // Update User
  updateUser(id: number, body: any) {
    return this.http.patch(`${environment.apiUrl}/auth/updateAdminUser/${id}`, body);
  }

  // Delete User
  deleteUser(id: any) {
    return this.http.delete(`${environment.apiUrl}/auth/deleteAdminUser/${id}`);
  }

}
