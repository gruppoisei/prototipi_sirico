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
  

  getAllTipoContratto(): Observable<any> {
    console.log("2");
    return this.Http.get<any>(`${this.apiUrl}/GetTipoContratto`);
  }

}
