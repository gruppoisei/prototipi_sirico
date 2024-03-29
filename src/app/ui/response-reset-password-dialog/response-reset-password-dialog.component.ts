import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-response-reset-password-dialog',
  templateUrl: './response-reset-password-dialog.component.html',
  styleUrl: './response-reset-password-dialog.component.scss',
})
export class ResponseResetPasswordDialogComponent {
  email: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.email = data.email
  }
}
