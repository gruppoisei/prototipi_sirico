import { Component } from '@angular/core';
import { Aspetto, StepperService } from '../stepper.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stepper-dialog-modifica',
  templateUrl: './stepper-dialog-modifica.component.html',
  styleUrl: './stepper-dialog-modifica.component.scss'
})
export class StepperDialogModificaComponent {

  titolo: string = "";
  aspettoDaModificare: Aspetto | undefined;
  descrizione: any;

  constructor(private stepperService: StepperService, private dialog: MatDialog) {

    this.titolo = stepperService.getTitolo();
    this.aspettoDaModificare = stepperService.getAspetto();

    switch (this.titolo) {

      case 'Criticita': {
        this.descrizione = this.aspettoDaModificare?.descrizioneCriticita;
        break;
      }

      case 'Suggerimento': {
        this.descrizione = this.aspettoDaModificare?.descrizioneSuggerimento;
        break;
      }
    }    
    
  }

  confirmDialogStepperModifica() {
    // verifico se il testo inserito dall'utente contiene solo spazi bianchi
    const esito = this.stepperService.checkStringOnlySpaces(this.descrizione.trim());

    switch (this.titolo) {

      case 'Criticita': {
        if (esito == false) {
          this.aspettoDaModificare!.descrizioneCriticita = this.descrizione.trim();
        }
        else if (esito == true) {
          alert('Inserire una descrizione valida per proseguire.');
        }
        break;
      }

      case 'Suggerimento': {
        this.aspettoDaModificare!.descrizioneSuggerimento = this.descrizione.trim();
        break;
      }
    }

    this.stepperService.datiAspetto$.next(this.aspettoDaModificare);
    this.dialog.closeAll();
  }

  closeDialogStepperModifica() {
    if (confirm('Le modifiche effettuate non saranno salvate. Chiudere?')) {
      this.dialog.closeAll();
      return true;
    }
    else return false;
  }


}
