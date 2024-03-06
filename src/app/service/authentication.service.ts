import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor( private http: HttpClient,) { }

  
  // Login da DB
  login(loginObj:any): Observable<any> {
    return this.http.post<any>('http://localhost:5143/Login/AccessoUtente/', loginObj );
  }
}
