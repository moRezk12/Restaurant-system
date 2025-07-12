import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MaingroupService {

  constructor(private http : HttpClient) { }

  // Get main groups
  getMainGroups() {
    return this.http.get(`${environment.apiUrl}/auth/getMainGroupsWithSubGroups`);
  }

  // Get main group
  getMainGroupForUser() {
    return this.http.get(`${environment.apiUrl}/auth/getMainGroupsForUser`);
  }

  // Create main group
  createMainGroup(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/createMainGroup`, body);
  }

  // Update main group
  updateMainGroup( id : number , body : any ) {
    return this.http.patch(`${environment.apiUrl}/auth/updateMainGroup/${id}` , body);
  }

  // Delete main group
  deleteMainGroup(id : any ) {
    return this.http.delete(`${environment.apiUrl}/auth/deleteMainGroup/${id}`);
  }



}
