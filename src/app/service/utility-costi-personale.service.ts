import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityCostiPersonaleService {

  baseUrl = 'http://localhost:5143/CostiMensiliPersonale/';

  constructor(private http: HttpClient) { }

  uploadExcels(fileAllegati: File[], utenteLoggato: string | null) : Observable<any>{
    let formData = new FormData();
    for (let i = 0; i < fileAllegati.length; i++) {
      formData.append(`fileAllegati`, fileAllegati[i]);
    }
    return this.http.post<any>(`${this.baseUrl}UploadExcel`, formData)
  }
}
