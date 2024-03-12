import {
  Component,
  ViewChild,
  TemplateRef,
  provideZoneChangeDetection,
} from '@angular/core';
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
  //richiestefiltrate: any;
  //arrayvuoto: any;
  output_getall: any;
  motivazione: string = '';
  selezione: number = 0;
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;

  constructor(
    private richiestaAutorizzazioneService: RichiestaAutorizzazioneService,
    private dialog: MatDialog
  ) { }

  salvaUsername(nome: string) {
    this.userName = nome;
    //this.getAllStessoResponsabile(this.userName, true, false);
  }

  /*  expandSection(section: string) {
    console.log(section);
    this.expandedSection = section;
  } */

  mostraModalApprovazione(id: any): void {
    this.idRichiesta = id;
    console.log('lavoro su richiesta ' + id);
    this.dialog.open(this.approvalModal, {      
      //panelClass: 'custom-modalbox'
      height: '350px',
      width: '500px'
        

    })
  }

  chiudiModal(): void {
    this.dialog.closeAll();
  }

  approvaRichiesta() {
    console.log('approvo richiesta ' + this.idRichiesta);
    this.richiestaAutorizzazioneService
      .addApprovazione(this.idRichiesta, true, '')
      .subscribe(
        (response) => {
          this.getAllStessoResponsabile(this.userName, this.selezione);
          console.log(response);
          this.chiudiModal();
        },
        (error) => {
          console.error(
            "Errore durante l'approvazione della richiesta:",
            error
          );
          this.chiudiModal();
        }
      );
  }

  rifiutaRichiesta() {
    if (!this.motivazione) {
      alert('Inserisci una motivazione per il rifiuto.');
      return;
    }

    this.richiestaAutorizzazioneService
      .addApprovazione(this.idRichiesta, false, this.motivazione)
      .subscribe(
        (response) => {
          this.getAllStessoResponsabile(this.userName, this.selezione);
          this.chiudiModal();
        },
        (error) => {
          console.error('Errore durante il rifiuto della richiesta:', error);
          this.chiudiModal();
        }
      );
  }

  /*   getByRichiestaId(idRichiesta: any) {
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
  } */

  scelta(scelta: number) {
    this.selezione = scelta;
  }

  cerca() {
    console.log(
      'ricerca per username ' + this.selezione + ' e criterio ' + this.userName
    );
    switch (this.selezione) {
      case 1: { //da modificare
        this.getAllStessoResponsabile(this.userName, this.selezione);
        break;
      }
      case 2: { //approvate
        this.getAllStessoResponsabile(this.userName, this.selezione);
        break;
      }
      case 3: {   //rifiutate
        this.getAllStessoResponsabile(this.userName, this.selezione);
        break;
      }
      default: {  //stampa tutto
        this.getAllStessoResponsabile(this.userName, this.selezione);
        break;
      }
    }
  }

  getAllStessoResponsabile(userName: string, selezione: number) {
    console.log(userName, selezione);
    this.richiestaAutorizzazioneService.GetByUserEScelta(userName, selezione).subscribe((res) => {
      this.output_getall = res;
    });
  }

}
