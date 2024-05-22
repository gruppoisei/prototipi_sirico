import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { ricercaCommessa } from '../dto/request/ricercaCommessa';
import { commessaPersona } from '../dto/request/commessaPersona';

@Injectable({
  providedIn: 'root'
})
export class CommessaService {

  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')
  private commessaSubject = new BehaviorSubject<any>(null);
  commessa$ = this.commessaSubject.asObservable();
  baseUrl = 'http://localhost:5143/Commessa/'
  constructor(private http : HttpClient) { }

  setTitolo(titolo : string){
    this.titolo.next(titolo);
  }

  getTiolo(){
    return this.titolo.getValue();
  }

  getVistaPersoneCommessabyId(commessaId : number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetPersoneByCommessaId/${commessaId}`)
  }

  getCommessaPersoneByIds(ids: number[]): Observable<commessaPersona[]>
  {
    let params = new HttpParams();
    params = params.append('ids', ids.join(','));

    return this.http.get<commessaPersona[]>(`${this.baseUrl}GetCommessaPersoneByIds`, {params})
  }
  
  salvaCommessa(commessaObj : any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}SalvaCommessa`, commessaObj,{withCredentials : true})
  }

  salvaCommessaPersona(commessaPersona : commessaPersona[]){
    return this.http.post<any>(`${this.baseUrl}SalvaCommessaPersona`, commessaPersona, {withCredentials:true})
  }

  getVistaCommessaFiltrata(queryParams: ricercaCommessa) : Observable<any>
  {
    const params = this.creaHttpParams(queryParams)
    return this.http.get<any>(this.baseUrl + 'GetCommessaFiltro', {params: params})
  }

  getVistaCommessaPersonaFiltrata(queryParams: ricercaCommessa) : Observable<any>
  {
    const params = this.creaHttpParams(queryParams)
    return this.http.get<any>(this.baseUrl + 'GetCommessaFiltroConAssegnazioni', {params: params})
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

  getCommessaById(idCommessa : number){
    return this.http.get<any>(`${this.baseUrl}GetCommessaById/${idCommessa}`).pipe(
      retry(3)).subscribe(
      {
        next: (res) => {
          this.commessaSubject.next(res);
        },
        error: (err) => {
          console.error('Errore durante il recupero dei dati della persona:', err);
        }
      });
  }
  
  disabilitaCommessaById(idCommessa : number){
    return this.http.put<any>(`${this.baseUrl}DisabilitaCommessaById/${idCommessa}`,{})
  }

  getAllTipoCommesse() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetAllTipoCommessa`)
  }

  clearCommessaSubject(){
    this.commessaSubject.next(null);
  }

  getAllVistaCommesse()
  {
    return this.http.get<any>(`${this.baseUrl}GetAllVistaCommesse`)
  }

  getAllCommesse()
  {
    return this.http.get<any>(`${this.baseUrl}GetAllCommesse`)
  }
}