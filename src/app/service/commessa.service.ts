import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommessaService {

  private titolo : BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private http : HttpClient) { }

  setTitolo(titolo : string)
  {
    this.titolo.next(titolo);
  }

  getTiolo()
  {
    return this.titolo.getValue();
  }
  
}
