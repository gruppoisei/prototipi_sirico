import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttivitaGiorno, CalendarioRequest, GiornoDiLavoro } from '../dto/request/calendario';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs';
import { InfoPersona } from '../dto/request/InfoPersona';

@Injectable({
  providedIn: 'root'
})
export class RapportinoService {
  infoPersona!:InfoPersona
  



    orari: string[]= [
      '08:30','09:00', '09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'
   ]



  risposta:CalendarioRequest = new CalendarioRequest()
  count = 0

  constructor(private http:HttpClient) {
    // this.AggiornaGiorniMese(new Date())
    this.RaccogliInfoPersona()

   }

   AggiornaGiorniMese(giorno:Date){
    let datePipe = new DatePipe('en-US');
    const dateFormatted = datePipe.transform(giorno, 'yyyy/MM/dd');
    this.http.get<CalendarioRequest>(`http://localhost:5143/Vistamese/GetAllInfoMese?personaId=1&dataRiferimentostring=${dateFormatted}`)
    .pipe(
      tap((v) => {
        console.log("vedi risposta: " + this.count );
        console.log(v);
        this.count++
        this.risposta = v;
      }),
    ).subscribe()
   }


   AggiungiAttivitaGiorno(attivitaDaInserire:AttivitaGiorno)
   {
    this.http.post<any>("indirizzo controller",attivitaDaInserire).subscribe(
      
    )

   }


   RaccogliInfoPersona()
   {
    this.http.get<InfoPersona>("http://localhost:5143/Vistamese/InfoPersonaSedeAttivita?personaId=1").subscribe(
        res => this.infoPersona = res
      )
  
   }
}
