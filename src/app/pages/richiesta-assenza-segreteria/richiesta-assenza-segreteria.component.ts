import { Component } from '@angular/core';

@Component({
  selector: 'app-richiesta-assenza-segreteria',
  templateUrl: './richiesta-assenza-segreteria.component.html',
  styleUrl: './richiesta-assenza-segreteria.component.scss',
})
export class RichiestaAssenzaSegreteriaComponent {
  
  idRichiesta: any;
  idPersona: any;
  expandedSection: string = '';
  constructor() {}

  expandSection(section: string) {
    console.log(section);
    this.expandedSection = section;
    //console.log(expandSection);
  }

  inserisciRichiesta() {
    console.log('Inserisci Richiesta');
  }

  approvaRichiesta() {
    console.log('Approva Richiesta con id Richiesta = ' + this.idRichiesta);
  }

  getByRichiestaId() {
    console.log('Cerca Richiesta con id Richiesta= ' + this.idRichiesta);
  }

  getByPersonaId() {
    console.log('Cerca Richiesta con id persona = ' + this.idPersona);
  }

  getall() {
    console.log('Stampa Tutte le Richieste');
  }
}
