import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor( private http: HttpClient ) { }

  // Login da DB
  login(username: string, password: string): Observable<any> {
    const body = { username, password }
    return this.http.post<any>('http://localhost:5143/Login/AccessoUtente/', {Username:username,password:password});
  }
}
