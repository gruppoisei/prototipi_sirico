import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dipendente-response-dialog',
  templateUrl: './delete-dipendente-response-dialog.component.html',
  styleUrl: './delete-dipendente-response-dialog.component.scss'
})
export class DeleteDipendenteResponseDialogComponent {
errorMessage: string;
successMessage: string;

constructor(@Inject(MAT_DIALOG_DATA) public data: any)
{
  this.errorMessage = data.errorMessage;
  this.successMessage = data.successMessage;
}

}
