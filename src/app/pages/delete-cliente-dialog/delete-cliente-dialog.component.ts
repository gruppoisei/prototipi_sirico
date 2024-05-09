import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../service/cliente.service';
import { DeleteClienteResponseDialogComponent } from '../../ui/delete-cliente-response-dialog/delete-cliente-response-dialog.component';

@Component({
  selector: 'app-delete-cliente-dialog',
  templateUrl: './delete-cliente-dialog.component.html',
  styleUrl: './delete-cliente-dialog.component.scss'
})
export class DeleteClienteDialogComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data : {Idcliente: number}, private clienteService: ClienteService, private dialog : MatDialog){}

  disabilitaCliente() : void
  {
    this.clienteService.disabilitaClienteById(this.data.Idcliente).subscribe(
      {
        next:(res) =>
        {
         this.dialog.open(DeleteClienteResponseDialogComponent,
          {
              data: {successMessage : res.message},
              width : 'auto',
              height : 'auto'
          });
        },
        error:(err) =>
        {
          this.dialog.open(DeleteClienteResponseDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width : 'auto',
              height : 'auto'
            })
        }
      })
  }

}
