import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InserimentoContratto } from '../../../dto/response/inserimentoContratto';
import { utenteSenzaContatto } from '../../../dto/request/ricercaContratto';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { GestioneContrattoComponent } from '../gestione-contratto/gestione-contratto.component';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { InsertClienteComponent } from '../insert-cliente/insert-cliente.component';
import { CronologiaDistaccoComponent } from '../cronologia-distacco/cronologia-distacco.component';
import FormattaData from '../../../helpers/formattaData';
import { faL, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, tap } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  providers: [GestioneContrattoComponent],
})
export class InsertContrattoComponent implements OnInit {
  partitaIvaID: number = 3; //non toccarlo
  formValidation?: boolean | undefined = false;
  disable_fields: any; // canc?
  showMotivazioneFineContratto: boolean = false;
  checkDateValidity: boolean = false;
  dateinizioTouched: boolean = false;
  datefineTouched: boolean = false;
  modalNuovaAziendaCliente: boolean = false;
  showModal: boolean = false;
  disablePartitaIvaField: boolean = true;
  hidePartitaIvaField: boolean = false;
  subscription!: Subscription;
  idContratto!: number;
  costopresuntomese?: number | null = null;
  costopresuntogiorno?: number | null = null;
  vecchiaRal?: number | null = null;
  vecchiamensile?: number | null = null;
  vecchiagiornaliera?: number | null = null;
  giorniLavorativiAlMese: number = 26;
  mesiLavorativiAllAnno: number = 13;
  output_ricercaFiltrata: any;
  contratto: any; // canc?
  id: any; // canc?
  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;
  dipendentiConContratto?: InserimentoContratto;
  anpePartitaiva?: string | null;
  pannelloEspanso : boolean = false;

  /*
  {"codiContrattopersid":25,"codiRalcompenso":1234,"codiMonteore":40,"codiDatainiziocontratto":"2024-03-15T00:00:00",
  "codiDatafinecontratto":null,"codiSmartworking":true,"codiNote":"Tante spiegazioni e note.","codiFlagAttiva":1,"codsDistaccoid":56,
  "codsValoredistacco":5,"codsDatainiziodistacco":"2024-03-18T00:00:00","codsDatafinedistacco":"2024-03-24T00:00:00","codsFlagAttiva":1,
  "nome":"Alessandro","cognome":"De Angelis","personaId":2,"codiceFiscale":"DNGLSN00E09G478N","ccnlid":5,"descrizioneCCNL":"Commercio",
  "livelloid":19,"livelloContratto":"A1","motivid":null,"motivdesc":null,"tipoid":2,"tipodesc":"Indeterminato","societaDistaccoid":1,
  "societaPersonaid":1,"societaPersona":"Gruppo ISEI","clienteDistaccoid":1,"clienteDistacco":null}
  */

