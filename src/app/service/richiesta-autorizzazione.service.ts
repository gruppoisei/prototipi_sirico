import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAutorizzazioneService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  persone: RichiestaEntity[] = [];
  constructor(private Http: HttpClient) {}

  // INSERIMENTO RICHIESTA ASSENZA
  addRichiesta(richiesta: RichiestaEntity): Observable<RichiestaEntity> {
    //console.log(persona.datanascita);
    console.log(richiesta);
    var body = JSON.stringify(richiesta);
    console.log(body);

    return this.Http.post<RichiestaEntity>(
      'http://localhost:5112/Assenze/',
      body,
      this.httpOptions
    );
  }

  /*   // GET ALL PERSONE
  GetAll(): Observable<PersoneEntity> {
    return this.Http.get<PersoneEntity>(
      'http://localhost:5112/Persone/GetAllPersone'
    );
  } */
}

export interface RichiestaEntity {
  id: number;
  nome: string;
  cognome: string;
  datanascita: string;
  stipendio: number;
  genereid: number;
  societaid: number;
  ruoloid: number;
}
