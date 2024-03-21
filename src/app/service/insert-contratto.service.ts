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
  /*getAllDipendentiConContratto(name: string, surname: string, cf: string, society: string) {
    throw new Error('Method not implemented.');
  }*/

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  idContratto!: number;
  //public idContratto = new BehaviorSubject<any>(null);
  //idContratto$: Observable<number>;

  idContratto$: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.idContratto = 10
    //this.idContratto = this.toggleidContratto2(this.idContratto)
  )



  /*
    idContratto = new BehaviorSubject<any>(null);
    idContratto$ = this.idContratto.asObservable();
  */
  constructor(private Http: HttpClient) {
    //this.idContratto$ = this.idContratto.asObservable();
    /*
    timer(0).subscribe(() => {
      this.idContratto$.next(77);
      console.log('idContratto$:' + this.idContratto$.value);
      console.log('idContratto:' + this.idContratto);
    })
    */
  }
  
    toggleidContratto(idContratto: number): void {
      //this.idContratto.next(this.idContratto.getValue());
      timer(0).subscribe(() => {
        this.idContratto$.next(idContratto);
        this.idContratto = this.idContratto$.value;
        console.log('toggleidContratto() idContratto$:' + this.idContratto$.value);
        console.log('toggleidContratto() idContratto:' + this.idContratto);
      })
    }

    toggleidContratto2(idContratto: number): number {
      //this.idContratto.next(this.idContratto.getValue());
      timer(0).subscribe(() => {
        this.idContratto$.next(idContratto);
        this.idContratto = this.idContratto$.value;
        console.log('toggleidContratto2() idContratto$:' + this.idContratto$.value);
        console.log('toggleidContratto2() idContratto:' + this.idContratto);        
      })
      return this.idContratto$.value;
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
    var newUrl = this.createApiURL(name, surname, cf, "null", stringURL);
    return this.Http.get<any>(`${newUrl}`)
  }

  insertNuovoContratto(nuovoContratto: inserimentoContratto): Observable<inserimentoContratto> {
    var body = JSON.stringify(nuovoContratto);
    console.log('body: ' + body);
    // controllo id contratto; se null faccio post, altrimenti put
    return this.Http.post<inserimentoContratto>(`${this.apiUrl}/SalvaNuovoContratto`, body, this.httpOptions);
  }

  getAllContrattiBy(name: string, surname: string, cf: string, society: string): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
    var newUrl = this.createApiURL(name, surname, cf, society, stringURL);
    return this.Http.get<any>(`${newUrl}`);
  }

  getAllContrattiById(idContratto: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetContrattiById';
    return this.Http.get<any>(`${this.apiUrl}/GetContrattiById/` + idContratto);
  }

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
