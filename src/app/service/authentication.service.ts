import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, Observable, tap} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = 'http://localhost:5143/Login/'
  status: number = 0
  listStatus = statoAccesso
  utente: any
  utenteId: number = 0
  imageQRCode = ''

  httpOptions: Object = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response',
  }

  private isAuthenticated = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable()
  }

  // Login da DB
  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}AccessoUtente/`, loginObj, this.httpOptions).pipe(tap(() => this.isAuthenticated.next(true)))
  }

  resetPasswordReset(username: string) {
    return this.http.post<any>(`${this.baseUrl}ResetPasswordUtente/${username}`, {})
  }

  newPassword(newPasswordObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}ModificaPasswordUtente`, newPasswordObj, {withCredentials: true})
  }

  ConfermaMFA(validatoreMFA: string, expire1week: boolean) {
    console.log(this.utenteId + validatoreMFA)
    return this.http.post<any>(
      'http://localhost:5143/Login/ConfermaValidatore',
      {utenteId: this.utenteId, codiceVerificaTemporaneo: validatoreMFA, expire1week: expire1week},
      this.httpOptions
    )
  }

  verificaToken() {
    this.http.post<any>(`${this.baseUrl}VerificaToken/`, {}, this.httpOptions).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status == 200) {
          this.utente == res.body
          this.utenteId = 0
          this.isAuthenticated.next(true)
        } else {
          debugger
          this.status = 0
          this.utente = null
          this.router.navigate(['/login'])
        }
      },
    })
  }
}

export enum statoAccesso {
  utenteLoggato = 215,
  mancaMFA,
  scadutoMFA,
  richiestaResetPsw,
  accessoNegato = 401,
}
