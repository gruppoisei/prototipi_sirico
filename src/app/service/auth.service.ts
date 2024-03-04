import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../dto/request/utente';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Persona } from '../dto/request/persona';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "http://localhost:5143/";

  constructor(private http : HttpClient) { }


  insertUser(userObj:Utente) : Observable<Utente>
  {
    return this.http.post<Utente>(`${this.baseUrl}Login/InsertUser`,userObj)
  }

  insertPersona(personaObj : Persona) : Observable<any>
  {
    return this.http.post<Persona>(`${this.baseUrl}Persona/AddPersona`, personaObj)
  }


}
