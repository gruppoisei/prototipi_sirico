import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../../service/cliente.service';
import { ricercaCliente } from '../../../dto/request/ricercaCliente';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { DeleteClienteDialogComponent } from '../../delete-cliente-dialog/delete-cliente-dialog.component';
import { Router } from '@angular/router';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';


@Component({
  selector: 'app-gestione-cliente',
  templateUrl: './gestione-cliente.component.html',
  styleUrl: './gestione-cliente.component.scss'
})
export class GestioneClienteComponent {

  // EREDITARE
  currentAlias: string = "";
  finalPath: string = "";
  componenteAssociato: any = "";

  listaFunzioni: any[] = [];
  funzione: any;

  //listaComponenti = [{ idComponente: 17, component: InsertClienteComponent }]
  //


  ricercaForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    public menuDinamicoService: MenuDinamicoService,
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

    // this.finalPath = this.menuDinamico.getPathMenu();

    /*
    this.menuDinamico.caricaComponenteAssociato().then((data) => {
      this.finalPath = data;
      console.log("this.finalPath gestione cliente");
      console.log(this.finalPath);
    })
      .catch((ex) => {
        console.log(ex);
      });
*/

    this.menuDinamicoService.loadComponentAssociato();

    // fill listaRuoloFunzioni nell'homepage.component, chiamato subito dopo il login
    // console.log(this.menuDinamicoService.listaRuoloFunzioni);
    this.menuDinamicoService.getPermissionFlag();  
    // console.log(this.menuDinamicoService.funzione);
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
    // this.router.navigate(['/Risorse-umane/insert-cliente']);
    this.router.navigate(['/' + this.menuDinamicoService.finalPath]);

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

  openDialogRestore(Idcliente: number) {
    console.log('openDialogRecover() START');
    //
    if (confirm("Il cliente selezionato verrà ripristinato. Continuare?")) {
      this.clienteService.riattivaClienteById(Idcliente).subscribe(
        (response: any) => {
          console.log(response);
          this.ricercaFiltrata();
        },
        (error: any) => {
          console.error(
            'Errore durante il caricament delle aziende clienti per il distacco.'
          );
        }
      );
    }
    //
    console.log('openDialogRecover() END');
  }

  toggleRicerca() {
    // if (this.datiCliente.length != 0) {
    //   this.ricercaFiltrata();
    // }
    this.ricercaFiltrata();
  }

  ricercaFiltrata() {
    const queryParams: ricercaCliente = this.ricercaForm.value;
    console.log(queryParams)
    this.clienteService.getVistaClienteFiltrata(queryParams)
      .subscribe(
        {
          next: (res) => {
            console.log(res)
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
  mostraNotaCompleta(nota: string) {
    if (nota != null && nota != undefined) {
      alert(nota); // Puoi sostituire questo con qualsiasi altra logica per mostrare il testo completo, come un modale
    }
  }

  close() {
    this.router.navigate(["Home"]);
  }
}