  tipiSocieta: { societaid: number; ragionesociale: string }[] = [];                  //
  tipiContratto: { tipoid: number; tipodesc: string }[] = [];                         //
  tipiCcnl: { ccnlid: number; descrizioneCCNL: string }[] = [];                       //
  tipiLivello: { livelloid: number; livelloContratto: string; }[] = [];               //
  tipiClientiDistacco: { clienteDistaccoid: number; clienteDistacco: string }[] = []; //
  tipiMotiviFinecontratto: { motivid: number; motivdesc: string }[] = [];             //
  array_societa: any = [];
  private routeSub!: Subscription;

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  //formData: FormGroup;
  
  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null,
    anpePartitaiva: null
  };

  formData: InserimentoContratto= {
    codiContrattopersid: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiDatainiziocontratto: null,
    codiDatafinecontratto: null,
    codiSmartworking: null,
    codiNote: null,
    codiFlagAttiva: 1,
    codsDistaccoid: null,
    codsValoredistacco: null,
    codsDatainiziodistacco: null,
    codsDatafinedistacco: null,
    codsFlagAttiva: 0,
    nome: null,
    cognome: null,
    personaId: null,
    codiceFiscale: null,
    partitaIva: null,
    ccnlid: null,
    descrizioneCCNL: null,
    livelloid: null,
    livelloContratto: null,
    motivid: null,
    motivdesc: null,
    tipoid: null,
    tipodesc: null,
    societaDistaccoid: null,
    societaPersonaid: null,
    societaPersona: null,
    clienteDistaccoid: null,
    clienteDistacco: null,
    sysuser: "null"
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.getAllTipitipiMotiviFineContratto();
    this.disable_fields = true;
    console.log(' id contratto passato = ' + this.inserimentoContrattoService.idContratto$.value);
    this.controllovisibilPartitaIva();
    this.inserimentoContrattoService.idContratto$.value !== undefined ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    }

  openModalIfLastOptionSelected(event: MatSelectChange) {  //nuovo cliente
    if (event.value === -1) {
      const dialogRef = this.dialog.open(InsertClienteComponent, {
        width: '50%',
        height: '60%',
      });
    }
  }

  closeModalNuovoClietne() {
    const dialogRef = this.dialog.closeAll();
  }

  openCronologiaDistaccoModal(personaId: number) {
    console.log("personaId: " + personaId);
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = personaId;
    const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
      width: '75%',
      height: '80%',
    });
  }

  closeForm() {
    if (
      confirm(
        'La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'
      )
    )
      this.router.navigate(['Segreteria/gestione-contratto']);
  }

  dataFineContrattoSelezionata() {
    this.showMotivazioneFineContratto = true;
    this.formValidationCheck();
  }

  clearForm() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.reset();
    } else {
      console.log('Operazione annullata');
    }
  }

  reset() {
    this.formData = {
      codiContrattopersid: null,
      codiRalcompenso: null,
      codiMonteore: null,
      codiDatainiziocontratto: null,
      codiDatafinecontratto: null,
      codiSmartworking: null,
      codiNote: null,
      codiFlagAttiva: 1,
      codsDistaccoid: null,
      codsValoredistacco: null,
      codsDatainiziodistacco: null,
      codsDatafinedistacco: null,
      codsFlagAttiva: 0,
      nome: null,
      cognome: null,
      personaId: null,
      codiceFiscale: null,
      partitaIva: null,
      ccnlid: null,
      descrizioneCCNL: null,
      livelloid: null,
      livelloContratto: null,
      motivid: null,
      motivdesc: null,
      tipoid: null,
      tipodesc: null,
      societaDistaccoid: null,
      societaPersonaid: null,
      societaPersona: null,
      clienteDistaccoid: null,
      clienteDistacco: null,
      sysuser: "null"
    };
  }

  getAllTipoSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiSocieta = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di societa:', error);
      }
    );
  }

  getAllTipoContratto() {
    this.inserimentoContrattoService.getAllTipoContratto().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiContratto = response;
      },
      (error: any) => {
        console.error(
          'Errore durante il recupero dei tipi di contratto:',
          error
        );
      }
    );
  }

  getAllTipoCcnl() {
    this.inserimentoContrattoService.getAllTipoCcnl().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiCcnl = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllClienti() {
    this.inserimentoContrattoService.getAllClienti().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiClientiDistacco = response.concat([
          { clienteDistaccoid: -1, clienteDistacco: 'Nuova azienda cliente' },
        ]);
      },
      (error: any) => {
        console.error(
          'Errore durante il caricament delle aziende clienti per il distacco.'
        );
      }
    );
  }

  getAllTipoLivelloByCCNL(id: number | null) {
    if (this.formData.ccnlid !== null) {
      this.inserimentoContrattoService.getAllTipoLivelloByCCNL(id)
        .subscribe(
          (data) => {
            this.tipiLivello = data;
            console.log('Dati tipi livello:', data);
          },
          (error) => {
            console.error('Errore durante il recupero dei tipi livello:', error);
          }
        );
    }
  }

  getAllTipitipiMotiviFineContratto() {
    this.inserimentoContrattoService.getAllTipitipiMotiviFineContratto()
      .subscribe(
        (response: any) => {
          console.log('response get tipi motivo fine contratto:' + response);
          this.tipiMotiviFinecontratto = response;
        },
        (error: any) => {
          console.error('Errore durante il recupero dei tipi di livello:', error);
        }
      );
  }

  controllovisibilPartitaIva() {
    console.log("visibilita e disabilità partitaiva: " + this.hidePartitaIvaField + this.disablePartitaIvaField + " perché anpepartita iva è null? " + (this.anpePartitaiva !== null));
    this.hidePartitaIvaField = (this.formData.tipoid != null && this.formData.tipoid === this.partitaIvaID) ? true : false;
    this.disablePartitaIvaField = (this.formData.partitaIva !== null) ? true : false;
    console.log("visibilita partitaiva:  e se anpe è null " + this.hidePartitaIvaField + this.disablePartitaIvaField );
  }

  formatInputValue(event: any) {
    this.formData.codsValoredistacco = event.target.replace(/\D+/g, '');
  }

  showModalRicercaUtentiSenzaContratto(): void {
    console.log('lavoro nel dialog box');
    this.dialog.open(this.approvalModal, {
      width: '80vw',
      height: '80vh',
    });
    this.ricercaFiltrata('', '', '');
  }

  closeModalRicercaUtentiSenzaContratto(): void {
    this.dialog.closeAll();
  }

  clearSearch() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.formDataDialog = {
        nome: null,
        cognome: null,
        codiceFiscale: null,
        partitaIva: null
      };
    } else {
      console.log('Operazione annullata');
    }
  }

  ricercaFiltrata(name: string, surname: string, cf: string) {
    this.inserimentoContrattoService
      .getAllDipendentiSenzaContratto(name, surname, cf)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dipendentiSenzaContratto = response;
          this.output_ricercaFiltrata = true;
        },
        (error: any) => {
          console.error(
            'Errore durante il recupero della lista dei dipendenti senza contratto:',
            error
          );
        }
      );
  }

  autoFillFields(array_index: number) {
    if (
      this.dipendentiSenzaContratto &&
      this.dipendentiSenzaContratto.length > array_index
    ) {
      const dipendente = this.dipendentiSenzaContratto[array_index];
      if (dipendente) {
        this.formData.personaId = dipendente.anpePersonaid;
        this.formData.codiceFiscale = dipendente.anpeCodicefiscale;
        this.formData.nome = dipendente.anpeNome;
        this.formData.cognome = dipendente.anpeCognome;
        this.formData.partitaIva = dipendente.anpePartitaiva ?? null;
        this.formData.partitaIva ? this.hidePartitaIvaField = true : this.hidePartitaIvaField = false;
        this.formData.partitaIva ? this.disablePartitaIvaField = true : this.disablePartitaIvaField = false;
        //this.inserimentoContrattoService.idContratto$.next(0);
        this.closeModalRicercaUtentiSenzaContratto();
      }
    }
  }
  
  insertContratto() {
    console.log("inizio funzione insert contratto ")
    debugger;
    this.formValidationCheck();
    if (this.formValidation){
      this.inserimentoContrattoService
        .insertNuovoContratto(this.formData)
        .subscribe(
          (response: any) => {
            console.log(response);
            alert(response);
            this.clearForm();
          },
          (error: any) => {
            console.error("Errore durante l'inserimento del nuovo contratto:", error);
            alert("Errore durante l'inserimento del nuovo contratto");
          }
        );
    } else {
      console.log('formValidation ha trovato un errore. form = ' + JSON.stringify(this.formData));
    }
  }

  insertContrattobis() {
    console.log("inizio funzione insert contratto bis");
  }

  async getContrattoByidContratto(idContratto: number) {
    try {
      const response = await this.inserimentoContrattoService.getContrattiById(idContratto).toPromise();
      const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(response.ccnlid).toPromise();

      this.tipiLivello = livelli;
      this.formData = response;
      // Formattazione della data di nascita
      this.formData.codiDatainiziocontratto = FormattaData.formattaData(response.codiDatainiziocontratto);
      this.formData.codiDatafinecontratto = FormattaData.formattaData(response.codiDatafinecontratto);
      this.formData.codsDatainiziodistacco = FormattaData.formattaData(response.codsDatainiziodistacco);
      this.formData.codsDatafinedistacco = FormattaData.formattaData(response.codsDatafinedistacco);
      
      this.pannelloEspanso = this.formData.codsFlagAttiva ? true : false;
      console.log("Contratto caricato:", response);
      this.updateCosts();
      return true;
    } catch (error) {
      console.error("Errore nell'apertura di un contratto:", error);
      return false;
    }
  }

  formValidationCheck() {
    debugger;
    const formCompilato = this.formData;
    const isNotBlank = (value: any) => value !== undefined && value !== null && value !== '';
    const isTruthy = (value: any) => !!value;
    const isAnsoSocietaidValid = isTruthy(formCompilato.societaPersonaid) /*  ? true : console.log("trovato errore su societapersonaid") */ ;
    const isCodiDatainiziocontrattoValid = isNotBlank(formCompilato.codiDatainiziocontratto);
    const isCodiDatafinecontrattoValid = isNotBlank(formCompilato.codiDatafinecontratto);
    const isCotctipocontrattoidValid = isTruthy(formCompilato.tipoid);
    const isCoccCcnlidValid = isTruthy(formCompilato.ccnlid);
    const isColiLivelloidValid = isTruthy(formCompilato.livelloContratto);
    const isCodiRalcompensoValid = isTruthy(formCompilato.codiRalcompenso);
    const isCodiMonteoreValid = isTruthy(formCompilato.codiMonteore);
    const isCodiSmartworkingValid = isNotBlank(formCompilato.codiSmartworking);

    const isValidDistaccoFields = formCompilato.codsFlagAttiva ?
      (isNotBlank(formCompilato.codsValoredistacco) &&
      isNotBlank(formCompilato.clienteDistaccoid) &&
      isNotBlank(formCompilato.codsDatainiziodistacco) &&
      isNotBlank(formCompilato.codsDatafinedistacco)) : true;

    const isValidPartitaivaFields = this.hidePartitaIvaField ? (isNotBlank(formCompilato.partitaIva)) : true;
    this.formValidation =
      isAnsoSocietaidValid &&
      isCodiDatainiziocontrattoValid &&
      isCodiDatafinecontrattoValid &&
      isCotctipocontrattoidValid &&
      isCoccCcnlidValid &&
      isColiLivelloidValid &&
      isCodiRalcompensoValid &&
      isCodiMonteoreValid &&
      isCodiSmartworkingValid &&
      isValidDistaccoFields &&
      isValidPartitaivaFields;

    this.formValidationCheckDates();
  }

  formValidationCheckDates() {
    const startDateContratto = this.formData.codiDatainiziocontratto ? new Date(this.formData.codiDatainiziocontratto) : null;
    const endDateContratto = this.formData.codiDatafinecontratto ? new Date(this.formData.codiDatafinecontratto) : null;
    const startDateDistacco = this.formData.codsDatainiziodistacco ? new Date(this.formData.codsDatainiziodistacco) : null;
    const endDateDistacco = this.formData.codsDatafinedistacco ? new Date(this.formData.codsDatafinedistacco) : null;
    
    const isValidContratto = startDateContratto && endDateContratto && startDateContratto < endDateContratto;
    const isValidDistacco = startDateDistacco && endDateDistacco && startDateDistacco < endDateDistacco;

    this.formValidation = isValidContratto ? (isValidDistacco ? isValidContratto && isValidDistacco : false) : false;
  }

  updateCosts() {
    if (this.costopresuntomese && this.costopresuntomese != this.vecchiamensile) {
      console.log("modifico costi da costopresuntomese");
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
      this.formData.codiRalcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.costopresuntogiorno && this.costopresuntogiorno != this.vecchiagiornaliera) {
      console.log("modifico costi da costopresuntogiorno");
      this.costopresuntomese = parseFloat((this.costopresuntogiorno * this.giorniLavorativiAlMese).toFixed(2));
      this.formData.codiRalcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.formData.codiRalcompenso && this.formData.codiRalcompenso != this.vecchiaRal) {
      console.log("modifico costi da ral");
      this.costopresuntomese = parseFloat((this.formData.codiRalcompenso / this.mesiLavorativiAllAnno).toFixed(2));
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
    }
    this.vecchiaRal = this.formData.codiRalcompenso;
    this.vecchiamensile = this.costopresuntomese;
    this.vecchiagiornaliera = this.costopresuntogiorno;
  }
}
