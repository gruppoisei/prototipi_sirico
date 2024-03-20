import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { inserimentoContratto } from '../dto/response/inserimentoContratto';
import { BehaviorSubject } from 'rxjs';
import { ricercaContratto } from '../dto/request/ricercaContratto';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {
  /*getAllDipendentiConContratto(name: string, surname: string, cf: string, society: string) {
    throw new Error('Method not implemented.');
  }*/

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };



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
  /*
    getAllTipoRuolo(): Observable<any> {
      return this.Http.get<any>(`${this.apiUrl}/GetTipoLavoratore`);
    }
  */

  // DIALOG BOX
  getAllDipendentiSenzaContratto(name: string, surname: string, cf: string): Observable<any> {
    //console.log('2: name:' + name + '; surname:' + surname + '; cf:' + cf);    
    var stringURL = 'http://localhost:5143/GestioneContratto/DipendentiSenzaContratto';

    var newUrl = this.createApiURL(name, surname, cf, "null", stringURL);
    return this.Http.get<any>(`${newUrl}`)
  }

  insertNuovoContratto(nuovoContratto: inserimentoContratto): Observable<inserimentoContratto> {
    var body = JSON.stringify(nuovoContratto);
    console.log('body: ' + body);
    return this.Http.post<inserimentoContratto>(`${this.apiUrl}/SalvaNuovoContratto`, body, this.httpOptions);
  }

  private dipendenteConContrattoSubject = new BehaviorSubject<any>(null);
  dipendenteConContratto$ = this.dipendenteConContrattoSubject.asObservable();

  getAllContrattiBy(name: string, surname: string, cf: string, society: string): Observable<any> {
    //console.log('2: name:' + name + '; surname:' + surname + '; cf:' + cf);
    var newUrl;
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';

    newUrl = this.createApiURL(name, surname, cf, society, stringURL);

    this.dipendenteConContratto$ = this.Http.get<any>(`${newUrl}`);
    console.log("dipendenteConContratto$" + this.dipendenteConContratto$);
    return this.dipendenteConContratto$;
  }
/*
  getAllContrattiByPROVA(name: string, surname: string, cf: string, society: string) {
    //
    var newUrl;
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
    newUrl = this.createApiURL(name, surname, cf, society, stringURL);
    //
    console.log('URL CREATO');
    this.Http.get<ricercaContratto>(`${newUrl}`).subscribe(
      (response: any) => {
        console.log('response:' + response);
        this.dipendenteConContratto$ = response;
      });        
      //return this.dipendenteConContratto$;
  }
*/
/*
  getAllContrattiByPROVA2(name: string, surname: string, cf: string, society: string) {
    //
    var newUrl;
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
    newUrl = this.createApiURL(name, surname, cf, society, stringURL);
    //
    return this.Http.get<ricercaContratto>(`${newUrl}`).subscribe(
      {
        next: (response) => {
          this.dipendenteConContrattoSubject.next(response);
          console.log("response:" + response);
          console.log("dipendenteConContrattoSubject:" + this.dipendenteConContrattoSubject.getValue());
          console.log("dipendenteConContratto$:" + this.dipendenteConContratto$)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }
*/

  // checking parameters and creating api URL to call
  createApiURL(name: string, surname: string, cf: string, society: string, URL: string) {
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
      if (society != null && society != "null") {
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
