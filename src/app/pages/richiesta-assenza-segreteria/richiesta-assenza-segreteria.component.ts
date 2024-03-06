import { Component } from '@angular/core';
import { RichiestaAutorizzazioneService } from '../../service/richiesta-autorizzazione.service';

@Component({
  selector: 'app-richiesta-assenza-segreteria',
  templateUrl: './richiesta-assenza-segreteria.component.html',
  styleUrl: './richiesta-assenza-segreteria.component.scss',
})
export class RichiestaAssenzaSegreteriaComponent {
  
  idRichiesta: any;
  idPersona: any;
  expandedSection: string = '';
  richieste: any[] = [];

  constructor(private richiestaAutorizzazioneService: RichiestaAutorizzazioneService) {}

  expandSection(section: string) {
    console.log(section);
    this.expandedSection = section;
    //console.log(expandSection);
  }

  approvaRichiesta() {
    console.log('Approva Richiesta con id Richiesta = ' + this.idRichiesta);
  }

  getByRichiestaId(idRichiesta: any) {
    console.log('Cerca Richiesta con id Richiesta= ' + this.idRichiesta);
    console.log('Cerca Richiesta con id persona = ' + this.idPersona);
    this.richiestaAutorizzazioneService.GetByIdRichiesta(idRichiesta).subscribe(
      (response: any) => {
        console.log(response);
        this.richieste = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di assenza:', error);
      }
    );
  }

  getByResponsabileId(idPersona: any) {
    console.log('Cerca Richiesta con id persona = ' + this.idPersona);
    this.richiestaAutorizzazioneService.GetByIdResponsabile(idPersona).subscribe(
      (response: any) => {
        console.log(response);
        this.richieste = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di assenza:', error);
      }
    );
  }

   getall() {
  //   console.log('Stampa Tutte le Richieste');
  //   this.richieste = this.richiestaAutorizzazioneService.GetAll().subscribe(res => this.richieste);
   }
}