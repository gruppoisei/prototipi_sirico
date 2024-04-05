import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "http://localhost:5143/";

  constructor(private http : HttpClient) { }


  /*insertUser(userObj:Utente) : Observable<Utente>
  {
    return this.http.post<Utente>(`${this.baseUrl}Login/InsertUser`,userObj)
  }*/

  insertPersona(personaObj: any, fileAllegati : File[]) : Observable<any>
  {
    let formData = new FormData();
    Object.keys(personaObj).forEach(key => {
      formData.append(key, personaObj[key]);
    });
    for (let i = 0; i < fileAllegati.length; i++) {
      formData.append(`file${i}`, fileAllegati[i]);
    }
    return this.http.post<any>(`${this.baseUrl}Persona/AddPersona`, formData)
  }
}
