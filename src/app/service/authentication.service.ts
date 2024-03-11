import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  baseUrl = 'http://localhost:5143/Login/'
  
  private isAuthenticated = new BehaviorSubject<boolean>(false)

  constructor( private http: HttpClient,) { }


  getIsAuthenticated() : Observable<boolean>
  {
    return this.isAuthenticated.asObservable();
  }
  
  // Login da DB
  login(loginObj:any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}AccessoUtente/`, loginObj )
    .pipe(
      tap(() => this.isAuthenticated.next(true))
    );
  }

  resetPasswordReset(username:string)
  {
    return this.http.post<any>(`${this.baseUrl}ResetPasswordUtente/${username}`,{} )
  }

  newPassword(newPasswordObj:any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}ModificaPasswordUtente`,newPasswordObj)
  }


}
