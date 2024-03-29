import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-login-dialog',
  templateUrl: './error-login-dialog.component.html',
  styleUrl: './error-login-dialog.component.scss'
})
export class ErrorLoginDialogComponent {

  errorMessage : string;

constructor(@Inject (MAT_DIALOG_DATA) public data: any)
{
  this.errorMessage = data.errorMessage;
}

}
