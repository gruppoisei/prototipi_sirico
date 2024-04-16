import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  contratto: any; // canc?
  id: any; // canc?

  tipiSocieta!: [{ ansoSocietaid: number; ansoRagionesociale: string }];
  tipiContratto!: [{ cotcTipocontrattoid: number; cotcContratto: string }];
  tipiCcnl!: [{ coccCcnlid: number; coccDesc: string }];
  tipiLivello!: [{ coliLivelloid: number; coliLivellocontratto: string }];
  tipiClientiDistacco!: [{ idcliente: number; ragionesociale: string }];
  tipiMotiviFinecontratto!: [{ idMotivo: number; descMotivo: string }];
  array_societa: any = [];
  private routeSub!: Subscription;
  form!: FormGroup<any>;

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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.disable_fields = true;
    console.log(' id contratto passato = ' + this.inserimentoContrattoService.idContratto$.value);
    this.autoFillformData();
    this.controllaDisabilitaCampoPartitaIva();
    this.inserimentoContrattoService.idContratto$.value !== undefined /* && idContratto !== 0 */ ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    this.inserimentoContrattoService.modalState.subscribe((isOpen) => {this.showModal = isOpen;} );
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
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi =
      this.formData.anpePersonaid;
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
      codsDatainiziodistacco: null,
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
  }

  closeForm() {
    if (
      confirm(
        'La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'
      )
    )
      this.router.navigate(['/gestione-contratto']);
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

  getAllTipoLivello() {
    this.inserimentoContrattoService
      .getAllTipoLivello(this.formData.coccCcnlid)
      .subscribe(
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

  controllaDisabilitaCampoPartitaIva() {
    this.disablePartitaIvaField =
      this.formData.anpePartitaiva != null ? true : false;
  }

  controlloHideCampoPartitaIva() {
    this.hidePartitaIvaField =
      this.formData.coccCcnlid === this.partitaIvaID ? false : true;
    this.hidePartitaIvaField && this.controllaDisabilitaCampoPartitaIva();
  }

  formatInputValue(event: any) {
    this.formData.codsValoredistacco = event.target.value.replace(/\D+/g, '');
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
        this.formData.anpeCodicefiscale = dipendente.anpeCodicefiscale;
        this.formData.anpeNome = dipendente.anpeNome;
        this.formData.anpeCognome = dipendente.anpeCognome;
        this.formData.anpePartitaiva = dipendente.AnpePartitaiva ?? null;
        this.formData.anpePersonaid = dipendente.anpePersonaid;
        this.inserimentoContrattoService.idContratto$.next(0);
        this.closeModalRicercaUtentiSenzaContratto();
      }
    }
  }

  // INSERIMENTO E AGGIORNAMENTO
  insertContratto() {
    if(this.formValidation){
    this.inserimentoContrattoService
      .insertNuovoContratto(this.formData)
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
      console.log("formValidation non è vero. form = " + this.formData);
    }
  }

  getContrattoByidContratto(idContratto: number) {
    this.inserimentoContrattoService.getAllContrattiById(idContratto).subscribe(
      (response: any) => {
        console.log(response);
        this.dipendentiConContratto = response;
        console.log('questo è il diendenti con contratto array: ' + this.dipendentiConContratto);
        //console.log(this.formData);
        this.autoFillformData();
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

    const isAnpeCodicefiscaleValid = isNotBlank(formData.anpeCodicefiscale);
    const isAnpeNomeValid = isNotBlank(formData.anpeNome);
    const isAnpeCognomeValid = isNotBlank(formData.anpeCognome);
    const isAnsoSocietaidValid = isNotBlank(formData.ansoSocietaid);
    const isCodiDatainiziocontrattoValid = isNotBlank(formData.codiDatainiziocontratto);
    const isCodiDatafinecontrattoValid = isNotBlank(formData.codiDatafinecontratto);
    const isCotctipocontrattoidValid = isTruthy(formData.cotctipocontrattoid);
    const isCoccCcnlidValid = isTruthy(formData.coccCcnlid);
    const isColiLivelloidValid = isTruthy(formData.coliLivelloid);
    const isCodiRalcompensoValid = isTruthy(formData.codiRalcompenso);
    const isCodiMonteoreValid = isTruthy(formData.codiMonteore);
    const isCodiSmartworkingValid = isNotBlank(formData.codiSmartworking) ? true : false;

    const isDistaccoNull = isTrue(this.formData.codsFlagAttiva);
    const isValidFields = isNotBlank(formData.codsValoredistacco) && isNotBlank(formData.codsClienteId) && isNotBlank(formData.codsDatainiziodistacco) && isNotBlank(formData.codsDatafinedistacco);

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
    const startDateContratto = this.formData.codiDatainiziocontratto ? new Date(this.formData.codiDatainiziocontratto) : null;
    const endDateContratto = this.formData.codiDatafinecontratto ? new Date(this.formData.codiDatafinecontratto) : null;
    const startDateDistacco = this.formData.codsDatainiziodistacco ? new Date(this.formData.codsDatainiziodistacco) : null;
    const endDateDistacco = this.formData.codsDatafinedistacco ? new Date(this.formData.codsDatafinedistacco) : null;

    const isValidContratto = startDateContratto && endDateContratto && startDateContratto < endDateContratto;
    const isValidDistacco = startDateDistacco && endDateDistacco && startDateDistacco < endDateDistacco;

    this.formValidation = (isValidContratto && isValidDistacco)? true : false;
}

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
      const indicemotivaz = this.tipiMotiviFinecontratto?.findIndex((Motivi) => Motivi.descMotivo === (this.dipendentiConContratto?.codiFkComlIdmotivazione ?? ''));
      this.formData.ansoSocietaid = indicesocieta !== -1 ? this.tipiSocieta[indicesocieta].ansoSocietaid.toString() : this.formData.ansoSocietaid;
      const indicetipocontratto = this.tipiContratto?.findIndex( (contratto) => contratto.cotcContratto === (this.dipendentiConContratto?.tipoContratto ?? '') );
      this.formData.cotctipocontrattoid = indicetipocontratto !== -1 ? this.tipiContratto[indicetipocontratto].cotcTipocontrattoid : this.formData.cotctipocontrattoid;
      const indiceccnl = this.tipiCcnl?.findIndex((ccnl) => ccnl.coccDesc === (this.dipendentiConContratto?.descrizioneCCNL ?? ''));
      this.formData.coccCcnlid = indiceccnl !== -1 ? this.tipiCcnl[indiceccnl].coccCcnlid : this.formData.coccCcnlid;
      const indicecliente = this.tipiClientiDistacco?.findIndex((societa) => societa.ragionesociale === (this.dipendentiConContratto?.societaPersona ?? ''));
      this.formData.ansoSocietaid = indicecliente !== -1 ? this.tipiSocieta[indicecliente].ansoSocietaid.toString() : this.formData.ansoSocietaid;
    }
  }

  updateCosts() {
    if (this.costopresuntomese && this.costopresuntomese != this.vecchiamensile) {
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
      this.formData.codiRalcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.costopresuntogiorno && this.costopresuntogiorno != this.vecchiagiornaliera) {
      this.costopresuntomese = parseFloat((this.costopresuntogiorno * this.giorniLavorativiAlMese).toFixed(2));
      this.formData.codiRalcompenso = parseFloat((this.costopresuntomese * this.mesiLavorativiAllAnno).toFixed(2));
    } else if (this.formData.codiRalcompenso && this.formData.codiRalcompenso != this.vecchiaRal) {
      this.formValidationCheck();
      this.costopresuntomese = parseFloat((this.formData.codiRalcompenso / this.mesiLavorativiAllAnno).toFixed(2));
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
    }
    this.vecchiaRal = this.formData.codiRalcompenso;
    this.vecchiamensile = this.costopresuntomese;
    this.vecchiagiornaliera = this.costopresuntogiorno;
  }
}
