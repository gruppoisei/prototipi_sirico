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
  userName: any;
  expandedSection: string = '';
  richieste: any[] = [];
  output_getall : any;
  motivazione: string = '';

  constructor(private richiestaAutorizzazioneService: RichiestaAutorizzazioneService) {}

  expandSection(section: string) {
    console.log(section);
    this.expandedSection = section;
    //console.log(expandSection);
  }

  approvaRichiesta(id: any, motivazione: string) {
    console.log(id);
    




    
    if (confirm('Approvare la richiesta di Assenza?')){
      this.richiestaAutorizzazioneService.addApprovazione(id, true, '').subscribe(
        (response) => {
          alert('Richiesta numero ' + id + ' approvata con successo. ' + response);
        },
        (error) => {
          alert('Errore durante l\'approvazione della richiesta: ' + error);
        });
    } else {
      //chiedere stringa motivazione
      this.richiestaAutorizzazioneService.addApprovazione(id, false, motivazione);
    }
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

  getAllStessoResponsabile(userName: string) {
    this.richiestaAutorizzazioneService.GetAllStessoResponsabile(userName).subscribe(res => {
      this.output_getall = res;
      console.log(this.output_getall);
    })
  }
}