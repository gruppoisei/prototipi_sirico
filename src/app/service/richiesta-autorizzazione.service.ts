import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Richiesta } from '../dto/request/assenze';
import { NuovaRichiestaAssenzaRequest } from '../dto/request/nuovaRichiestaAssenza';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAutorizzazioneService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  private apiUrl = 'http://localhost:5143/RichiestaAutorizzazione'; // AGGIORNIAMO QUI L'URL
  richiesta: Richiesta[] = [];
  constructor(private Http: HttpClient) {}

  addRichiesta(richiesta: NuovaRichiestaAssenzaRequest): Observable<any> {
    
    return this.Http.post<any>(`${this.apiUrl}/RichiestaAssenza`, richiesta, this.httpOptions).pipe(
      
    );
  }
  

  addApprovazione(idRichiesta: number, approvazione: boolean, motivazione: string): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/ApprovazioneRichiesta/${idRichiesta}?approvazione=${approvazione}`);
  }
  
  addTipo(tipo: Richiesta): Observable<Richiesta> {
    var body = JSON.stringify(tipo);
    return this.Http.post<Richiesta>(
      `${this.apiUrl}/TipoRichiestaAssenza`,
      body,
      this.httpOptions
    );
  }

  getAllTipoRichiesta(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetAllTipiRichiesta`);
  }

 /*  GetByIdRichiesta(idRichiesta: any): Observable<Richiesta> {
    return this.Http.get<Richiesta>(`${this.apiUrl}/GetByRichiestaId/${idRichiesta}`);
  }

  GetByIdResponsabile(idPersona: any): Observable<Richiesta> {
    return this.Http.get<Richiesta>(`${this.apiUrl}/GetResponsabileId/${idPersona}`);
  } 
  GetResponsabileId(SysUser: any): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetResponsabileId/${SysUser}`);
  } */

  GetByUserEScelta(userName: string, selezione: number): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetRichiesteStessoResponsabile/${userName}?selezione=${selezione}`);
  }
}
