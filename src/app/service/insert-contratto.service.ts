import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { inserimentoContratto } from '../dto/response/inserimentoContratto';
import { BehaviorSubject, timer } from 'rxjs';
import { ricercaContratto } from '../dto/request/ricercaContratto';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  idContratto!: number;
  idContratto$: BehaviorSubject<number> = new BehaviorSubject<number>(this.idContratto)

  
  constructor(private Http: HttpClient) {
  }

  private apiUrl = 'http://localhost:5143/GestioneContratto'; // AGGIORNIAMO QUI L'URL

  getAllTipoSocieta(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetSocieta`);
  }

  getAllTipoContratto(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetTipoContratto`);
  }

  getAllTipoCcnl(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetCCNL`);
  }

  getAllTipoLivello(idTipoLivello: number): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetLivelloContratto/` + idTipoLivello);
  }

  // DIALOG BOX
  getAllDipendentiSenzaContratto(name: string, surname: string, cf: string): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/DipendentiSenzaContratto';
    var newUrl = this.createApiURL(name, surname, cf, Number.parseInt("null"), stringURL);
    return this.Http.get<any>(`${newUrl}`)
  }

  insertNuovoContratto(nuovoContratto: inserimentoContratto): Observable<inserimentoContratto> {
    console.log('entrato insertNuovoContratto()');
    // controllo id contratto; se null faccio post, altrimenti put
    if (this.idContratto$.value != undefined && this.idContratto$.value != null && this.idContratto$.value != 0) {
      console.log('caso put');
      //nuovoContratto.AnpePersonaid = 1;
      var body = JSON.stringify(nuovoContratto);
      console.log('body: ' + body);
      return this.Http.put<inserimentoContratto>(`${this.apiUrl}/AggiornaContratto`, body, this.httpOptions);
    }
    else {
      console.log('caso post');
      nuovoContratto.CodiContrattopersid = 0;
      var body = JSON.stringify(nuovoContratto);
      console.log('body: ' + body);
      return this.Http.post<inserimentoContratto>(`${this.apiUrl}/SalvaNuovoContratto`, body, this.httpOptions);
    }
  }

  getAllContrattiBy(name: string, surname: string, cf: string, society: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
    var newUrl = this.createApiURL(name, surname, cf, society, stringURL);
    return this.Http.get<any>(`${newUrl}`);
  }

  getAllContrattiById(idContratto: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetContrattiById';
    return this.Http.get<any>(`${this.apiUrl}/GetContrattiById/` + idContratto);
  }

  // checking parameters and creating api URL to call
  createApiURL(name: string, surname: string, cf: string, society: number, URL: string) {
    var ampersand = false;
    var stringURL = URL;

    if (name == null && surname == null && cf == null && society == null) {
      // do nothing! 
    }
    else {
      stringURL = stringURL + '?'

      if (name != null) {
        stringURL = stringURL + 'nome=' + name;
        ampersand = true;
      }
      if (surname != null) {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
        }
        stringURL = stringURL + 'cognome=' + surname;
        ampersand = true;
      }
      if (cf != null) {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
        }
        stringURL = stringURL + 'codiceFiscale=' + cf;
        ampersand = true;
      }
      if (society != null && society != 0) { //!= Number.parseInt("null")) {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
        }
        stringURL = stringURL + 'societa=' + society;
        ampersand = true;
      }
    }
    console.log('URL:' + stringURL);
    return stringURL;
  }



}
