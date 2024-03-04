import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';


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
  //localhost:5143/Persona/AddPersona
  // Login da DB
  login(username: string, password: string): Observable<any> {
    const body = { username, password }
    return this.http.get<any>(`http://localhost:5143/Login/AccessoUtente?Username=${username}&password=${password}`);
  }
}
