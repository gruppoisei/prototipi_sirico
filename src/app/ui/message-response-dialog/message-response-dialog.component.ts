import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-message-response-dialog',
  templateUrl: './message-response-dialog.component.html',
  styleUrl: './message-response-dialog.component.scss',
})
export class MessageResponseDialogComponent {
  errorMessage: any
  successMessage: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.errorMessage = data.errorMessage
    this.successMessage = data.successMessage
  }
}
