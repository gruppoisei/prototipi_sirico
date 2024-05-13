import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostiPersonaleService {

  baseUrl = 'http://localhost:5143/CostiMensiliPersonale/';

  constructor(private http: HttpClient) { }

  uploadESalvaExcels(fileAllegati: File[], utenteLoggato: string | null) : Observable<any>{
    let formData = new FormData();
    for (let i = 0; i < fileAllegati.length; i++) {
      formData.append(`fileAllegati`, fileAllegati[i]);
    }
    return this.http.post<any>(`${this.baseUrl}uploadESalvaExcels`, formData)
  }

  
  GetCostiByMatricolaMeseAnno(matricola: number, mese: number, anno: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetContrattiById';
    return this.http.get<any>(`${this.baseUrl}GetCostiPersonaleByMatricolaPersona?matricola=` + matricola + "&mese=" + mese + "&anno=" + anno);
  }
}
