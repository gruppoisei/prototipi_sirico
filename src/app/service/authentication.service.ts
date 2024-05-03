import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, tap, throwError } from 'rxjs';
import { ruoloUtente } from '../guard/auth.guard';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  baseUrl = 'http://localhost:5143/Login/';
  status : number = 0;
  listStatus = statoAccesso
  utente? : UtenteLoggato
  public utenteLoggato = new BehaviorSubject<string | null>(null);
  utenteLoggato$ = this.utenteLoggato.asObservable();

  utenteId:number = 0
  imageQRCode = ""
  listaRuoliUtente:any[] = []
  httpOptions:Object = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials : true,
  observe:'response'
}

  constructor( private http: HttpClient) {

  }
  
  // Login da DB
  login(loginObj:any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}CredenzialiValide`, loginObj, this.httpOptions)
  }

  resetPasswordReset(username:string)
  {
    return this.http.post<any>(`${this.baseUrl}ResetPasswordUtente/${username}`,{},)
  }

  newPassword(newPasswordObj:any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}ModificaPasswordUtente`,newPasswordObj, {withCredentials : true})
  }

  logout() {
    return this.http.get<any>(`${this.baseUrl}Logout`, this.httpOptions).pipe(
      tap(() => {
        this.utenteLoggato.next(null);
      })
    );
  }
  

  ConfermaMFA(validatoreMFA:string,expire1week:boolean) {
    return this.http
      .post<any>(
        'http://localhost:5143/Login/ConfermaValidatore',
        {utenteId:this.utenteId,codiceVerificaTemporaneo:validatoreMFA,expire1week:expire1week},this.httpOptions
      )
  }
  ConfermaRuolo(ruoloId:number)
  {
    return this.http
      .post<any>(
        'http://localhost:5143/Login/AccessoUtente',
        {idUtente:this.utenteId,idRuolo:ruoloId},this.httpOptions
    
      )

  }

  ValidateToken(): Observable<number> {
    return this.http.get<any>('http://localhost:5143/Login/VerificaToken', this.httpOptions).pipe(
      map((res) => {
        if (res.status == 200) {
          console.log(res.body)
          this.utente = res.body;
          const ruolo = Number(this.utente?.idRuolo);
          return ruolo;
        } else {
          this.utente = undefined;
          this.utenteLoggato.next(null);
          return ruoloUtente.NonLoggato;
        }
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
  

  async ValidateTokenAsync():Promise<number> {
    let response = this.http.get<any>('http://localhost:5143/Login/VerificaToken', this.httpOptions).pipe(
      map((res) => {
        if (res.status == 200) {
          this.utente = res.body;
          const ruolo = Number(this.utente?.idRuolo);
          return ruolo;
        } else {
          this.utente = undefined;
          return ruoloUtente.NonLoggato;
        }
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
    const res = await firstValueFrom(response)
    return res
  }

  storeIdRuolo(idRuolo : string)
  {
    sessionStorage.setItem('RuoloUtente', idRuolo)
  }
  

  getIdRuolo()
  {
    return sessionStorage.getItem('RuoloUtente')
  }
  
  isLoggedIn() : boolean
  {
    return sessionStorage.getItem('RuoloUtente')!= null
  }
}


export enum statoAccesso {
  credenzialiValide = 215, 
  utenteLoggato,
  mancaMFA,
  scadutoMFA,
  richiestaResetPsw,
  accessoNegato = 401
}

export interface UtenteLoggato{
  id: number, username: string, idRuolo: number, listaFunzioniId?: number[], listaMenuId?: number[]
}