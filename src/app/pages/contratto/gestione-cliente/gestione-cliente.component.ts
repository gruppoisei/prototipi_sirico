import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../../service/cliente.service';
import { ricercaCliente } from '../../../dto/request/ricercaCliente';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { DeleteClienteDialogComponent } from '../../delete-cliente-dialog/delete-cliente-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestione-cliente',
  templateUrl: './gestione-cliente.component.html',
  styleUrl: './gestione-cliente.component.scss'
})
export class GestioneClienteComponent {
  ricercaForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  datiCliente: any[] = []
  idCliente: number | null = null;

  ngOnInit(): void {
    this.ricercaForm = this.fb.group({
      RagioneSociale: ['', Validators.required],
      PartitaIva: ['', Validators.required],
      SedeLegale: ['', Validators.required],
      SedeOperativa: ['', Validators.required],
      SedeLavoro: ['', Validators.required],
      FlagAttiva: [true],
    })
  }

  setTitoloModificaCliente() {
    this.clienteService.setTitolo('Modifica cliente')
  }

  setTitoloNuovoCliente() {
    this.clienteService.setTitolo('Inserimento nuovo cliente')
  }

  getCliente(Idcliente: number) {
    // this.idCliente = Idcliente;
    // this.clienteService.getClienteById(this.idCliente)
    this.clienteService.idCliente$.next(Idcliente);
    this.router.navigate(['/Segreteria/insert-cliente']);
  }


  clearSearch() {
    this.ricercaForm.reset();
  }

  openDialogDelete(Idcliente: number) {
    this.idCliente = Idcliente
    this.dialog.open(DeleteClienteDialogComponent,
      {
        data: { Idcliente: this.idCliente },
        width: 'auto',
        height: 'auto'
      })
      .afterClosed().subscribe(() => {
        this.ricercaFiltrata();
      })
  }

  ricercaFiltrata() {
    const queryParams: ricercaCliente = this.ricercaForm.value;
    //console.log(queryParams)
    this.clienteService.getVistaClienteFiltrata(queryParams)
      .subscribe(
        {
          next: (res) => {
            //console.log(res)
            this.datiCliente = res.map((cliente: any) => ({
              Idcliente: cliente.idcliente,
              Ragionesociale: cliente.ragionesociale,
              Partitaiva: cliente.partitaiva,
              Sedelegale: cliente.sedelegale,
              Sedeoperativa: cliente.sedeoperativa,
              Patinail: cliente.patinail,
              Rappresentantelegale: cliente.rappresentantelegale,
              Sedelavoro: cliente.sedelavoro,
              Codiceateco: cliente.codiceateco,
              Numerotelefono: cliente.numerotelefono,
              Indirizzopec: cliente.indirizzopec,
              Refamministratore: cliente.refamministratore,
              Emailrefammin: cliente.emailrefammin,
              Telefonorefammin: cliente.telefonorefammin,
              FlagAttiva: cliente.flagAttiva,
            }));
            console.log(this.datiCliente)
          },
          error: (err) => {
            this.dialog.open(ErrorLoginDialogComponent,
              {
                data: { errorMessage: err?.error.message },
                width: 'auto',
                height: 'auto'
              });
          }
        });
  }
}

