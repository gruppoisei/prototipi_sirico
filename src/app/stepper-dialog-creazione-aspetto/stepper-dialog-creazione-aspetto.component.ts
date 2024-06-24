import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-stepper-dialog-creazione-aspetto',
  templateUrl: './stepper-dialog-creazione-aspetto.component.html',
  styleUrl: './stepper-dialog-creazione-aspetto.component.scss'
})
export class StepperDialogCreazioneAspettoComponent {

  constructor(
    private dialog: MatDialog,
    private stepperService: StepperService
  ) { }

  nomeNuovoAspetto: string = "";

  confirmDialogStepperNuovoAspetto() {

    // verifico se il testo inserito dall'utente contiene solo spazi bianchi
    const esito = this.stepperService.checkStringOnlySpaces(this.nomeNuovoAspetto.trim());

    if (esito == false) {

      console.log(this.nomeNuovoAspetto);
      this.stepperService.nuovoAspetto$.next(this.nomeNuovoAspetto.trim());
      this.dialog.closeAll();

    }
    else if (esito == true) {
      alert('Inserire un nome aspetto valido per proseguire.');
    }
  }

  closeDialogStepperNuovoAspetto() {
    if (confirm('Le modifiche effettuate non saranno salvate. Chiudere?')) {
      this.stepperService.nuovoAspetto$.next("");
      this.dialog.closeAll();
      return true;
    }
    else return false;
  }

}
