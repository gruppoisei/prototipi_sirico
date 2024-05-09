import { ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { DialogCercaPersonaComponent } from '../../dialog-cerca-persona/dialog-cerca-persona.component';
import ValidaPartita from '../../../helpers/validaPartitaIva';

@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  providers: [GestioneContrattoComponent],
})

export class InsertContrattoComponent implements OnInit, OnDestroy {

  partitaIvaID: number = 3; //non toccarlo
  giorniLavorativiAlMese: number = 21;
  mesiLavorativiAllAnno: number = 12;

  //formValidation?: boolean | undefined = false;
  disable_fields: any; // canc?
  showMotivazioneFineContratto: boolean = false;
  disablePartitaIvaField: boolean = true;
  hidePartitaIvaField: boolean = false;
  costopresuntomese?: number | null = null;
  costopresuntogiorno?: number | null = null;
  vecchiaRal?: number | null = null;
  vecchiamensile?: number | null = null;
  vecchiagiornaliera?: number | null = null;
  output_ricercaFiltrata: any;
  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;
  personaConDistacchi: boolean = false;
  valoredistaccoValido: boolean = true;//controlla se true qui
  pannelloEspanso: boolean = false;
  isValidPartitaivaFields: boolean = false; //?
  utenteLoggato: string | null = "";
  arrayErrori: string[] = [];

  tipiSocieta: { societaid: number; ragionesociale: string }[] = [];                  //
  tipiContratto: { tipoid: number; tipodesc: string }[] = [];                         //
  tipiCcnl: { ccnlid: number; descrizioneCCNL: string }[] = [];                       //
  tipiLivello: { livelloid: number; livelloContratto: string; }[] = [];               //
  tipiClientiDistacco: { clienteDistaccoid: number; clienteDistacco: string }[] = []; //
  tipiMotiviFinecontratto: { motivid: number; motivdesc: string }[] = [];             //
  array_societa: any = [];
  private routeSub!: Subscription;

  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  enabled: boolean = true;

  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;

  formData: InserimentoContratto = {
    codiContrattopersid: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiDatainiziocontratto: null,
    codiDatafinecontratto: null,
    codiSmartworking: false, //null,
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
    societaPersonaid: null,
    societaPersona: null,
    clienteDistaccoid: null,
    clienteDistacco: null,
    sysuser: null
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
    //private builder: FormBuilder
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.inserimentoContrattoService.idContratto$.next(undefined);
    this.reset();
  }

  ngOnInit(): void {
    this.reset();
    this.utenteLoggato = sessionStorage.getItem('SysUser');
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.getAllTipitipiMotiviFineContratto();
    this.disable_fields = true;
    this.controllovisibilPartitaIva();
    console.log('this.inserimentoContrattoService.idContratto$.value:');
    console.log(this.inserimentoContrattoService.idContratto$.value);
    this.inserimentoContrattoService.idContratto$.value !== undefined ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    if (this.inserimentoContrattoService.idContratto$.value !== undefined && this.inserimentoContrattoService.idContratto$.value !== -5) {
      this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value);
      const distacchi = this.inserimentoContrattoService.getCronologiaDistacco;
      this.personaConDistacchi = distacchi !== null ? true : false;
    }
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
    //console.log("personaId: " + personaId);
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = personaId;
    this.inserimentoContrattoService.nomePersonaCronologiaDistacchi = this.formData.nome;
    this.inserimentoContrattoService.cognomePersonaCronologiaDistacchi = this.formData.cognome;

