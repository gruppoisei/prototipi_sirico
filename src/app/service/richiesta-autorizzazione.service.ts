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

  // INSERIMENTO TIPO RICHIESTA
  addTipo(richiesta: RichiestaEntity): Observable<RichiestaEntity> {
    //console.log(persona.datanascita);
    console.log(richiesta);
    var body = JSON.stringify(richiesta);
    console.log(body);

    return this.Http.post<RichiestaEntity>(
      'http://localhost:5112/Assenze/tipo',
      body,
      this.httpOptions
    );
  }

  // INSERIMENTO APPROVAZIONE RICHIESTA
  approvazione(richiesta: RichiestaEntity): Observable<RichiestaEntity> {
    //console.log(persona.datanascita);
    console.log(richiesta);
    var body = JSON.stringify(richiesta);
    console.log(body);

    return this.Http.post<RichiestaEntity>(
      'http://localhost:5112/Assenze/approvazione',
      body,
      this.httpOptions
    );
  }

  // GET ALL RICHIESTE ASSENZE (TUTTI GLI UTENTI, PUò ESSERE USATO DA SEGRETERIA)
  GetAll(): Observable<RichiestaEntity> {
    return this.Http.get<RichiestaEntity>(
      'http://localhost:5112/RichiestaAutorizzazione/Getall'
    );
  }

  // GET RICHIESTE BY ID RICHIESTA
  GetByIdRichiesta(): Observable<RichiestaEntity> {
    return this.Http.get<RichiestaEntity>(
      'http://localhost:5112/RichiestaAutorizzazione/GetByRichiestaId/{idRichiesta}'
    );
  }

  // GET RICHIESTE BY ID PERSONA
  GetByIdPersona(): Observable<RichiestaEntity> {
    return this.Http.get<RichiestaEntity>(
      'http://localhost:5112/RichiestaAutorizzazione/GetByPersonaId/{idPersona}'
    );
  }
}

export interface RichiestaEntity {
  RiasRichiestaassenzaid: number
  RiasFkPersonaid: number
  RiasFkTiporichiesta: number
  RiasFkResponsabileidApprovazione: number
  RiasApprovato: boolean
  RiasDataorainizioassenza: string
  RiasDataorafineassenza: string 
  RiasNote: string
  RiasSysuser: string
  RiasSysdate: string
  RiasFlagattivo: boolean
  AndpDocumentipersonas: string
}

