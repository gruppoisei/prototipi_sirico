import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ricercaCommessa } from '../dto/request/ricercaCommessa';

@Injectable({
  providedIn: 'root'
})
export class CommessaService {

  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')
  baseUrlVC = 'http://localhost:5143/VistaCommessa/'
  baseUrl = 'http://localhost:5143/Commessa/'
  private commessaSubject = new BehaviorSubject<any>(null);
  constructor(private http : HttpClient) { }

  setTitolo(titolo : string)
  {
    this.titolo.next(titolo);
  }

  getTiolo()
  {
    return this.titolo.getValue();
  }
  
  salvaCommessa(commessaObj : any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}SalvaCommessa`, commessaObj,{withCredentials : true})
  }

  getCommessaById(commessaId : number)
  {
    return this.http.get<any>(`${this.baseUrl}GetCommessaById/${commessaId}`).subscribe(
      {
        next:(res) =>
        {
          this.commessaSubject.next(res);
        },
        error:(err) => 
        {
          console.log(err)
        }
      });
  }

  getVistaCommessaFiltrata(queryParams: ricercaCommessa) : Observable<any>
  {
    const params = this.creaHttpParams(queryParams)
    return this.http.get<any>(this.baseUrl + 'GetCommessaFiltro', {params: params})
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
