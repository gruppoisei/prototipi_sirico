import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ricercaDipendente } from '../dto/request/ricercaDipendente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrlVP = 'http://localhost:5143/VistaPersone/'
  baseUrlP = 'http://localhost:5143/Persona/'


  constructor(private http : HttpClient) { }

  private creaHttpParams(parametri : ricercaDipendente):HttpParams
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

  getVistaPersoneFiltrata(queryParams : ricercaDipendente) : Observable<any>
  {
    const params = this.creaHttpParams(queryParams)
    return this.http.get<any>(this.baseUrlVP + 'GetVistaFiltrata', {params: params})
  }
  
}