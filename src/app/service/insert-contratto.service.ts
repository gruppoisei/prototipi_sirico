import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  constructor(private Http: HttpClient) { }

  private apiUrl = 'http://localhost:5143/GestioneContratto'; // AGGIORNIAMO QUI L'URL
  

  getAllTipoSocieta(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetSocieta`);
  }

  getAllTipoContratto(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetTipoContratto`);
  }

  getAllTipoCcnl(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetCCNL`);
  }

  getAllTipoLivello(idTipoLivello: number): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetLivelloContratto/`+idTipoLivello);
  }

  getAllTipoRuolo(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetTipoLavoratore`);
  }

}
