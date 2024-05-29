import { Component, INJECTOR, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';

@Component({
  selector: 'app-delete-commperbyids-dialog',
  templateUrl: './delete-commperbyids-dialog.component.html',
  styleUrl: './delete-commperbyids-dialog.component.scss'
})
export class DeleteCommperbyidsDialogComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data : {ids: number[]}, private commessaService: CommessaService, private dialog: MatDialog){}

  disabilitaCommPer():void {
    this.commessaService.disabilitaCommPerByIds(this.data.ids).subscribe({
      next : (res) => {
        this.dialog.open(MessageResponseDialogComponent,
          {
            data : {successMessage: res.message},
            width: 'auto',
            height: 'auto'
          });
      },
      error : (err) => {
        this.dialog.open(MessageResponseDialogComponent,
        {
          data : {errorMessage : err?.error.message},
          width: 'auto',
          height: 'auto'
        });
      }
    });
  }

}
