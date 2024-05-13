import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { ricercaCliente } from '../dto/request/ricercaCliente';
import { clienteSocieta } from '../dto/response/nuovoCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')
  
  // clienteSubject = new BehaviorSubject<any>(null);
  // cliente$ = this.clienteSubject.asObservable();

idCliente!: number
idCliente$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(this.idCliente);

  baseUrl = 'http://localhost:5143/Cliente/'
  constructor(private http : HttpClient) { }

  
  setTitolo(titolo : string){
    this.titolo.next(titolo);
  }

  getTiolo(){
    return this.titolo.getValue();
  }

  getClienteById(){
    return this.http.get<any>(`${this.baseUrl}GetClienteById/${this.idCliente$.value}`); //, this.httpOptions);
  }
  
  // getClienteById(idCliente : number){
  //   return this.http.get<any>(`${this.baseUrl}GetClienteById/${idCliente}`).pipe(
  //     retry(3)).subscribe(
  //     {
  //       next: (res) => {
  //         this.clienteSubject.next(res);
  //         console.log('this.clienteSubject.value:');
  //         console.log(this.clienteSubject.value);
  //       },
  //       error: (err) => {
  //         console.error('Errore durante il recupero dei dati del cliente:', err);
  //       }
  //     });
  // }

  saveClienteData(datiCliente: clienteSocieta) {
    /*
    if (datiCliente.idcliente != undefined && datiCliente.idcliente != null && datiCliente.idcliente > 0) {
      console.log('caso PUT');
    }
    else {
      console.log('caso POST');
    }
    */
    return this.http.post<any>(`${this.baseUrl}NuovoCliente`, datiCliente);
  }
  
  disabilitaClienteById(idCliente : number){
    return this.http.put<any>(`${this.baseUrl}DisabilitaClienteById/${idCliente}`,{})
  }

  // clearClienteSubject(){
  //   this.clienteSubject.next(null);
  // }

  getVistaClienteFiltrata(queryParams: ricercaCliente) : Observable<any>
  {
    const params = this.creaHttpParams(queryParams)
    return this.http.get<any>(this.baseUrl + 'GetClienteFiltro', {params: params})
  }
  
  private creaHttpParams(parametri: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }):HttpParams
  {
    let httpParams = new HttpParams();

    for(const key in parametri)
    {
      if(parametri.hasOwnProperty(key) && parametri[key] !==null && parametri[key] !== undefined)
      {
        httpParams = httpParams.set(key, String(parametri[key]));
      }
    }
    return httpParams
  }
}
