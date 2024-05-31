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

  getDati(){
    return this.http.get<any>(`${this.baseUrl}GetDataUltimoRecordCosti`);
  }

  getRapporti(params: any): Observable<any[]> {
    //build url
    let url = `${this.baseUrl}GetCostiFiltered`;
    let queryParams = [];

    if (params.anno) {
      queryParams.push(`anno=${params.anno}`);
    }
    if (params.mese) {
      queryParams.push(`mese=${params.mese}`);
    }
    if (params.idAzienda) {
      queryParams.push(`idAzienda=${params.idAzienda}`);
    }
    if (params.matricolePersone && params.matricolePersone.length > 0) {
      params.matricolePersone.forEach((matricola: string) => {
        queryParams.push(`matricolePersone=${matricola}`);
      });
    }
    if (params.idCommessa) {
      queryParams.push(`idCommessa=${params.idCommessa}`);
    }

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
    //console.log(url);
    return this.http.get<any[]>(url);
  }
}
