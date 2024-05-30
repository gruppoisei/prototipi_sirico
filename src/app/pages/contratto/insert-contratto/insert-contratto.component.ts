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
import { UtilityCostiPersonaleComponent } from '../../utility-costi-personale/utility-costi-personale.component';
import { UtilityCostiPersonaleService } from '../../../service/utility-costi-personale.service';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  //providers: [GestioneContrattoComponent],
})

export class InsertContrattoComponent implements OnInit, OnDestroy {

  partitaIvaID: number = 3; //non toccarlo
  giorniLavorativiAlMese: number = 21;
  mesiLavorativiAllAnno: number = 12;

  disable_fields: any; // canc?
  showMotivazioneFineContratto: boolean = false;
  disablePartitaIvaField: boolean = true;
  hidePartitaIvaField: boolean = false;
  costoOrario?: number | null = null;
  costoMensile?: string | null = null;
  vecchiaRal?: number | null = null;
  vecchiamensile?: number | null = null;
  vecchiagiornaliera?: number | null = null;
  output_ricercaFiltrata: any;
  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;
  valoredistaccoValido: boolean = true;
  pannelloEspanso: boolean = false;
  isValidPartitaivaFields: boolean = false;
  utenteLoggato: string | null = "";
  arrayErrori: string[] = [];
  personaConDistacchi: boolean = false;
  personaConDistacchiAperti: boolean = false;
  erroreCostoOrario: boolean = false;
  erroreCostoMensile: boolean = false;
  meseCorrente: number = 12;
  annoCorrente: number = 2050;

