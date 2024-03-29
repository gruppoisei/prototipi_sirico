import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InsertUtenteService {
  constructor(private Http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  persone: PersoneEntity[] = [];

  // GET PERSONA BY ID
  GetById(id: number): Observable<PersoneEntity> {
    return this.Http.get<PersoneEntity>(
      'http://localhost:5112/Persone/GetPersoneById/' + id
    );
  }

  // INSERIMENTO PERSONA
  addPersona(persona: PersoneEntity): Observable<PersoneEntity> {
    if (persona.datanascita == null || persona.datanascita == '') {
      persona.datanascita = '0001-01-01';
    }
    //console.log(persona.datanascita);
    //console.log(persona);
    var body = JSON.stringify(persona);
    console.log(body);

    return this.Http.post<PersoneEntity>(
      'http://localhost:5112/Persone/InserimentoPersona/',
      body,
      this.httpOptions
    );
  }

  // GET ALL PERSONE
  GetAll(): Observable<PersoneEntity> {
    return this.Http.get<PersoneEntity>(
      'http://localhost:5112/Persone/GetAllPersone'
    );
  }
}

export interface PersoneEntity {
  id: number;
  nome: string;
  cognome: string;
  datanascita: string;
  stipendio: number;
  genereid: number;
  societaid: number;
  ruoloid: number;
}
