import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarioRequest, GiornoDiLavoro } from '../dto/request/calendario';
import { DatePipe } from '@angular/common';
import { Observable, delay, tap } from 'rxjs';
import { InfoPersona } from '../dto/request/InfoPersona';
import { AttivitaGiornoResponse } from '../dto/response/AttivitaGiorno';
import { GiornoLavorativo } from '../dto/request/giornolavorativo';

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

  constructor(private http: HttpClient) {
    this.RaccogliInfoPersona();
  }

  AggiornaGiorniMese(giorno: Date) {
    let datePipe = new DatePipe('en-US');
    const dateFormatted = datePipe.transform(giorno, 'yyyy/MM/dd');
    this.http
      .get<CalendarioRequest>(
        `http://localhost:5143/Vistamese/GetAllInfoMese?personaId=1&dataRiferimentostring=${dateFormatted}`
      )
      .pipe(
        tap((v) => {
          this.risposta = v;
        })
      )
      .subscribe();
  }

  AggiungiAttivitaGiorno(attivitaDaInserire: AttivitaGiornoResponse): number {
    var nuovaAttivitaId = 0;
    this.http.post<any>('http://localhost:5143/AttivitaGiorno/InsertAttivitaGiornaliera', attivitaDaInserire)
      .subscribe({
        next: (res) =>{ 
        console.log("1:")
        console.log(res)

        try {
          if (res > 0) {
            nuovaAttivitaId = res;
            this.AggiornaBox();
            alert('tutto bene');
            
          }
        } catch (e) {
          console.log(e);
          
        }
      

      }
      });
      return nuovaAttivitaId;
  }

  RaccogliInfoPersona() {
    this.http
      .get<InfoPersona>(
        'http://localhost:5143/Vistamese/InfoPersonaSedeAttivita?personaId=1'
      )
      .subscribe((res) => (this.infoPersona = res));
  }

  EliminaAttivita(attivitaId: number, giornoLavorativoId: number) {
    this.http
      .put<any>(
        'http://localhost:5143/AttivitaGiorno/EliminaAttivitaGiornaliera',
        attivitaId,
        this.httpOptions
      )
      .subscribe((res) => {
        if (res.status == 200) {
          this.AggiornaBox();
        }
      });
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

  ConfermaGiorno(giorno: GiornoLavorativo) {
    this.http.put<any>('', giorno).subscribe((res) => {
      alert('giorno confermato');
      this.AggiornaBox();
    });
  }

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
