import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-password-response-dialog',
  templateUrl: './new-password-response-dialog.component.html',
  styleUrl: './new-password-response-dialog.component.scss'
})
export class NewPasswordResponseDialogComponent {

  errorMessage: string;
  successMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.errorMessage = data.errorMessage;
    this.successMessage = data.successMessage;
  }
}