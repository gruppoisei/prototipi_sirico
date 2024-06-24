import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  titolo: string = "";

  datiAspetto!: Aspetto;
  datiAspetto$: BehaviorSubject<Aspetto | undefined> = new BehaviorSubject<Aspetto | undefined>(this.datiAspetto);

  nuovoAspetto!: string;
  nuovoAspetto$: BehaviorSubject<string> = new BehaviorSubject<string>(this.nuovoAspetto);
  // nuovoAspetto$: BehaviorSubject<Aspetto | undefined> = new BehaviorSubject<Aspetto | undefined>(this.datiAspetto);

  constructor() { }

  setTitolo(campoDaModificare: string): void {
    this.titolo = campoDaModificare;
  }

  getTitolo(): string {
    return this.titolo;
  }

  getAspetto(): Aspetto | undefined {
    return this.datiAspetto$.value;
  }

  checkStringOnlySpaces(testo: string): boolean {    
    const isWhitespaceString = !/\S/.test(testo);    
    return isWhitespaceString;
  }

}

export interface Aspetto {
  idAspetto: number,
  nomeAspetto: string,
  descrizioneCriticita: string,
  descrizioneSuggerimento: string
}