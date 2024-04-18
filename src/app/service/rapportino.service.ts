import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarioRequest, GiornoDiLavoro } from '../dto/request/calendario';
import { DatePipe } from '@angular/common';
import { Observable, delay, tap } from 'rxjs';
import { InfoPersona } from '../dto/request/InfoPersona';
import { AttivitaGiornoResponse } from '../dto/response/AttivitaGiorno';
import { GiornoLavorativo } from '../dto/request/giornolavorativo';
import { GiorniDaCopiare } from '../dto/request/copiaGiorni';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RapportinoService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
  };
  infoPersona!: InfoPersona;
  risposta: CalendarioRequest = new CalendarioRequest();


  oreProgetto:{nomeProgetto:string,oreProgetto:number}[] = []
  oggi = new Date()

  giorniValidiMese = 0;
  giorniConfermati = 0;
  erroriGiorniMese = 0

  oreMinimeTotali = 0
  oreLavorateMese = 0
  oreAssenzaMese = 0
  oreStraordinarioMese =0

  orari: string[] = [
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
  ];

  constructor(private http: HttpClient,private auth:AuthenticationService) {
    // this.RaccogliInfoPersona();
  }

  
  AggiornaGiorniMese(giorno: Date) {
    this.giorniValidiMese = 0;
    this.giorniConfermati = 0;
    this.erroriGiorniMese = 0

    this.oreMinimeTotali = 0
    this.oreLavorateMese = 0
    this.oreAssenzaMese = 0
    this.oreStraordinarioMese =0
    
    this.oreProgetto=[]
    // this.oreValideMese = 0
    let datePipe = new DatePipe('en-US');
    const dateFormatted = datePipe.transform(giorno, 'yyyy-MM-dd');
    this.http
      .post<CalendarioRequest>(
        `http://localhost:5143/Vistamese/GetAllInfoMese`,{utenteId:this.auth.utente?.id,dataRiferimentostring:dateFormatted}
      )
      .pipe(
        tap((v) => {
          console.log(this.risposta)
          this.risposta = v;
          console.log(v);
        })
      )
      
  }

  AggiungiAttivitaGiorno(
    attivitaDaInserire: AttivitaGiornoResponse
  ): Observable<number> {
    return this.http.post<number>(
      'http://localhost:5143/AttivitaGiorno/InsertAttivitaGiornaliera',
      attivitaDaInserire
    );
  }

  RaccogliInfoPersona() {
    this.http
      .get<InfoPersona>(
        `http://localhost:5143/Vistamese/InfoPersonaSedeAttivita?utenteId=`+this.auth.utente!.id
      )
      .subscribe((res) => {console.log(res);this.infoPersona = res});
  }

  EliminaAttivita(attivitaId: number, giornoLavorativoId: number) {
    this.http
      .put<any>(
        'http://localhost:5143/AttivitaGiorno/EliminaAttivitaGiornaliera',
        attivitaId,
        this.httpOptions
      )
      .subscribe((res) => {
        this.AggiornaBox();
      });
  }

  ConfermaMese() {
    this.http
      .post(
        'http://localhost:5143/Vistamese/ConfermaRapportino',
        this.risposta.rapportino.rapportinoId,
        this.httpOptions
      )
      .subscribe((res) => alert(res));
  }
  EliminaGiorno(giornoId: number) {
    this.http
      .put<any>(
        'http://localhost:5143/AttivitaGiorno/EliminaGiorno',
        giornoId,
        this.httpOptions
      )
      .subscribe((res) => {
        alert('giorno eliminato');
        this.AggiornaBox();
      });
  }

  EliminaAssenza(assenzaId: number) {
    this.http
      .post<string>(
        'http://localhost:5143/RichiestaAutorizzazione/EliminaRichiestaAssenza',
        assenzaId,
        this.httpOptions
      )
      .subscribe((res) => 
      {
        alert(res)
        this.AggiornaBox()

      });
  }

  ConfermaGiorno(giorno: GiornoLavorativo) {
    this.http
      .put<any>('http://localhost:5143/AttivitaGiorno/ConfermaGiorno', giorno,this.httpOptions)
      .subscribe((res) => {
        alert(res);
        this.AggiornaBox();
      });
  }

  CopiaGiorni(body: GiorniDaCopiare) {
    this.http
      .post('http://localhost:5143/Vistamese/CopiaAttivitaGiorno', body)
      .subscribe((res) => {
        this.AggiornaBox();
      });
  }


  //variabili per la gestione delle date del mese
  giornoRiferimento = new Date();

  primoDelMese = new Date();
  ultimoDelMese = new Date();

  giorniMesePassato: number[] = [];
  giorniMeseSeguente: number[] = [];

  AggiornaBox() {
    this.AggiornaGiorniMese(this.giornoRiferimento);

    this.primoDelMese = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth(),
      1
    );

    this.ultimoDelMese = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() + 1,
      0
    );

    this.giorniMesePassato = Array(this.primoDelMese.getDay() - 1)
      .fill(0)
      .map((x, i) => {
        return new Date(
          this.primoDelMese.getFullYear(),
          this.primoDelMese.getMonth(),
          this.primoDelMese.getDate() - this.primoDelMese.getDay() + i + 1
        ).getDate();
      });

    if (this.ultimoDelMese.getDay() == 0) {
      this.giorniMeseSeguente = [];
    } else {
      this.giorniMeseSeguente = Array(7 - this.ultimoDelMese.getDay())
        .fill(0)
        .map((x, i) => {
          return i + 1;
        });
    }
  }
}
