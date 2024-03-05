import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor( private http: HttpClient, private para : HttpParams ) { }

  
  // Login da DB
  login(username: string, password: string): Observable<any> {
    const body = { Username: username, password: password };
    return this.http.post<any>('http://localhost:5143/Login/AccessoUtente/', body );
  }
}
