import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contratto } from '../dto/request/contratto';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {
  getAllDipendentiConContratto(name: string, surname: string, cf: string, society: string) {
    throw new Error('Method not implemented.');
  }
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  constructor(private Http: HttpClient) {
    //this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();

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

  insertNuovoContratto(nuovoContratto: Contratto): Observable<Contratto> {
    var body = JSON.stringify(nuovoContratto);
    console.log('body: ' + body);
    return this.Http.post<Contratto>(`${this.apiUrl}/SalvaNuovoContratto`, body, this.httpOptions);
  }

  getAllContrattiBy(name: string, surname: string, cf: string, society: string): Observable<any> {
    //console.log('2: name:' + name + '; surname:' + surname + '; cf:' + cf);
    var newUrl;
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
      
    newUrl = this.createApiURL(name, surname, cf, society, stringURL);
    return this.Http.get<any>(`${newUrl}`);
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
        stringURL = stringURL + 'nome='+name;
        ampersand = true;
      }
      if (surname != null) {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
         }
        stringURL = stringURL + 'cognome='+surname;
        ampersand = true;
      }
      if (cf != null) {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
         }
        stringURL = stringURL + 'codiceFiscale='+cf;
        ampersand = true;
      }
      if (society != null && society != "null") {
        if (ampersand) {
          stringURL = stringURL + '&'
          ampersand = false;
         }
        stringURL = stringURL + 'societa='+society;
        ampersand = true;
      }
    }
    console.log('URL:' + stringURL);
    return stringURL;
  }

}
