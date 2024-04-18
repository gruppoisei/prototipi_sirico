import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errore-allegato-dialog',
  templateUrl: './errore-allegato-dialog.component.html',
  styleUrl: './errore-allegato-dialog.component.scss'
})
export class ErroreAllegatoDialogComponent {

  errorMessage : string;

  constructor(@Inject (MAT_DIALOG_DATA) public data : any)
  {
    this.errorMessage = data.errorMessage;
  }
}
