import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostiPersonaleService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  baseUrl = 'http://localhost:5143/CostiMensiliPersonale/';

  constructor(private http: HttpClient) { }

  uploadESalvaExcels(fileAllegati: File[], utenteLoggato: string) : Observable<any>{
    let formData = new FormData();
    //formData.append('sysuser', utenteLoggato);
    for (let i = 0; i < fileAllegati.length; i++) {
      formData.append(`fileAllegati`, fileAllegati[i]);
    }
    return this.http.post<any>(`${this.baseUrl}uploadESalvaExcels?sysuser=${utenteLoggato}`, formData)
    
  }
  
  GetCostiByMatricolaMeseAnno(IdPersona: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetContrattiById';
    return this.http.get<any>(`${this.baseUrl}GetCostiPersonaleByPersonaId?personaId=` + IdPersona );
  }
}
