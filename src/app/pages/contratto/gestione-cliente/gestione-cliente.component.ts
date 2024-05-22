import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../../service/cliente.service';
import { ricercaCliente } from '../../../dto/request/ricercaCliente';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { DeleteClienteDialogComponent } from '../../delete-cliente-dialog/delete-cliente-dialog.component';
import { Router } from '@angular/router';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { InsertClienteComponent } from '../insert-cliente/insert-cliente.component';
import { MenuDinamicoComponent } from '../../../menu/menu-dinamico/menu-dinamico.component';


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
  
  listaComponenti = [{ idComponente: 17, component: InsertClienteComponent }]
  //


  ricercaForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    // SPOSTARE
    private amministrazioneRuoloService: AmministrazioneRuoloService,
    //
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

    this.caricaComponenteAssociato();

    //

    //
  }

  
  async caricaComponenteAssociato() {

    console.log("this.router.url")
    console.log(this.router.url)

    this.currentAlias = this.router.url.replaceAll('%20',' ');

    console.log("this.currentAlias")
    console.log(this.currentAlias)
    
    var lastAlias = this.currentAlias.substring(this.currentAlias.lastIndexOf("/") + 1, this.currentAlias.length);

    // this.componenteAssociato = await this.amministrazioneRuoloService.getAliasComponenteAssociatoByPath(this.router.url.slice(1)).toPromise();
    this.componenteAssociato = await this.amministrazioneRuoloService.getAliasComponenteAssociatoByPath(lastAlias).toPromise();
    
    console.log("this.componenteAssociato:");
    console.log(this.componenteAssociato);

    this.finalPath = this.currentAlias + '/' + this.componenteAssociato.pathDescrizione;
    
    console.log("this.finalPath");
    console.log(this.finalPath);
    
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
}

