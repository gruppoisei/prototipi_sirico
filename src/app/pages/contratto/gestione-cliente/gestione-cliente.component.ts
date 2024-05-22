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


@Component({
  selector: 'app-gestione-cliente',
  templateUrl: './gestione-cliente.component.html',
  styleUrl: './gestione-cliente.component.scss'
})
export class GestioneClienteComponent {

  currentAlias: string = "";
  componenteAssociato: any = "";
  componenteMappato: any = "";

  // SPOSTARE
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

  caricaComponenteAssociato() {
    console.log("this.router.url")
    console.log(this.router.url)

    this.currentAlias = this.router.url.replaceAll('%20',' ');

    // if (this.router.url.includes('/')) {
    //   // this.currentAlias = this.currentAlias.replace('/','');
    //   this.currentAlias = this.currentAlias.slice(1);
    // }
    
    //     // if (this.router.url.includes('%20')) {
    //     //   this.currentAlias = this.currentAlias.replaceAll('%20', ' ');
    //     // }
    
    console.log("this.currentAlias")
    console.log(this.currentAlias)

    this.getComponenteAssociato();

  }

  async getComponenteAssociato() {
    this.componenteAssociato = await this.amministrazioneRuoloService.getAliasComponenteAssociatoByPath(this.router.url.slice(1)).toPromise();
    console.log("this.componenteAssociato:");
    console.log(this.componenteAssociato);

    this.componenteMappato = {
      // path: this.currentAlias.slice(1) + '/' + this.componenteAssociato.aliasComponente, // modificare il path, inserire il vero path non l'alias!!!!!
      path: this.componenteAssociato.pathDescrizione, // modificare il path, inserire il vero path non l'alias!!!!!
      component: this.listaComponenti.find(componente => componente.idComponente == this.componenteAssociato.idComponente)!.component
    }

    console.log("this.componenteMappato");
    console.log(this.componenteMappato);
    
  }

  // getComponenteAssociato() {
  //   .subscribe(
  //     (response: any) => {
  //       this.componenteAssociato = response;
  //       console.log("this.componenteAssociato:");
  //       console.log(this.componenteAssociato);
  //       console.log("this.componenteAssociato.aliasComponente:");
  //       console.log(this.componenteAssociato.aliasComponente);
  //     });
  // }


  /*
    async getComponenteAssociato() {
      // recupero componente qui
      this.componenteAssociato = await this.amministrazioneRuoloService.getAliasComponenteAssociatoByPath(this.currentAlias).toPromise();
    
      console.log("this.componenteAssociato");
      console.log(this.componenteAssociato);
    }
  */
  testPrint() {
    console.log("this.listaFunzioniFinaleMenu");
    // console.log(this.menuDinamico.listaFunzioniFinaleMenu);
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