    const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
      width: '75%',
      height: '80%',
    });
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['Segreteria/gestione-contratto']);
  }

  dataFineContrattoSelezionata() {
    this.showMotivazioneFineContratto = true;
    this.formValidationCheck();
  }

  clearForm() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.reset();
      //this.inserimentoContrattoService.idContratto$.next(-5);
      this.inserimentoContrattoService.idContratto$.next(undefined);
      console.log("form pulita, cambio idcontratto nel service: " + this.inserimentoContrattoService.idContratto$.value)
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
      codiSmartworking: false, //null,
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
      societaPersonaid: null,
      societaPersona: null,
      clienteDistaccoid: null,
      clienteDistacco: null,
      sysuser: null
    };
    this.costopresuntogiorno = null;
    this.costopresuntomese = null;
  }

  getAllTipoSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
        //console.log(response);
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
        //console.log(response);
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
        //console.log(response);
        this.tipiCcnl = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllClienti() {
    this.inserimentoContrattoService.getAllClientiDistacco().subscribe(
      (response: any) => {
        //console.log(response);
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
            //console.log('Dati tipi livello:', data);
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
          //console.log('response get tipi motivo fine contratto:' + response);
          this.tipiMotiviFinecontratto = response;
        },
        (error: any) => {
          console.error('Errore durante il recupero dei tipi di livello:', error);
        }
      );
  }

  controllovisibilPartitaIva() {
    this.hidePartitaIvaField = (this.formData.tipoid != null && this.formData.tipoid === this.partitaIvaID) || this.formData.partitaIva ? true : false;
    this.disablePartitaIvaField = (this.formData.partitaIva !== null) ? false : true;
  }

  formatInputValue(event: any) {
    this.formData.codsValoredistacco = event.target.replace(/\D+/g, '');
  }

  openCercaPersonaModal(parametri?: any) {
    this.inserimentoContrattoService.modalType = "contratto";
    const dialogRef = this.dialog.open(DialogCercaPersonaComponent, {
      width: '75%',
      height: '80%',
    });
    this.inserimentoContrattoService.modalType = undefined;
    dialogRef.afterClosed().subscribe(result => {
      this.formData.personaId = this.inserimentoContrattoService.fieldAutoFill$.value.id;
      this.formData.nome = this.inserimentoContrattoService.fieldAutoFill$.value.nome;
      this.formData.cognome = this.inserimentoContrattoService.fieldAutoFill$.value.cognome;
      this.formData.codiceFiscale = this.inserimentoContrattoService.fieldAutoFill$.value.codiceFiscale;
      this.formData.partitaIva = this.inserimentoContrattoService.fieldAutoFill$.value.partitaIva;
      console.log('this.formData: ');
      console.log(this.formData);
      console.log('this.inserimentoContrattoService.fieldAutoFill$.value.partitaIva: ');
      console.log(this.inserimentoContrattoService.fieldAutoFill$.value.partitaIva);
      this.controllovisibilPartitaIva();
      /*
      this.disablePartitaIvaField = this.formData.partitaIva ? ValidaPartita.IVA(this.formData.partitaIva) : true;
      this.hidePartitaIvaField = this.formData.partitaIva ? true : false;
      */
    });
  }

  inviaForm() {
    this.formData.sysuser = this.utenteLoggato;
    //
    //console.log("this.inserimentoContrattoService.fieldAutoFill$.value.id:"); 
    //console.log(this.inserimentoContrattoService.fieldAutoFill$.value.id);
    //this.formData.personaId = this.inserimentoContrattoService.fieldAutoFill$.value.id;
    //console.log("this.formData.personaId:"); 
    //console.log(this.formData.personaId);
    //

    // console.log('this.formValidation PRE:');
    // console.log(this.formValidation);
    // this.formValidationCheck();
    // console.log('this.formValidation POST:');
    // console.log(this.formValidation);

    //this.formValidation = isValidContratto && isValidDistacco && this.formValidation;
    //console.log('this.formValidationCheck: ' + this.formValidationCheck());
    //console.log('this.formValidationCheckDates: ' + this.formValidationCheckDates());
    if (this.formValidationCheck() && this.formValidationCheckDates()) {
      const contrattoObj = this.formData;
      this.inserimentoContrattoService
        //.insertNuovoContratto(this.formData, this.selectedFiles)
        .insertNuovoContratto(contrattoObj, this.selectedFiles)
        .subscribe(
          (response: any) => {
            console.log(response);
            alert(response);
            //this.clearForm();
            this.reloadGestioneFile()
            this.reset();
            this.selectedFiles = []
          },
          (error: any) => {
            console.error("Errore durante l'inserimento del contratto:", error);
            alert("Errore durante l'inserimento del contratto (errore di frontend)");
          }
        );
    } else {
      console.log('formValidation ha trovato un errore. form = ' + JSON.stringify(this.formData) + "\n\nGli errori trovati sono: " + this.arrayErrori);
    }
  }

  async getContrattoByidContratto(idContratto: number) {
    try {
      const response = await this.inserimentoContrattoService.getContrattiById(idContratto).toPromise();
      console.log('getContrattoByidContratto() - response:');
      console.log(response);
      const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(response.ccnlid).toPromise();

      this.tipiLivello = livelli;
      this.formData = response;
      //
      this.formData.codiContrattopersid = response.codiContrattopersid;
      console.log('this.formData.codiContrattopersid' + this.formData.codiContrattopersid);
      //
      this.disablePartitaIvaField = this.formData.partitaIva ? ValidaPartita.IVA(this.formData.partitaIva) : true;
      this.hidePartitaIvaField = this.formData.partitaIva ? true : false;
      this.valoredistaccoValido = this.formData.codsValoredistacco ? this.valoreDistaccoChangeValidation() : true;
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

  valoreDistaccoChangeValidation() {
    if ((this.formData.codsValoredistacco ? (this.formData.codsValoredistacco <= 100) : false) &&
      (this.formData.codsValoredistacco ? (this.formData.codsValoredistacco >= 0) : false)) {
      //console.log("valoredistaccoValido messo a true");
      this.valoredistaccoValido = true;
    } else {
      this.valoredistaccoValido = false;
    }
    return this.valoredistaccoValido;
  }

  formValidationCheck(): boolean {
    console.log('formValidationCheck() START');
    this.arrayErrori = [];
    const formCompilato = this.formData;
    const nonVuoto = (value: any) => !!value && value !== undefined && value !== null && value !== '';

    const checkErrore = (campo: any, nomeCampo: string) => {
      if (!nonVuoto(campo)) {
          this.arrayErrori.push(nomeCampo);
          return false; // se è null, undefined o vuoto.
      }
      return true; //esiste e non è vuoto
    };

    const validaPersonaId = checkErrore(formCompilato.personaId, 'personaId');
    const validaSocietaPersonaid = checkErrore(formCompilato.societaPersonaid, 'societaPersonaid');
    const validaCodiDatainiziocontratto = checkErrore(formCompilato.codiDatainiziocontratto, 'codiDatainiziocontratto');
    const validaTipoid = checkErrore(formCompilato.tipoid, 'tipoid');
    const validaCcnlid = checkErrore(formCompilato.ccnlid, 'ccnlid');
    const validaLivelloid = checkErrore(formCompilato.livelloid, 'livelloid');
    const validaCodiRalcompenso = checkErrore(formCompilato.codiRalcompenso, 'codiRalcompenso');
    const validaCodiMonteore = checkErrore(formCompilato.codiMonteore, 'codiMonteore');
    const validaCodiSmartworking = checkErrore(formCompilato.codiSmartworking, 'codiSmartworking');
    const validaPartitaiva = checkErrore(formCompilato.partitaIva, 'partitaIva');

    let validaCodsValoredistacco = true;
    let validaClienteDistaccoid = true;
    let validaCodsDatainiziodistacco = true;
    if (formCompilato.codsFlagAttiva) {
      validaCodsValoredistacco = checkErrore(formCompilato.codsValoredistacco, 'codsValoredistacco');
      validaClienteDistaccoid = checkErrore(formCompilato.clienteDistaccoid, 'clienteDistaccoid');
      validaCodsDatainiziodistacco = checkErrore(formCompilato.codsDatainiziodistacco, 'codsDatainiziodistacco');
    }

    //this.isValidPartitaivaFields = //formCompilato.partitaIva ? ValidaPartita.IVA(formCompilato.partitaIva) : true;
    
    const formValidation = validaPersonaId &&
    validaSocietaPersonaid &&
    validaCodiDatainiziocontratto &&
    validaTipoid &&
    validaCcnlid &&
    validaLivelloid &&
    validaCodiRalcompenso &&
    validaCodiMonteore &&
    validaCodiSmartworking &&
    validaPartitaiva &&
    validaCodsValoredistacco &&
    validaClienteDistaccoid &&
    validaCodsDatainiziodistacco;

    console.log("formValidation è passato come : " + formValidation + " da formValidationCheck()")
    //console.log(" array Errori : " + this.arrayErrori);
    console.log('formValidationCheck() END');

    return (formValidation)
  }

  formValidationCheckDates(): boolean {
    if (this.formData.codiDatainiziocontratto == "" || this.formData.codiDatainiziocontratto == null || this.formData.codiDatainiziocontratto == undefined) {
      alert('Inserire una data di inizio contratto!');

      return false;
    }
    else {
      const startDateContratto = this.formData.codiDatainiziocontratto ? new Date(this.formData.codiDatainiziocontratto) : null;
      const endDateContratto = this.formData.codiDatafinecontratto ? new Date(this.formData.codiDatafinecontratto) : null;
      const startDateDistacco = this.formData.codsDatainiziodistacco ? new Date(this.formData.codsDatainiziodistacco) : null;
      const endDateDistacco = this.formData.codsDatafinedistacco ? new Date(this.formData.codsDatafinedistacco) : null;

      console.log('date:');
      console.log(startDateContratto, endDateContratto, startDateDistacco, endDateDistacco);

      let isValidContratto = true;
      let isValidDistacco = true;

      if (endDateContratto && startDateContratto) {
        isValidContratto = endDateContratto >= startDateContratto;
        console.log("end data contratto >= a start data contratto?" + isValidContratto);
      }

      if (this.formData.codsFlagAttiva) {
        if (startDateContratto && startDateDistacco) {
          isValidDistacco = startDateDistacco >= startDateContratto;
          console.log("start data distacco >= a start data contratto?" + isValidDistacco);
          if (isValidDistacco && endDateDistacco) {
            isValidDistacco = endDateDistacco >= startDateDistacco;
            console.log("end data distacco >= a start data distacco?" + isValidDistacco);
          }
        }
      }

      //this.formValidation = isValidContratto && isValidDistacco && this.formValidation;
      console.log("Validazione date ha ritornato: " + isValidContratto && isValidDistacco);

      return (isValidContratto && isValidDistacco);
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
      this.costopresuntomese = parseFloat((this.formData.codiRalcompenso / this.mesiLavorativiAllAnno).toFixed(2));
      this.costopresuntogiorno = parseFloat((this.costopresuntomese / this.giorniLavorativiAlMese).toFixed(2));
    }
    this.vecchiaRal = this.formData.codiRalcompenso;
    this.vecchiamensile = this.costopresuntomese;
    this.vecchiagiornaliera = this.costopresuntogiorno;
  }


  receiveFile($event: any) {
    this.selectedFiles = $event;

    //controllo per estenzione
    //const existingFileIndex = this.selectedFiles.findIndex(file => file.name === this.selectedFile?.name);
    //TODO
    //if(this.selectedFiles.)
  }

  reloadGestioneFile() {
    this.enabled = false;
    this.changeDetector.detectChanges();
    this.enabled = true;
  }

}
