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
  giorniLavorativiAlMese: number = 21;
  mesiLavorativiAllAnno: number = 12;
  output_ricercaFiltrata: any;
  contratto: any; // canc?
  id: any; // canc?
  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;
  dipendentiConContratto?: InserimentoContratto;
  anpePartitaiva?: string | null;
  dataInizioContrattoPlaceholder: string | null = null;
  dataInizioDistaccoPlaceholder: string | null = null;
  dataFineContrattoPlaceholder: string | null = null;
  dataFineDistaccoPlaceholder: string | null = null;
  livelloContrattoPlaceholder: string | null = null;
  clienteDistaccoPlaceholder: string | null = null;

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
    codiceFiscale: null
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
    sysuser: 'backend'
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {
    /*
    this.formData = builder.group({
      Nome: ['',Validators.minLength(1)],
      Cognome: ['',Validators.minLength(1)],
      Personaid: null,
      Codicefiscale: '',
      Partitaiva: '',
      Societaid: null,
      Datainiziocontratto: '',    //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      Datafinecontratto: null,    //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      tipocontrattoid: null,
      Contratto: null,
      ccnlid: 0,
      descrizioneCCNL: null,
      Livelloid: null,
      livellodesc: null,
      Ralcompenso: null,
      Monteore: null,
      Smartworking: null,
      Valoredistacco: null,
      Datainiziodistacco: null,
      Datafinedistacco: null,
      Note: null,
      Sysuser: 'Frontend',
      codiFlagAttiva: 1,
      codsFlagAttiva: 0,
      ClienteId: null,
      societaDistacco: null,
      societaPersona: null,
      Contrattopersid: null,
      motivazioneid: null,
      motivazionedesc: null,
      /*
      codiFkCossVisitamedica: null,
      durataValiditaVisitaMedica: null,
      codiFkCossCorsosicurezza1: null,
      durataValiditaCorsoSicurezza1: null,
      codiFkCossCorsosicurezza2: null,
      durataValiditaCorsoSicurezza2: null,
      codiFkComlIdmotivazione: null,
    });*/
  }

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.getAllTipitipiMotiviFineContratto();
    this.disable_fields = true;
    console.log(
      ' id contratto passato = ' +
        this.inserimentoContrattoService.idContratto$.value
    );
    this.controllaDisabilitaCampoPartitaIva();
    this.inserimentoContrattoService.idContratto$.value !== undefined ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    }

  openModalIfLastOptionSelected(event: MatSelectChange) {
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

  dataFineContrattoSelezionata() {
    this.showMotivazioneFineContratto = true;
    this.formValidationCheck();
  }

  openCronologiaDistaccoModal() {
    //console.log("personaId: " + personaId);
    //console.log("this.formData.personaId: " + this.formData.personaId)
    //console.log("this.formData.nome: " + this.formData.nome);
    //console.log("this.formData.cognome: " + this.formData.cognome)
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = this.formData.personaId; // personaId;
    this.inserimentoContrattoService.nomePersonaCronologiaDistacchi = this.formData.nome;
    this.inserimentoContrattoService.cognomePersonaCronologiaDistacchi = this.formData.cognome;

    const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
      width: '75%',
      height: '80%',
    });
    /*
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi =
      this.formData.Personaid;
    //FORSE CAMBIARE COSì: PASSA IDPERSONA AL SERVICE, POI QUESTA CHIAMATA LA FA L'ALTRO COMPONENTE (CronologiaDistaccoComponent)
    if (this.inserimentoContrattoService.idPersonaCronologiaDistacchi != null) {
      this.inserimentoContrattoService.getCronologiaDistacco().subscribe(
        (response) => {
          console.log('Risposta dalla chiamata GET:', response);
          //APRI MODAL DIALOG
          const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
            width: '50%',
            height: '80%',
          });
        },
        (error) => {
          console.error('Errore durante la chiamata GET:', error);
        }
      );
    }
    */  
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
      sysuser: 'backend'
    };
  }

  closeForm() {
    if (
      confirm(
        'La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'
      )
    )
      this.router.navigate(['Segreteria/gestione-contratto']);
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

  getAllTipoLivelloByCCNLIfNotNull() {
    if (this.formData.ccnlid !== null) {
      this.getAllTipoLivelloByCCNL(this.formData.ccnlid);
    }
  }

  getAllTipoLivelloByCCNL(ccnlId: number) {
    this.inserimentoContrattoService.getAllTipoLivelloByCCNL(ccnlId)
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

  getAllTipitipiMotiviFineContratto() {
    this.inserimentoContrattoService.getAllTipitipiMotiviFineContratto()
      .subscribe(
        (res: any) => {
          console.log('response get tipi motivo fine contratto:' + res);
          this.tipiMotiviFinecontratto = res;
        },
        (error: any) => {
          console.error('Errore durante il recupero dei tipi di livello:', error);
        }
      );
  }

  controllaDisabilitaCampoPartitaIva() {
    this.disablePartitaIvaField = this.anpePartitaiva != null ? true : false;
  }

  controlloHideCampoPartitaIva() {
    this.hidePartitaIvaField = this.formData.ccnlid === this.partitaIvaID ? false : true;
    this.hidePartitaIvaField && this.controllaDisabilitaCampoPartitaIva();
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
        this.formData.codiceFiscale = dipendente.anpeCodicefiscale;
        this.formData.nome = dipendente.anpeNome;
        this.formData.cognome = dipendente.anpeCognome;
        //this.formData.partitaiva = dipendente.AnpePartitaiva ?? null;
        this.formData.personaId = dipendente.anpePersonaid;
        this.inserimentoContrattoService.idContratto$.next(0);
        this.closeModalRicercaUtentiSenzaContratto();
      }
    }
  }
  
  insertContratto() {
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

  getContrattoByidContratto(idContratto: number) {
    this.inserimentoContrattoService.getContrattiById(idContratto).pipe(
      switchMap((response: any) => {
        return this.inserimentoContrattoService.getAllTipoLivelloByCCNL(response.ccnlid).pipe(
          map((levels: any[]) => {
            this.tipiLivello = levels;
            this.formData = response;
            this.dataInizioContrattoPlaceholder = response.codiDatainiziocontratto;
            this.dataInizioDistaccoPlaceholder = response.codiDatafinecontratto;
            this.dataFineContrattoPlaceholder = response.codsDatainiziodistacco;
            this.dataFineDistaccoPlaceholder = response.codsDatafinedistacco;
            this.livelloContrattoPlaceholder = response.livelloContratto;
            this.clienteDistaccoPlaceholder = response.clienteDistacco;
            return response;
          })
        );
      })
    ).subscribe(
      (response: any) => {
        console.log("Contratto loaded:", response);
      },
      (error: any) => {
        console.error("Error fetching contract:", error);
      }
    );
  }

  formValidationCheck() {
    const formCompilato = this.formData;
    const isNotBlank = (value: any) => value !== undefined && value !== null && value !== '';
    const isTruthy = (value: any) => !!value;
    const isAnsoSocietaidValid = isTruthy(formCompilato.societaPersonaid);
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

    this.formValidation = this.formValidation? (isValidContratto ? (isValidDistacco ? isValidContratto && isValidDistacco : false) : false) : false;
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
