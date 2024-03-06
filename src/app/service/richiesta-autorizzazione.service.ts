import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Richiesta } from '../dto/request/assenze';

@Injectable({
  providedIn: 'root',
})
export class RichiestaAutorizzazioneService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl = 'http://localhost:5143/RichiestaAutorizzazione'; // AGGIORNIAMO QUI L'URL
  persone: Richiesta[] = [];
  constructor(private Http: HttpClient) {}

  // INSERIMENTO RICHIESTA ASSENZA
  addRichiesta(richiesta: Richiesta): Observable<Richiesta> {
    //console.log(persona.datanascita);
    console.log(richiesta);
    var body = JSON.stringify(richiesta);
    console.log(body);

    return this.Http.post<Richiesta>(
      `http://localhost:5143/RichiestaAutorizzazione/RichiestaAssenza`,
      body,
      this.httpOptions
    );
  }

  // INSERIMENTO TIPO RICHIESTA
  addTipo(tipo: Richiesta): Observable<Richiesta> {
    //console.log(persona.datanascita);
    console.log(tipo);
    var body = JSON.stringify(tipo);
    console.log(body);

    return this.Http.post<Richiesta>(
      `${this.apiUrl}/TipoRichiestaAssenza`,
      body,
      this.httpOptions
    );
  }

  // INSERIMENTO APPROVAZIONE RICHIESTA
  addApprovazione(idRichiesta: number, risosta: boolean): Observable<any> {
    //console.log(persona.datanascita);
    console.log(risosta);
    var body = JSON.stringify(risosta);
    console.log(body);

    return this.Http.post<any>(`${this.apiUrl}/ApprovazioneRichiesta/${idRichiesta}`, body, this.httpOptions );
  }

  //GET ALL TIPI RICHIESTE PER STAMPARLI
  getAllTipoRichiesta(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetAllTipiRichiesta`);
  }

  // GET ALL RICHIESTE ASSENZE (TUTTI GLI UTENTI, PUò ESSERE USATO DA SEGRETERIA)
  GetAll(): Observable<Richiesta> {
    return this.Http.get<Richiesta>(`${this.apiUrl}/GetAll`);
  }

  // GET RICHIESTE BY ID RICHIESTA
  GetByIdRichiesta(idRichiesta: any): Observable<Richiesta> {
    return this.Http.get<Richiesta>(`${this.apiUrl}/GetByRichiestaId/${idRichiesta}`);
  }

  // GET RICHIESTE BY ID PERSONA
  GetByIdPersona(idPersona: any): Observable<Richiesta> {
    return this.Http.get<Richiesta>(`${this.apiUrl}/GetByPersonaId/${idPersona}`);
  }

  GetResponsabileId(SysUser: any): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetResponsabileId/${SysUser}`);
  }
}

 
/* export interface RichiestaEntity {
  RiasRichiestaassenzaid: number;
  RiasFkPersonaid: number;
  RiasFkTiporichiesta: number;
  RiasFkResponsabileidApprovazione: number;
  RiasApprovato: boolean;
  RiasDataorainizioassenza: string;
  RiasDataorafineassenza: string;
  RiasNote: string;
  RiasSysuser: string;
  RiasSysdate: string;
  RiasFlagattivo: boolean;
  AndpDocumentipersonas: string;
}  */
