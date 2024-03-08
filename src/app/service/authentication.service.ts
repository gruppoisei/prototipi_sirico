import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  baseUrl = 'http://localhost:5143/Login/'

  constructor( private http: HttpClient,) { }

  
  // Login da DB
  login(loginObj:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}AccessoUtente/`, loginObj );
  }

  resetPasswordReset(username:string) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}ResetPasswordUtente/${username}`,{} )
  }

  newPassword(newPasswordObj:any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}ModificaPasswordUtente`,newPasswordObj)
  }
}
