import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InsertContrattoService {
  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  constructor(private Http: HttpClient) { }

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

  getAllTipoRuolo(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetTipoLavoratore`);
  }

  // DIALOG BOX
  getAllDipendentiSenzaContratto(name: string, surname: string, cf: string): Observable<any> {
    console.log('2: name:' + name + '; surname:' + surname + '; cf:' + cf);
    var ampersand = false; 
    var stringURL = 'http://localhost:5143/GestioneContratto/DipendentiSenzaContratto';

    if (name == null && surname == null && cf == null) {
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
    }
    
    //console.log(`${this.apiUrl}/DipendentiSenzaContratto?nome=${name}&cognome=${surname}&codiceFiscale=${cf}`);
    //return this.Http.get<any>(`${this.apiUrl}/DipendentiSenzaContratto`);
    console.log('URL' + stringURL);
    return this.Http.get<any>(`${stringURL}`)
  }

  createApiURL() {

  }

}
