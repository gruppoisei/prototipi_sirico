import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalRisolviComponent } from '../../modale-risolvi-aspetto-nuovo/modal-risolvi/modal-risolvi.component';
import { ModaleTestiAspettiComponent } from '../../modale-testi/modale-testi-aspetti/modale-testi-aspetti.component';


@Component({
  selector: 'app-pagina-risolvi-aspetto',
  templateUrl: './pagina-risolvi-aspetto.component.html',
  styleUrl: './pagina-risolvi-aspetto.component.scss'
})
export class PaginaRisolviAspettoComponent {

  constructor(private location : Location, private dialog: MatDialog){}

  goBack() {
    this.location.back();
    }
  handleSpecialClick(aspetto: Aspetto) {
  this.dialog.open(ModalRisolviComponent,{
    width: '75%',
    height: '50%',
    data: aspetto
  })
  }

    mostraTesto(testo: string,  id: number) {
      if(id !==9 && testo.trim() !== ''){
        this.dialog.open(ModaleTestiAspettiComponent,
          {
            width: 'auto',
            data : {text: testo}
          });
      }
  }

  eliminaAspetto(aspetto: Aspetto, event: Event) {
    event.stopPropagation(); // Impedisce che l'evento si propaghi alla riga
    this.aspetti = this.aspetti.filter(a => a.idAspetto !== aspetto.idAspetto);
  }

 aspetti:  Aspetto[] = [
  { idAspetto: 1, nomeAspetto: 'Aspetti Informatici', descrizioneCriticita: 'Problemi di rete', descrizioneSuggerimento: 'Migliorare infrastruttura IT' },
  { idAspetto: 2, nomeAspetto: 'Aspetti Organizzativi', descrizioneCriticita: 'Scarsa comunicazione interna', descrizioneSuggerimento: 'Implementare riunioni settimanali' },
  { idAspetto: 5, nomeAspetto: 'Fattori Esogeni', descrizioneCriticita: 'Influenza esterna', descrizioneSuggerimento: '' },
  { idAspetto: 9, nomeAspetto: 'Aspetti Ambientali', descrizioneCriticita: 'Inquinamento ambientale', descrizioneSuggerimento: 'Promuovere pratiche green' },
];
}

interface Aspetto {
  idAspetto: number,
  nomeAspetto: string,
  descrizioneCriticita: string,
  descrizioneSuggerimento: string
}
