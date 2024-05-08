import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestione-cliente',
  templateUrl: './gestione-cliente.component.html',
  styleUrl: './gestione-cliente.component.scss'
})
export class GestioneClienteComponent {
  ricercaForm!: FormGroup;
  constructor(private fb : FormBuilder,/* private clienteService : ClienteService,*/  private dialog : MatDialog){}
  datiCommessa: any[] = []
  idCommessa : number | null = null;

  ngOnInit(): void {
    this.ricercaForm = this.fb.group({
      CommessaId : [0],
      Commessa : ['', Validators.required],
      TipoCommessa : ['', Validators.required],
      Societa : ['', Validators.required],
      DataInizio : ['', Validators.required],
      DataFine : ['', Validators.required],
      FlagAttivo : [true],
    })
  }

  setTitoloModificaCliente()
    {
      /*this.clienteService.setTitolo('Modifica cliente')*/
    }

  setTitoloNuovoCliente()
    {
      /*this.clienteService.setTitolo('Inserimento nuovo cliente')*/
    }

  getCliente(commessaId: number)
  {
    /*this.idCommessa = commessaId;
    this.clienteService.getClienteById(this.idCommessa)*/
  }


    clearSearch()
  {
    this.ricercaForm.reset();
  }

  /*openDialogDelete(commessaId : number) {
    this.idCommessa = commessaId
    this.dialog.open(DeleteCommessaDialogComponent,
      {
        data: {commessaId: this.idCommessa},
        width: 'auto',
        height: 'auto'
      })
      .afterClosed().subscribe(() =>
        {
          this.ricercaFiltrata();
        })
    }

    ricercaFiltrata() {
      const queryParams : ricercaCommessa = this.ricercaForm.value;
  
      this.commessaService.getVistaCommessaFiltrata(queryParams)
    .subscribe(
      {
        next:(res) => 
        {
          console.log(res)
          this.datiCommessa = res.map((commessa : any)=>({
            
          }));
        },
        error:(err) =>
        {
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width: 'auto',
              height: 'auto'
            });
        }
      });
    }
  }*/

}

