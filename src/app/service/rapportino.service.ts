import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RapportinoService {
  
  risposta:any[] = []
  constructor(private http:HttpClient) {


   }

   AggiornaGiorniMese(giorno:string){
      return this.http.get<any>(`http://localhost:5143/Vistamese/GetAllInfoMese?personaId=1&dataRiferimentostring=${giorno}`)
   }

}
