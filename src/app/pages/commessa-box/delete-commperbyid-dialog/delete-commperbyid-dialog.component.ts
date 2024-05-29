import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';

@Component({
  selector: 'app-delete-commperbyid-dialog',
  templateUrl: './delete-commperbyid-dialog.component.html',
  styleUrl: './delete-commperbyid-dialog.component.scss'
})
export class DeleteCommperbyidDialogComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data : {id: number}, private commessaService: CommessaService, private dialog: MatDialog)
  {}

  disabilitaCommPer(): void{
    this.commessaService.disabilitaCommPerById(this.data.id).subscribe({
      next:(res) =>
        {
          this.dialog.open(MessageResponseDialogComponent,
            {
              data: {successMessage: res.message},
              width: 'auto',
              height: 'auto'
            });
        },
        error:(err) =>
          {
            this.dialog.open(MessageResponseDialogComponent,
              {
                data: {errorMessage : err?.error.message},
                width : 'auto',
                height : 'auto'
              }
            )
          }
    })
  }

}
