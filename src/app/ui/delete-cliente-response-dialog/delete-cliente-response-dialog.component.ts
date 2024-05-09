import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cliente-response-dialog',
  templateUrl: './delete-cliente-response-dialog.component.html',
  styleUrl: './delete-cliente-response-dialog.component.scss'
})
export class DeleteClienteResponseDialogComponent {

  errorMessage: string;
  successMessage: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.errorMessage = data.errorMessage;
    this.successMessage = data.successMessage;
  }
  

}
