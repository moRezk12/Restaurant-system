import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RatesiteService {

  constructor(private http: HttpClient) { }

  getRateing(page?: number) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }

    return this.http.post(`${environment.apiUrl}/auth/getMyEvaluations`, {});
  }

  // Create Mode
  createMode(body : any){
    return this.http.post(`${environment.apiUrl}/auth/createMode`, body);
  }
}
