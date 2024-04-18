import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { inserimentoContratto } from '../../../dto/response/inserimentoContratto';
import { utenteSenzaContatto } from '../../../dto/request/ricercaContratto';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { GestioneContrattoComponent } from '../gestione-contratto/gestione-contratto.component';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { InsertClienteComponent } from '../insert-cliente/insert-cliente.component';
import { CronologiaDistaccoComponent } from '../cronologia-distacco/cronologia-distacco.component';
import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  providers: [GestioneContrattoComponent],
})
export class InsertContrattoComponent implements OnInit {
  partitaIvaID: number = 3;   //non toccarlo
  formValidation?: boolean = false;
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
  costopresuntomese?: number | null;
  costopresuntogiorno?: number | null;
  vecchiaRal?: number | null;
  vecchiamensile?: number | null;
  vecchiagiornaliera?: number | null;
  giorniLavorativiAlMese: number = 21;
  mesiLavorativiAllAnno: number = 12;
  output_ricercaFiltrata: any;
  contratto: any; // canc?
  id: any; // canc?
  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;
  dipendentiConContratto?: inserimentoContratto;

  tipiSocieta!: [{ Societaid: number; Ragionesociale: string }];
  tipiContratto!: [{ Tipocontrattoid: number; TipoDesc: string }];
  tipiCcnl!: [{ CCNLid: number; CCNLDesc: string }];
  tipiLivello!: [{ Livelloid: number; Livellodesc: string }];
  tipiClientiDistacco!: [{ idcliente: number; ragionesociale: string }];
  tipiMotiviFinecontratto!: [{ idMotivo: number; descMotivo: string }];
  array_societa: any = [];
  private routeSub!: Subscription;

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  formData: FormGroup;
  
  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null,
  };

  /*
  formData: inserimentoContratto = {
    anpeNome: '',
    anpeCognome: '',
    anpePersonaid: null,
    anpeCodicefiscale: '',
    anpePartitaiva: '',
    ansoSocietaid: null,
    codiDatainiziocontratto: '', //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    codiDatafinecontratto: null, //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    cotctipocontrattoid: null,
    tipoContratto: null,
    coccCcnlid: 0,
    descrizioneCCNL: null,
    coliLivelloid: null,
    livelloContratto: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiSmartworking: null,
    codsValoredistacco: null,
    codsDatainiziodistacco: '',
    codsDatafinedistacco: null,
    codiNote: null,
    codiSysuser: 'Frontend',
    codiFlagAttiva: 1,
    codsFlagAttiva: 0,
    codsClienteId: null,
    societaDistacco: null,
    societaPersona: null,
    codiContrattopersid: null,
    codiFkCossVisitamedica: null,
    durataValiditaVisitaMedica: null,
    codiFkCossCorsosicurezza1: null,
    durataValiditaCorsoSicurezza1: null,
    codiFkCossCorsosicurezza2: null,
    durataValiditaCorsoSicurezza2: null,
    codiFkComlIdmotivazione: null,
  };
  */


  /*
  partitaIvaID: number = 3;   //non toccarlo
  formValidation?: boolean = false;
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
  costopresuntomese?: number | null;
  costopresuntogiorno?: number | null;
  vecchiaRal?: number | null;
  vecchiamensile?: number | null;
  vecchiagiornaliera?: number | null;
  giorniLavorativiAlMese: number = 21;
  mesiLavorativiAllAnno: number = 12;

  contratto: any; // canc?
  id: any; // canc?

  tipiSocieta!: [{ ansoSocietaid: number; ansoRagionesociale: string }];
  tipiContratto!: [{ cotcTipocontrattoid: number; cotcContratto: string }];
  tipiCcnl!: [{ coccCcnlid: number; coccDesc: string }];
  tipiLivello!: [{ coliLivelloid: number; coliLivellocontratto: string }];
  tipiClientiDistacco!: [{ idcliente: number; ragionesociale: string }];
  array_societa: any = [];
  private routeSub!: Subscription;
  //form!: FormGroup<any>;
  /*
  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  output_ricercaFiltrata: any;

  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;

  dipendentiConContratto?: inserimentoContratto;



  formData: inserimentoContratto = {
    anpeNome: '',
    anpeCognome: '',
    anpePersonaid: null,
    anpeCodicefiscale: '',
    anpePartitaiva: '',
    ansoSocietaid: null,
    codiDatainiziocontratto: '', //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    codiDatafinecontratto: null, //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    cotctipocontrattoid: null,
    tipoContratto: null,
    coccCcnlid: 0,
    descrizioneCCNL: null,
    coliLivelloid: null,
    livelloContratto: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiSmartworking: null,
    codsValoredistacco: null,
    codsDatainiziodistacco: '',
    codsDatafinedistacco: null,
    codiNote: null,
    codiSysuser: 'Frontend',
    codiFlagAttiva: 1,
    codsFlagAttiva: 0,
    codsClienteId: null,
    societaDistacco: null,
    societaPersona: null,
    codiContrattopersid: null,
    codiFkCossVisitamedica: null,
    durataValiditaVisitaMedica: null,
    codiFkCossCorsosicurezza1: null,
    durataValiditaCorsoSicurezza1: null,
    codiFkCossCorsosicurezza2: null,
    durataValiditaCorsoSicurezza2: null,
    codiFkComlIdmotivazione: null,
  };


  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null,
  };
  */

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {
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
      CCNLid: 0,
      CCNLdesc: null,
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
      codiFkComlIdmotivazione: null,*/
    });
  }

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    //this.getAllTipitipiMotiviFineContratto();
    this.disable_fields = true;
    console.log(' id contratto passato = ' + this.inserimentoContrattoService.idContratto$.value);
    //this.autoFillformData();
    this.controllaDisabilitaCampoPartitaIva();
    this.inserimentoContrattoService.idContratto$.value !== undefined ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    //this.inserimentoContrattoService.modalState.subscribe((isOpen) => {this.showModal = isOpen;} );
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
    this.formData.reset();
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
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
          { idcliente: -1, ragionesociale: 'Nuova azienda cliente' },
        ]);
      },
      (error: any) => {
        console.error(
          'Errore durante il caricament delle aziende clienti per il distacco.'
        );
      }
    );
  }

  getAllTipoLivello(id: number) {
    this.inserimentoContrattoService.getAllTipoLivello(id).subscribe(
        (response: any) => {
          console.log('response get tipi livello:');
          console.log(response);
          this.tipiLivello = response;
        },
        (error: any) => {
          console.error(
            'Errore durante il recupero dei tipi di livello:',
            error
          );
        }
      );
  }

  getAllTipitipiMotiviFineContratto() {
    this.inserimentoContrattoService.getAllTipitipiMotiviFineContratto().subscribe(
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
    this.disablePartitaIvaField =
      this.formData.value.Partitaiva != null ? true : false;
  }

  controlloHideCampoPartitaIva() {
    this.hidePartitaIvaField =
      this.formData.value.CCNLid === this.partitaIvaID ? false : true;
    this.hidePartitaIvaField && this.controllaDisabilitaCampoPartitaIva();
  }

  formatInputValue(event: any) {
    this.formData.value.codsValoredistacco = event.target.value.replace(/\D+/g, '');
  }

  // DIALOG FUNCTIONS
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
        this.formData.value.Codicefiscale = dipendente.anpeCodicefiscale;
        this.formData.value.Nome = dipendente.anpeNome;
        this.formData.value.Cognome = dipendente.anpeCognome;
        this.formData.value.Partitaiva = dipendente.AnpePartitaiva ?? null;
        this.formData.value.Personaid = dipendente.anpePersonaid;
        this.inserimentoContrattoService.idContratto$.next(0);
        this.closeModalRicercaUtentiSenzaContratto();
      }
    }
  }

  // INSERIMENTO E AGGIORNAMENTO
  insertContratto() {
    if(this.formValidation){
    this.inserimentoContrattoService
      .insertNuovoContratto(this.formData.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          alert(response);
          this.clearForm();
        },
        (error: any) => {
          console.error(
            "Errore durante l'inserimento del nuovo contratto:",
            error
          );
          alert("Errore durante l'inserimento del nuovo contratto");
        }
      );
    } else {
      console.log("formValidation ha trovato un errore. form = " + this.formData.value);
    }
  }

  getContrattoByidContratto(idContratto: number) {
    this.inserimentoContrattoService.getAllContrattiById(idContratto).subscribe(
      (response: any) => {
        console.log(JSON.stringify(response));
        this.formData = response;
        console.log(JSON.stringify(this.formData));
        const indicecliente = this.tipiClientiDistacco?.findIndex((societa) => societa.ragionesociale === (response?.societaPersona ?? ''));
        this.formData.value.Societaid = indicecliente !== -1 ? this.tipiSocieta[indicecliente].Societaid.toString() : this.formData.value.Societaid;
  
        /*
        this.dipendentiConContratto = response;
        console.log('questo è il diendenti con contratto array: ' + this.dipendentiConContratto);
        if (this.dipendentiConContratto?.coccCcnlid != null) {
          this.getAllTipoLivello(this.dipendentiConContratto.coccCcnlid);
        }
        this.autoFillformData();
        */
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }

  formValidationCheck() {
    const formData = this.formData;
    const isNotBlank = (value: any) => value !== undefined && value !== null && value !== '';
    const isTruthy = (value: any) => value !== undefined && value !== null && value.toString() !== '';
    const isTrue = (value: any) => value === true;

    const isAnpeCodicefiscaleValid = isNotBlank(formData.value.Codicefiscale);
    const isAnpeNomeValid = isNotBlank(formData.value.Nome);
    const isAnpeCognomeValid = isNotBlank(formData.value.Cognome);
    const isAnsoSocietaidValid = isNotBlank(formData.value.Societaid);
    const isCodiDatainiziocontrattoValid = isNotBlank(formData.value.Datainiziocontratto);
    const isCodiDatafinecontrattoValid = isNotBlank(formData.value.Datafinecontratto);
    const isCotctipocontrattoidValid = isTruthy(formData.value.tipocontrattoid);
    const isCoccCcnlidValid = isTruthy(formData.value.CCNLid);
    const isColiLivelloidValid = isTruthy(formData.value.Livelloid);
    const isCodiRalcompensoValid = isTruthy(formData.value.Ralcompenso);
    const isCodiMonteoreValid = isTruthy(formData.value.Monteore);
    const isCodiSmartworkingValid = isNotBlank(formData.value.Smartworking) ? true : false;

    const isDistaccoNull = isTrue(this.formData.value.FlagAttiva);
    const isValidFields = isNotBlank(formData.value.Valoredistacco) && isNotBlank(formData.value.ClienteId) && isNotBlank(formData.value.Datainiziodistacco) && isNotBlank(formData.value.Datafinedistacco);

    this.formValidation =
      isAnpeCodicefiscaleValid &&
      isAnpeNomeValid &&
      isAnpeCognomeValid &&
      isAnsoSocietaidValid &&
      isCodiDatainiziocontrattoValid &&
      isCodiDatafinecontrattoValid &&
      isCotctipocontrattoidValid &&
      isCoccCcnlidValid &&
      isColiLivelloidValid &&
      isCodiRalcompensoValid &&
      isCodiMonteoreValid &&
      isCodiSmartworkingValid && 
      (isDistaccoNull || (isDistaccoNull && isValidFields));

    this.formValidationCheckDates();
  }

  formValidationCheckDates() {
    const startDateContratto = this.formData.value.Datainiziocontratto ? new Date(this.formData.value.Datainiziocontratto) : null;
    const endDateContratto = this.formData.value.Datafinecontratto ? new Date(this.formData.value.Datafinecontratto) : null;
    const startDateDistacco = this.formData.value.Datainiziodistacco ? new Date(this.formData.value.Datainiziodistacco) : null;
    const endDateDistacco = this.formData.value.Datafinedistacco ? new Date(this.formData.value.Datafinedistacco) : null;

    const isValidContratto = startDateContratto && endDateContratto && startDateContratto < endDateContratto;
    const isValidDistacco = startDateDistacco && endDateDistacco && startDateDistacco < endDateDistacco;

    this.formValidation = (isValidContratto && isValidDistacco)? true : false;
}

/*
  autoFillformData() {
    if (this.dipendentiConContratto == null) {
    } else {
      console.log('importo contratto con id :' + this.dipendentiConContratto.codiContrattopersid);
      this.formData.codiContrattopersid = this.dipendentiConContratto.codiContrattopersid;
      this.formData.anpeCodicefiscale = this.dipendentiConContratto.anpeCodicefiscale;
      this.formData.anpeNome = this.dipendentiConContratto.anpeNome;
      this.formData.anpePersonaid = this.dipendentiConContratto.anpePersonaid;
      this.formData.anpeCognome = this.dipendentiConContratto.anpeCognome;
      this.formData.anpePartitaiva = this.dipendentiConContratto.anpePartitaiva;
      this.formData.codiDatainiziocontratto = this.dipendentiConContratto.codiDatainiziocontratto.split('T')[0];
      this.formData.codiDatafinecontratto = this.formData.codiDatafinecontratto != null ? this.formData.codiDatafinecontratto : null;
      this.formData.codiRalcompenso = this.dipendentiConContratto.codiRalcompenso;
      this.formData.codiMonteore = this.dipendentiConContratto.codiMonteore;
      this.formData.codiSmartworking = this.dipendentiConContratto.codiSmartworking == null ? false : true;
      this.formData.codsFlagAttiva = this.dipendentiConContratto.codsFlagAttiva;
      this.formData.codsValoredistacco = this.dipendentiConContratto.codsValoredistacco;
      this.formData.codsDatainiziodistacco = this.dipendentiConContratto.codsDatainiziodistacco != null ? this.dipendentiConContratto.codsDatainiziodistacco.split('T')[0] : null;
      this.formData.codsDatafinedistacco = this.dipendentiConContratto.codsDatafinedistacco != null ? this.dipendentiConContratto.codsDatafinedistacco.split('T')[0] : null;
      this.formData.codiNote = this.dipendentiConContratto.codiNote;
      const indicesocieta = this.tipiSocieta?.findIndex( (societa) => societa.ansoRagionesociale === (this.dipendentiConContratto?.societaPersona ?? ''));
      const indicemotivaz = this.tipiMotiviFineContratto?.findIndex((Motivi) => Motivi.comlDescmotivazione === (this.dipendentiConContratto?.codiFkComlIdmotivazione ?? ''));
      this.formData.ansoSocietaid = indicesocieta !== -1 ? this.tipiSocieta[indicesocieta].ansoSocietaid.toString() : this.formData.ansoSocietaid;
      const indicetipocontratto = this.tipiContratto?.findIndex( (contratto) => contratto.cotcContratto === (this.dipendentiConContratto?.tipoContratto ?? '') );
      this.formData.cotctipocontrattoid = indicetipocontratto !== -1 ? this.tipiContratto[indicetipocontratto].cotcTipocontrattoid : this.formData.cotctipocontrattoid;
      const indiceccnl = this.tipiCcnl?.findIndex((ccnl) => ccnl.coccDesc === (this.dipendentiConContratto?.descrizioneCCNL ?? ''));
      this.formData.coccCcnlid = indiceccnl !== -1 ? this.tipiCcnl[indiceccnl].coccCcnlid : this.formData.coccCcnlid;
      const indicecliente = this.tipiClientiDistacco?.findIndex((societa) => societa.ragionesociale === (this.dipendentiConContratto?.societaPersona ?? ''));
      this.formData.ansoSocietaid = indicecliente !== -1 ? this.tipiSocieta[indicecliente].ansoSocietaid.toString() : this.formData.ansoSocietaid;
    }
  }
*/
  updateCosts() {
    if (this.costopresuntomese && this.costopresuntomese != this.vecchiamensile) {
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
      this.formData.value.Ralcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.costopresuntogiorno && this.costopresuntogiorno != this.vecchiagiornaliera) {
      this.costopresuntomese = parseFloat((this.costopresuntogiorno * this.giorniLavorativiAlMese).toFixed(2));
      this.formData.value.Ralcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.formData.value.Ralcompenso && this.formData.value.Ralcompenso != this.vecchiaRal) {
      this.formValidationCheck();
      this.costopresuntomese = parseFloat((this.formData.value.Ralcompenso / this.mesiLavorativiAllAnno).toFixed(2));
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
    }
    this.vecchiaRal = this.formData.value.Ralcompenso;
    this.vecchiamensile = this.costopresuntomese;
    this.vecchiagiornaliera = this.costopresuntogiorno;
  }
}
