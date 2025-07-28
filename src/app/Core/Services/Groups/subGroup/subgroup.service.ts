import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubgroupService {

  constructor(private http : HttpClient) { }

  // Get main groups
  getSubGroups() {
    return this.http.get(`${environment.apiUrl}/auth/getMySubGroups`);
  }

  // Get Sub group
  getSubGroupForUser() {
    return this.http.get(`${environment.apiUrl}/auth/getSubGroupsForUser`);
  }

  // Get All Sub group By Main Group id
  getSubGroupsByMainGroupId(mainGroupId: number) {
    return this.http.get(`${environment.apiUrl}/auth/getSubGroupsByMainGroup/${mainGroupId}`);
  }

  // Create Sub group
  createSubGroup(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/createSubGroup`, body);
  }

  // Update Sub group
  updateSubGroup( id : number , body : any ) {
    return this.http.patch(`${environment.apiUrl}/auth/updateSubGroup/${id}` , body);
  }

  // Delete Sub group
  deleteSubGroup(id : any ) {
    return this.http.delete(`${environment.apiUrl}/auth/deleteSubGroup/${id}`);
  }
}
