import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ricercaDipendente } from '../dto/request/ricercaDipendente';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrlVP = 'http://localhost:5143/VistaPersone/'
  baseUrlP = 'http://localhost:5143/Persona/'
  private data = signal('');
  private dipendenteSubject = new BehaviorSubject<any>(null);
  dipendente$ = this.dipendenteSubject.asObservable();


  constructor(private http : HttpClient) { }

  setData(data : string)
  {
    this.data.set(data);
  }

  getData()
  {
    return this.data;
  }

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

  disabilitaPersonaById(personaId : number)
  {
    return this.http.put<any>(`${this.baseUrlP}DisabilitaPersonaById/${personaId}`, {})
  }

  getPersonaById(personaId : number)
  {
    return this.http.get<any>(`${this.baseUrlP}GetPersonaById/${personaId}`).subscribe(
      {
        next:(res) =>
        {
          this.dipendenteSubject.next(res);
        },
        error:(err) => 
        {
          console.log(err)
        }
      });
  }
}