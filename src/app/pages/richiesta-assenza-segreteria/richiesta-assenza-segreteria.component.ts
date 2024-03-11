import { Component, ViewChild, TemplateRef } from '@angular/core';
import { RichiestaAutorizzazioneService } from '../../service/richiesta-autorizzazione.service';
import { MatDialog } from '@angular/material/dialog';

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
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;

  constructor(private richiestaAutorizzazioneService: RichiestaAutorizzazioneService, private dialog: MatDialog) {}

  expandSection(section: string) {
    console.log(section);
    this.expandedSection = section;
  }

  mostraModalApprovazione(id: any): void {
    this.idRichiesta = id;
    console.log("lavoro su richiesta " + id);
    this.dialog.open(this.approvalModal);
  }

  chiudiModal(): void {
    this.dialog.closeAll();
  }

  approvaRichiesta() {
    console.log("approvo richiesta " + this.idRichiesta);
    this.richiestaAutorizzazioneService.addApprovazione(this.idRichiesta, true, '').subscribe(
      (response) => {
        this.getAllStessoResponsabile(this.userName);
        this.chiudiModal();
      },
      (error) => {
        console.error('Errore durante l\'approvazione della richiesta:', error);
        this.chiudiModal();
      }
    );
  }

  rifiutaRichiesta() {
    if (!this.motivazione) {
      alert('Inserisci una motivazione per il rifiuto.');
      return;
    }

    this.richiestaAutorizzazioneService.addApprovazione(this.idRichiesta, false, this.motivazione).subscribe(
      (response) => {
        this.getAllStessoResponsabile(this.userName);
        this.chiudiModal();
      },
      (error) => {
        console.error('Errore durante il rifiuto della richiesta:', error);
        this.chiudiModal();
      }
    );
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