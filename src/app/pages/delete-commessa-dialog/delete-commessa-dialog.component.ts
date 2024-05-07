import { Component, Inject } from '@angular/core';
import { CommessaService } from '../../service/commessa.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteCommessaResponseDialogComponent } from '../../ui/delete-commessa-response-dialog/delete-commessa-response-dialog.component';

@Component({
  selector: 'app-delete-commessa-dialog',
  templateUrl: './delete-commessa-dialog.component.html',
  styleUrl: './delete-commessa-dialog.component.scss'
})
export class DeleteCommessaDialogComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data : {commessaId: number}, private commessaService: CommessaService, private dialog : MatDialog){}

  disabilitaCommessa() : void
  {
    this.commessaService.disabilitaCommessaById(this.data.commessaId).subscribe(
      {
        next:(res) =>
        {
         this.dialog.open(DeleteCommessaResponseDialogComponent,
          {
              data: {successMessage : res.message},
              width : 'auto',
              height : 'auto'
          });
        },
        error:(err) =>
        {
          this.dialog.open(DeleteCommessaResponseDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width : 'auto',
              height : 'auto'
            })
        }
      })
  }

}
