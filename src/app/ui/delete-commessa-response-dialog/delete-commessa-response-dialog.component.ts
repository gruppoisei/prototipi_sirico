import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-commessa-response-dialog',
  templateUrl: './delete-commessa-response-dialog.component.html',
  styleUrl: './delete-commessa-response-dialog.component.scss'
})
export class DeleteCommessaResponseDialogComponent {
  errorMessage: string;
successMessage: string;

constructor(@Inject(MAT_DIALOG_DATA) public data: any)
{
  this.errorMessage = data.errorMessage;
  this.successMessage = data.successMessage;
}


}
