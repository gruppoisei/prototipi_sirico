import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommessaService {

  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')
  baseUrl = 'http://localhost:5143/Commessa/'
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

}
