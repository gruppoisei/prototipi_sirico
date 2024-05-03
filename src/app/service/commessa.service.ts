import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';

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
  
  salvaCommessa(commessaObj : any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}SalvaCommessa`, commessaObj,{withCredentials : true})
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
}