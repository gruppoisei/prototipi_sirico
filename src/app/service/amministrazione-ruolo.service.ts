import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ruoloFunzione } from '../dto/request/inserimentoNuovoRuolo';
import { BehaviorSubject } from 'rxjs';
import { Ruolo } from '../pages/ruolo-utente/insert-ruolo-utente/provass/provass.component';

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

  httpOptionsNoResponseType: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private apiUrl = 'http://localhost:5143/AmministrazioneRuolo';

  getRuoloId() {
    return this.ruoloId
  }
  GetAllInfoFunzioneRuoloById(ruoloId: number) {
    return this.Http.get<any>(`${this.apiUrl}/GetAllInfoFunzioniRuoloById?ruoloId=` + ruoloId)
  }
  // INIZIO METODI MENU DINAMICO
  GetAllFunzioniComponenteByIdRuolo(ruoloId: number) {
    return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetPathEAliasComponenteByRuoloId?RuoloId=' + ruoloId)
  }

  getComponenteByFunzionalitaAssociata(funzionalitaAssociata: number) {
    return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetComponenteByFunzionalitaAssociata?funzionalitaAssociata=' + funzionalitaAssociata)
  }

  getAliasComponenteAssociatoByPath(path: string) {
    // console.log("path");
    // console.log(path);    
    return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetAliasComponenteAssociatoByPath?path=' + path, this.httpOptionsNoResponseType);
   }
  // FINE METODI MENU DINAMICO

  getFunzioni(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetFunzione`);
  }

  getRuoliById(id: number): Observable<any> {
    const res = this.Http.get<any>(`${this.apiUrl}/GetRuoliById?id=${id}`);
    console.log(res);
    return res;
  }

  InserisciAggiornaRuolo(ruolo: Ruolo) {
    /* 
    for (let i = 0; i < ruolo.listaFunzioni.length; i++) {
      console.log('this.ruolo.listaFunzioni[i].menuPadre:');
      console.log(ruolo.listaFunzioni[i].menuPadre);
    }   
    */
    console.log(ruolo);
    return this.Http.post<any>(`${this.apiUrl}/AssociaFunzioniRuolo`, ruolo);
  }
  // insertNuovoRuolo(listaFunzioni: ruoloFunzione[]): Observable<ruoloFunzione> {    
  //   console.log('listaFunzioni:');
  //   console.log(listaFunzioni);

  //   var body = JSON.stringify(listaFunzioni);
  //   console.log('body: ' + body);

  //   return this.Http.post<ruoloFunzione>(`${this.apiUrl}/NuovoRuolo`, body, this.httpOptions);    
  // }

  /*
  eliminaRuolo(id: number): Observable<any> {
    return this.Http.post<any>('/api/EliminaRuolo', { id });
  }
  */

  eliminaRuolo(id: number): Observable<any> {
    return this.Http.post<any>(`${this.apiUrl}/EliminaRuolo?id=${id}`, this.httpOptions);
  }

}