  tipiSocieta: { societaid: number; ragionesociale: string }[] = [];
  tipiContratto: { tipoid: number; tipodesc: string }[] = [];
  tipiCcnl: { ccnlid: number; descrizioneCCNL: string }[] = [];
  tipiLivello: { livelloid: number; livelloContratto: string; }[] = [];
  tipiClientiDistacco: { clienteDistaccoid: number; clienteDistacco: string }[] = [];
  tipiMotiviFinecontratto: { motivid: number; motivdesc: string }[] = [];
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
    codiSmartworking: false,
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
    private builder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private utilityCostiService: UtilityCostiPersonaleService,
    public menuDinamicoService: MenuDinamicoService
  ) {
    this.meseCorrente = new Date().getMonth() + 1;
    this.annoCorrente = new Date().getFullYear();
    /* this.formData = this.builder.group({
      codiContrattopersid: [''],
      codiRalcompenso: ['', Validators.required],
      codiMonteore: ['', Validators.required],
      codiDatainiziocontratto: ['', Validators.required],
      codiDatafinecontratto: [''],
      codiSmartworking: [false, Validators.required],
      codiNote: ['', Validators.maxLength(4000)],
      codiFlagAttiva: [1],
      codsDistaccoid: [''],
      codsValoredistacco: [''],
      codsDatainiziodistacco: [''],
      codsDatafinedistacco: [''],
      codsFlagAttiva: [0],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      personaId: ['', Validators.required],
      codiceFiscale: ['', Validators.pattern(/^[A-Za-z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Za-z]{1}[0-9]{2}+[A-Za-z]{1}$/)],
      partitaIva: ['', Validators.pattern(/^\d{11}$/)],
      ccnlid: ['', Validators.required],
      descrizioneCCNL: [''],
      livelloid: ['', Validators.required],
      livelloContratto: [''],
      motivid: [''],
      motivdesc: [''],
      tipoid: ['', Validators.required],
      tipodesc: [''],
      societaPersonaid: ['', Validators.required],
      societaPersona: [''],
      clienteDistaccoid: [''],
      clienteDistacco: [''],
      sysuser: ['']
    });     */
   }

  ngOnDestroy(): void {
    this.inserimentoContrattoService.idContratto$.next(undefined);
    this.reset();
  }

  ngOnInit() {
   /*  this.formData = this.builder.group({
      codiContrattopersid: [''],
      codiRalcompenso: ['', Validators.required],
      codiMonteore: ['', Validators.required],
      codiDatainiziocontratto: ['', Validators.required],
      codiDatafinecontratto: [''],
      codiSmartworking: [false, Validators.required],
      codiNote: ['', Validators.maxLength(4000)],
      codiFlagAttiva: [1],
      codsDistaccoid: [''],
      codsValoredistacco: [''],
      codsDatainiziodistacco: [''],
      codsDatafinedistacco: [''],
      codsFlagAttiva: [0],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      personaId: ['', Validators.required],
      codiceFiscale: ['', Validators.pattern(/^[A-Za-z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Za-z]{1}[0-9]{2}+[A-Za-z]{1}$/)],
      partitaIva: ['', Validators.pattern(/^\d{11}$/)],
      ccnlid: ['', Validators.required],
      descrizioneCCNL: [''],
      livelloid: ['', Validators.required],
      livelloContratto: [''],
      motivid: [''],
      motivdesc: [''],
      tipoid: ['', Validators.required],
      tipodesc: [''],
      societaPersonaid: ['', Validators.required],
      societaPersona: [''],
      clienteDistaccoid: [''],
      clienteDistacco: [''],
      sysuser: ['']
    });     */
    this.reset();
    this.inserimentoContrattoService.idContratto$.value !== undefined ? this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value) : null;
    this.utenteLoggato = sessionStorage.getItem('SysUser');
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.getAllTipitipiMotiviFineContratto();
    this.controllovisibilPartitaIva();
    this.distaccoEsiste(this.formData.personaId);
    
    this.disable_fields = true;

    this.menuDinamicoService.getPermissionFlag();
  }
  
  distaccoEsiste(idPerosna: number | null) {
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = this.formData.personaId;
    this.inserimentoContrattoService.getCronologiaDistacco(this.formData.personaId).subscribe(
      (response: any) => {
        this.personaConDistacchi = response.length > 0;
      },
      (error: any) => {
        //nulla
      }
    );
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
      this.inserimentoContrattoService.idContratto$.next(undefined);
    } else {
    }
  }

  reset() {
    //this.formData.reset();
     this.formData = {
      codiContrattopersid: null,
      codiRalcompenso: null,
      codiMonteore: null,
      codiDatainiziocontratto: null,
      codiDatafinecontratto: null,
      codiSmartworking: false,
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
    this.costoOrario = null;
    this.costoMensile = null;
  }

  getAllTipoSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
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
        this.tipiContratto = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  getAllTipoCcnl() {
    this.inserimentoContrattoService.getAllTipoCcnl().subscribe(
      (response: any) => {
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
        this.tipiClientiDistacco = response.concat([
          { clienteDistaccoid: -1, clienteDistacco: 'Nuova azienda cliente' },
        ]);
      },
      (error: any) => {
        console.error('Errore durante il caricament delle aziende clienti per il distacco.');
      }
    );
  }

  getAllTipoLivelloByCCNL(id: number | null) {
    if (this.formData.ccnlid !== null) {
      this.inserimentoContrattoService.getAllTipoLivelloByCCNL(id)
        .subscribe(
          (data) => {
            this.tipiLivello = data;
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
      this.controllovisibilPartitaIva();
      this.distaccoEsiste(this.formData.personaId);
    });
  }

  inviaForm() {
    this.formData.sysuser = this.utenteLoggato;
    this.formData.codiSmartworking = !!this.formData.codiSmartworking || false;

    if (this.formValidationCheck()) {
      const contrattoObj = this.formData;
      this.inserimentoContrattoService
        .insertNuovoContratto(contrattoObj, this.selectedFiles)
        .subscribe(
          (response: any) => {
            alert(response);
            this.reloadGestioneFile()
            this.reset();
            this.selectedFiles = []
          },
          (error: any) => {
            alert("Errore durante l'inserimento del contratto (errore di frontend)");
          }
        );
    } else {
      const erroriCampiTradotti = this.arrayErrori.map(campo => this.getCampoErroriName(campo));
      alert("\n\n Errore nell'inserimento dati, non sono stati inseriti i seguenti campi: \nnon è stata selezionata un" + erroriCampiTradotti.join('\nnon è stata selezionata un'));
    }
  }

  async getContrattoByidContratto(idContratto: number | undefined) {
    try {
      const response = idContratto == undefined ? null : await this.inserimentoContrattoService.getContrattiById(idContratto).toPromise();
      const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(response.ccnlid).toPromise();

      this.tipiLivello = livelli;
      this.formData = response;
      
      this.disablePartitaIvaField = this.formData.partitaIva ? ValidaPartita.IVA(this.formData.partitaIva) : true;
      this.hidePartitaIvaField = this.formData.partitaIva ? true : false;
      this.valoredistaccoValido = this.formData.codsValoredistacco ? this.valoreDistaccoChangeValidation() : true;
      
      this.formData.codiDatainiziocontratto = FormattaData.formattaData(response.codiDatainiziocontratto);
      this.formData.codiDatafinecontratto = FormattaData.formattaData(response.codiDatafinecontratto);
      this.formData.codsDatainiziodistacco = FormattaData.formattaData(response.codsDatainiziodistacco);
      this.formData.codsDatafinedistacco = FormattaData.formattaData(response.codsDatafinedistacco);

      this.pannelloEspanso = this.formData.codsFlagAttiva ? true : false;

      this.loadCosts(this.formData.personaId);
      this.personaConDistacchiAperti = !!this.formData.codsDistaccoid ? true : false;
      this.distaccoEsiste(this.formData.personaId);
      return true;
    } catch (error) {
      console.error("Errore nell'apertura di un contratto:", error);
      return false;
    }
  }

  loadCosts(IdPersona : number | null) {
    if(IdPersona != null) {
      this.utilityCostiService.GetCostiByMatricolaMeseAnno(IdPersona).subscribe(
        (response: any) => {
          this.costoOrario = response.costoOrario;
          this.costoMensile = response.costoMensile;
          },
        (error: any) => {
          this.erroreCostoOrario = true;
          this.erroreCostoMensile = true;
        }
      );
    } 
  }

  valoreDistaccoChangeValidation() {
    if ((this.formData.codsValoredistacco ? (this.formData.codsValoredistacco <= 100) : false) &&
      (this.formData.codsValoredistacco ? (this.formData.codsValoredistacco >= 0) : false)) {
      this.valoredistaccoValido = true;
    } else {
      this.valoredistaccoValido = false;
    }
    return this.valoredistaccoValido;
  }

  getCampoErroriName(campo: string): string {
    return {
        personaId: 'a Persona',
        societaPersonaid: 'a Società',
        codiDatainiziocontratto: 'a Data inizio contratto',
        tipoid: " Tipo di contratto",
        ccnlid: " CCNL",
        livelloid: " Livello del CCNL",
        codiRalcompenso: "a RAL",
        codiMonteore: " Monteore",
        codiSmartworking: "a opsione per lo smartworking",
        partitaIva: "a partita Iva, ma è richiesta",
    }[campo] || campo;
}

  formValidationCheck(): boolean {
    this.arrayErrori = [];
    const formCompilato = this.formData;
    const nonVuoto = (value: any) => !!value || (value !== undefined && value !== null && value !== '');
    const checkErrore = (campo: any, nomeCampo: string) => {
      if (!nonVuoto(campo)) {
          this.arrayErrori.push(nomeCampo);
          return false; // se è null, undefined o vuoto.
      }
      return true; //esiste e non è vuoto
    };
    let isValidContrattoDates = true;
    let isValidDistaccoDates = true;

    const validaPersonaId = checkErrore(formCompilato.personaId, 'personaId');
    const validaSocietaPersonaid = checkErrore(formCompilato.societaPersonaid, 'societaPersonaid');
    const validaCodiDatainiziocontratto = checkErrore(formCompilato.codiDatainiziocontratto, 'codiDatainiziocontratto');
    const validaTipoid = checkErrore(formCompilato.tipoid, 'tipoid');
    const validaCcnlid = checkErrore(formCompilato.ccnlid, 'ccnlid');
    const validaLivelloid = checkErrore(formCompilato.livelloid, 'livelloid');
    const validaCodiRalcompenso = checkErrore(formCompilato.codiRalcompenso, 'codiRalcompenso');
    const validaCodiMonteore = checkErrore(formCompilato.codiMonteore, 'codiMonteore');
    const validaCodiSmartworking = checkErrore(formCompilato.codiSmartworking, 'codiSmartworking');
    const validaPartitaiva = this.hidePartitaIvaField ?  checkErrore(formCompilato.partitaIva, 'partitaIva') : true;
    const startDateContratto = this.formData.codiDatainiziocontratto ? new Date(this.formData.codiDatainiziocontratto) : null;
    const endDateContratto = this.formData.codiDatafinecontratto ? new Date(this.formData.codiDatafinecontratto) : null;
    const startDateDistacco = this.formData.codsDatainiziodistacco ? new Date(this.formData.codsDatainiziodistacco) : null;
    const endDateDistacco = this.formData.codsDatafinedistacco ? new Date(this.formData.codsDatafinedistacco) : null;

    if (endDateContratto && startDateContratto) {
      isValidContrattoDates = endDateContratto >= startDateContratto;
    }

    if (this.formData.codsFlagAttiva) {
        if (startDateContratto && startDateDistacco) {
          isValidDistaccoDates = startDateDistacco >= startDateContratto;
            if (isValidDistaccoDates && endDateDistacco) {
              isValidDistaccoDates = endDateDistacco >= startDateDistacco;
            }
        }
    }

    let validaCodsValoredistacco = true;
    let validaClienteDistaccoid = true;
    let validaCodsDatainiziodistacco = true;
    let validaCodsDataFineDistacco = true;
    if (formCompilato.codsFlagAttiva) {
      validaCodsValoredistacco = checkErrore(formCompilato.codsValoredistacco, 'codsValoredistacco');
      validaClienteDistaccoid = checkErrore(formCompilato.clienteDistaccoid, 'clienteDistaccoid');
      validaCodsDatainiziodistacco = checkErrore(formCompilato.codsDatainiziodistacco, 'codsDatainiziodistacco');
      validaCodsDataFineDistacco = checkErrore(formCompilato.codsDatafinedistacco, 'codsDatafinedistacco')
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
    validaCodsDatainiziodistacco &&
    validaCodsDataFineDistacco &&
    isValidContrattoDates && isValidDistaccoDates;

    return formValidation;
  }

  receiveFile($event: any) {
    this.selectedFiles = $event;
  }

  reloadGestioneFile() {
    this.enabled = false;
    this.changeDetector.detectChanges();
    this.enabled = true;
  }
}
