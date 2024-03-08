import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarioRequest, GiornoDiLavoro } from '../dto/request/calendario';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportinoService {
  
  
  risposta:CalendarioRequest = new CalendarioRequest()
  count = 0

  constructor(private http:HttpClient) {
    // this.AggiornaGiorniMese(new Date())

   }

   AggiornaGiorniMese(giorno:Date){
    let datePipe = new DatePipe('en-US');
    const dateFormatted = datePipe.transform(giorno, 'yyyy/MM/dd');
    console.log(dateFormatted)
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


   AggiungiAttivitaGiorno(body:any)
   {
    this.http.post<any>("indirizzo controller",body).subscribe(
      
    )

   }
}
