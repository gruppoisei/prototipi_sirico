import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InserimentoContratto } from '../dto/response/inserimentoContratto';
import { BehaviorSubject, timer } from 'rxjs';
import { utenteSenzaContatto } from '../dto/request/ricercaContratto';
import { clienteSocieta } from '../dto/response/nuovoCliente';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  httpOptionsFormData: Object = {
    responseType: 'text'
  };

  modalType?: string | null;

  idContratto!: number;
  idContratto$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(this.idContratto);
  isContrattoPassato?: number | null;
  private modalSubject = new BehaviorSubject<boolean>(false);
  modalState = this.modalSubject.asObservable();
  private apiUrl = 'http://localhost:5143/GestioneContratto';
  private clienteDistaccoUrl = 'http://localhost:5143/Cliente';

  idPersonaCronologiaDistacchi?: number | null;
  nomePersonaCronologiaDistacchi?: string | null;
  cognomePersonaCronologiaDistacchi?: string | null;

  //fieldAutoFill!: number;
  fieldAutoFill!: number;
  fieldAutoFill$: BehaviorSubject<any> = new BehaviorSubject<any>(this.fieldAutoFill);

  constructor(private Http: HttpClient) {
  }

  openModal() {
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }

  getAllTipoSocieta(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetSocieta`);
  }

  getAllTipoContratto(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetTipoContratto`);
  }

  getAllTipoCcnl(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetCCNL`);
  }

  getAllTipoLivelloByCCNL(CCNLid: number | null): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetLivelloContratto/` + CCNLid);
  }

  getAllClientiDistacco(): Observable<any> {
    return this.Http.get<any>(`${this.clienteDistaccoUrl}/GetAllClientiDistacco`);
  }

  getAllClienti(): Observable<any> {
    return this.Http.get<any>(`${this.clienteDistaccoUrl}/GetAllClienti`)
  }

  getAllTipitipiMotiviFineContratto(): Observable<any> {
    var res = this.Http.get<any>(`${this.apiUrl}/GetMotiviFineContratto`);
    console.log("motivi fine contratto = " + JSON.stringify(res));
    return res;
  }

  // DIALOG BOX
  getAllDipendentiSenzaContratto(name: string, surname: string, cf: string): Observable<any> {
    var stringURL = `${this.apiUrl}/DipendentiSenzaContratto`;
    var newUrl = this.createApiURL(name, surname, cf, -1, stringURL);
    return this.Http.get<any>(`${newUrl}`)
  }

  getCronologiaDistacco(): Observable<any> {
    console.log(`faccio chiamata per cronologia distacchi a ${this.apiUrl}/CronologiaDistacco/${this.idPersonaCronologiaDistacchi}`)
    return this.Http.get(`${this.apiUrl}/CronologiaDistacco/${this.idPersonaCronologiaDistacchi}`);
  }

  insertNuovoContratto(nuovoContratto: any, fileAllegati: File[]): Observable<InserimentoContratto> {

    if (this.idContratto$.value != undefined && this.idContratto$.value != null && this.idContratto$.value != -5) {
      console.log('caso put');

      let formData = new FormData();
      Object.keys(nuovoContratto).forEach(key => {
        if (nuovoContratto[key] == null) {
          nuovoContratto[key] = ""
        }
        formData.append(key, nuovoContratto[key]);
      });
      for (let i = 0; i < fileAllegati.length; i++) {
        formData.append(`fileAllegati`, fileAllegati[i]);
      }

      console.log('formData: ');
      console.log(formData);
      
      return this.Http.put<any>(`${this.apiUrl}/AggiornaContratto`, formData, this.httpOptionsFormData);
    }
    else {
      console.log('caso post');

      nuovoContratto.codiContrattopersid = 0;
      nuovoContratto.personaId = this.fieldAutoFill$.value.id;

      let formData = new FormData();
      Object.keys(nuovoContratto).forEach(key => {
        if (nuovoContratto[key] == null) {          
          nuovoContratto[key] = ""
        }
        formData.append(key, nuovoContratto[key]);
      });
      for (let i = 0; i < fileAllegati.length; i++) {
        formData.append(`fileAllegati`, fileAllegati[i]);
      }

      console.log('formData: ');
      console.log(formData);
      
      return this.Http.post<any>(`${this.apiUrl}/SalvaNuovoContratto`, formData, this.httpOptionsFormData); 
    }
  }

  deleteContratto(contratto: InserimentoContratto): Observable<InserimentoContratto> {
    console.log('entrato deleteContratto()');
    var body = JSON.stringify(contratto);
    //console.log('body: ' + body);
    return this.Http.put<InserimentoContratto>(`${this.apiUrl}/ChiudiContratto`, body, this.httpOptions);
  }

  getAllContrattiBy(name: string | null, surname: string | null, cf: string | null, society: number | null): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetAllContrattiBy';
    var newUrl = this.createApiURL(name ? name : null, surname, cf, society, stringURL);
    return this.Http.get<any>(`${newUrl}`);
  }

  getContrattiById(idContratto: number): Observable<any> {
    var stringURL = 'http://localhost:5143/GestioneContratto/GetContrattiById';
    return this.Http.get<any>(`${this.apiUrl}/GetContrattiById/` + idContratto);
  }

  createApiURL(name: string | null, surname: string | null, cf: string | null, society: number | null, URL: string | null,) {
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
      if (society != null && society >= 0) { //!= Number.parseInt("null")) {
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
