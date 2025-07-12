import { HttpClient , HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  // getBranches

  // getBranches(page: number = 1, limit: number = 10) {
  //   return this.http.get<any>(`/api/branches?page=${page}&limit=${limit}`);
  // }
  getBranches(page?: number) {
  let params = new HttpParams();
  if (page) {
    params = params.set('page', page.toString());
  }

  return this.http.post(`${environment.apiUrl}/auth/getBranches`,{},{ params: params });
}


  // createBranch
  createBranch(body : any ) {
    return this.http.post(`${environment.apiUrl}/auth/createBranch`, body);
  }

  // updateBranch
  updateBranch( id : number , body : any ) {
    return this.http.put(`${environment.apiUrl}/auth/updateBranch/${id}` , body);
  }

  // deleteBranch
  deleteBranch(id : any ) {
    return this.http.delete(`${environment.apiUrl}/auth/deleteBranch/${id}`);
  }


}
