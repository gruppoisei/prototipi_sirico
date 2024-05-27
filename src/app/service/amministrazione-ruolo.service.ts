import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Ruolo } from '../pages/ruolo-utente/insert-ruolo-funzione/provass/provass.component';

@Injectable({
  providedIn: 'root'
})
export class AmministrazioneRuoloService {

  ruoloId?: number;
  ruoloId$: BehaviorSubject<number> = new BehaviorSubject<number>(this.ruoloId!);

  constructor(
    private Http: HttpClient
  ) { }

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };
  
  private apiUrl = 'http://localhost:5143/AmministrazioneRuolo';

  getRuoloId() {
    return this.ruoloId
  }
  GetAllInfoFunzioneRuoloById(ruoloId: number) {
    return this.Http.get<any>(`${this.apiUrl}/GetAllInfoFunzioniRuoloById?ruoloId=` + ruoloId)
  }
  
  getFunzioni(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetFunzione`);
  }

  getRuoliById(id: number): Observable<any> {
    const res = this.Http.get<any>(`${this.apiUrl}/GetRuoliById?id=${id}`);
    console.log(res);
    return res;
  }

  InserisciAggiornaRuolo(ruolo: Ruolo) {   
    return this.Http.post<any>(`${this.apiUrl}/AssociaFunzioniRuolo`, ruolo);
  }
  
  eliminaRuolo(id: number): Observable<any> {
    return this.Http.post<any>(`${this.apiUrl}/EliminaRuolo?id=${id}`, this.httpOptions);
  }

}
