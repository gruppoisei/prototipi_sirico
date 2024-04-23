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
  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')
  private dipendenteSubject = new BehaviorSubject<any>(null);
  dipendente$ = this.dipendenteSubject.asObservable();


  constructor(private http : HttpClient) { }

  setTitolo(titolo : string)
  {
    this.titolo.next(titolo);
  }

  getTiolo()
  {
    return this.titolo.getValue();
  }

  salvaPersona(personaObj: any, fileAllegati : File[]) : Observable<any>
  {
    let formData = new FormData();
    Object.keys(personaObj).forEach(key => {
      formData.append(key, personaObj[key]);
    });
    for (let i = 0; i < fileAllegati.length; i++) {
      formData.append(`fileAllegati`, fileAllegati[i]);
    }
    return this.http.post<any>(`${this.baseUrlP}SalvaPersona`, formData)
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

  clearDipendente() {
    this.dipendenteSubject.next(null);
  }
}