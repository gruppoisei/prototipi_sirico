import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor( private http: HttpClient ) { }

  // Login da DB
  login(username: string, password: string): Observable<any> {
    const body = { username, password }
    return this.http.post<any>('http://localhost:5112/AccessoUtente/'+username+"?", body);
  }
}
