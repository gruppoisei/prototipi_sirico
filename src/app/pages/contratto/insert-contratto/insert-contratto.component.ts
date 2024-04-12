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


@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  providers: [GestioneContrattoComponent]
})

export class InsertContrattoComponent implements OnInit {
  partitaIvaID: number = 3;
  uncheck: any;
  formValidation: boolean = false;
  disable_fields: any;  // canc?

  checkDateValidity: boolean = false;
  dateinizioTouched: boolean = false;
  datefineTouched: boolean = false;
  modalNuovaAziendaCliente: boolean = false;
  showModal: boolean = false;
  disablePartitaIvaField: boolean = true;
  hidePartitaIvaField: boolean = false;
  subscription!: Subscription;
  idContratto!: number;
  costopresuntomese: number = 0;
  costopresuntogiorno: number = 0;

  contratto: any; // canc?
  id: any;  // canc?

  tipiSocieta!: [{ ansoSocietaid: number; ansoRagionesociale: string }];
  tipiContratto!: [{ cotcTipocontrattoid: number; cotcContratto: string }];
  tipiCcnl!: [{ coccCcnlid: number; coccDesc: string }];
  tipiLivello!: [{ coliLivelloid: number; coliLivellocontratto: string }];
  tipiClientiDistacco!: [{ idcliente: number; ragionesociale: string }];
  array_societa: any = [];
  private routeSub!: Subscription;
  form!: FormGroup<any>;

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  output_ricercaFiltrata: any;

  dipendentiSenzaContratto: utenteSenzaContatto = {
    anpePersonaid: -1,
    anpeNome: '',
    anpeCognome: '',
    anpeCodicefiscale: '',
    AnpePartitaiva: null,
  };
/*
  dipendentiConContratto!: {
    personaId: number;
    codiContrattopersid: number;
    nome: string;
    cognome: string;
    codiceFiscale: string;
    codiDatainiziocontratto: string;
    codiDatafinecontratto: string;
    tipoContratto: string;
    descrizioneCCNL: string;
    livelloContratto: string;
    societaDistacco: string;
    codiRalcompenso: number;
    smartWorking: number;
    codsValoredistacco: number;
    codsDatainiziodistacco: string;
    codsDatafinedistacco: string;
    codiNote: string;
    societaPersona: string;
    codiMonteore: number;
    codsFlagAttiva: number;
  };
*/
  formData: inserimentoContratto = {
    AnpeNome: "",
    AnpeCognome: "",
    AnpePersonaid: null,
    AnpeCodicefiscale: "",
    AnpePartitaiva: "",
    AnsoSocietaid: null,
    CodiDatainiziocontratto: "", //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    CodiDatafinecontratto: "", //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    Cotctipocontrattoid: null,
    TipoContratto: null,
    CoccCcnlid: 0,
    DescrizioneCCNL: null,
    ColiLivelloid: null,
    LivelloContratto: null,
    CodiRalcompenso: null,
    CodiMonteore: null,
    CodiSmartworking: null,
    CodsValoredistacco: null,
    CodsDatainiziodistacco: "",
    CodsDatafinedistacco: "",
    CodiNote: null,
    CodiSysuser: "Frontend",
    CodiFlagAttiva: 1,
    CodsFlagAttiva: 0,
    CodsClienteId: null,
    SocietaDistacco: null,
    SocietaPersona: null,
    CodiContrattopersid: null,
    CodiFkCossVisitamedica: null,
    durataValiditaVisitaMedica: null,
    CodiFkCossCorsosicurezza1: null,
    durataValiditaCorsoSicurezza1: null,
    CodiFkCossCorsosicurezza2: null,
    durataValiditaCorsoSicurezza2: null,
    CodiFkComlIdmotivazione: null
  };

  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    /*  
    this.dipendentiSenzaContratto = {
      anpePersonaid: -1,
      anpeNome: '',
      anpeCognome: '',
      anpeCodicefiscale: '',
      AnpePartitaiva: null
    }; 
    */
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.controllaDisabilitaCampoPartitaIva();
    //this.ricercaFiltrata('', '', '');
    this.disable_fields = true;
    this.uncheck = true;    //setta false e aggiungi flag per
    this.dipendentiSenzaContratto;

    if (this.inserimentoContrattoService.idContratto$.value != undefined && this.inserimentoContrattoService.idContratto$.value != 0) {
      this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value);
    }

    this.inserimentoContrattoService.modalState.subscribe((isOpen) => {
      this.showModal = isOpen;
    });
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

  openCronologiaDistaccoModal() {
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = this.formData.AnpePersonaid;
    //FORSE CAMBIARE COSì: PASSA IDPERSONA AL SERVICE, POI QUESTA CHIAMATA LA FA L'ALTRO COMPONENTE (CronologiaDistaccoComponent)
    if (this.inserimentoContrattoService.idPersonaCronologiaDistacchi != null) {
      this.inserimentoContrattoService.getCronologiaDistacco()
        .subscribe(
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
      this.uncheck = false;
      this.inserimentoContrattoService.idContratto$.next(0);
    }
    else {
      console.log('Operazione annullata');
    }
  }

  reset() {
    this.formData = {
      AnpeNome: "",
      AnpeCognome: "",
      AnpePersonaid: null,
      AnpeCodicefiscale: "",
      AnpePartitaiva: "",
      AnsoSocietaid: null,
      CodiDatainiziocontratto: "", //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      CodiDatafinecontratto: "", //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      Cotctipocontrattoid: null,
      TipoContratto: null,
      CoccCcnlid: 0,
      DescrizioneCCNL: null,
      ColiLivelloid: null,
      LivelloContratto: null,
      CodiRalcompenso: null,
      CodiMonteore: null,
      CodiSmartworking: null,
      CodsValoredistacco: null,
      CodsDatainiziodistacco: "",
      CodsDatafinedistacco: "",
      CodiNote: null,
      CodiSysuser: "Frontend",
      CodiFlagAttiva: 1,
      CodsFlagAttiva: 0,
      CodsClienteId: null,
      SocietaDistacco: null,
      SocietaPersona: null,
      CodiContrattopersid: null,
      CodiFkCossVisitamedica: null,
      durataValiditaVisitaMedica: null,
      CodiFkCossCorsosicurezza1: null,
      durataValiditaCorsoSicurezza1: null,
      CodiFkCossCorsosicurezza2: null,
      durataValiditaCorsoSicurezza2: null,
      CodiFkComlIdmotivazione: null
    };
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
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
        console.error('Errore durante il recupero dei tipi di contratto:', error);
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
        this.tipiClientiDistacco = response.concat([{ idcliente: -1, ragionesociale: 'Nuova azienda cliente' }]);
      },
      (error: any) => {
        console.error('Errore durante il caricament delle aziende clienti per il distacco.')
      }
    )
  }

  getAllTipoLivello() {
    this.inserimentoContrattoService.getAllTipoLivello(this.formData.CoccCcnlid).subscribe(
      (response: any) => {
        console.log('response get tipi livello:');
        console.log(response);
        this.tipiLivello = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di livello:', error);
      }
    );
  }

  controllaDisabilitaCampoPartitaIva() {
    this.disablePartitaIvaField = this.formData.AnpePartitaiva != null ? true : false;
  }

  controlloHideCampoPartitaIva() {
    this.hidePartitaIvaField = this.formData.CoccCcnlid === this.partitaIvaID ? false : true;
    this.hidePartitaIvaField && this.controllaDisabilitaCampoPartitaIva();
  }

  formatInputValue(event: any) {
    this.formData.CodsValoredistacco = event.target.value.replace(/\D+/g, '');
  }

  // DIALOG FUNCTIONS

  showModalRicercaUtentiSenzaContratto(): void {
    console.log('lavoro nel dialog box');
    this.dialog.open(this.approvalModal, {
      width: '80vw',
      height: '80vh'
    })
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
        codiceFiscale: null
      }
    }
    else {
      console.log('Operazione annullata');
    }
  }

  ricercaFiltrata(name: string, surname: string, cf: string) {
    this.inserimentoContrattoService.getAllDipendentiSenzaContratto(name, surname, cf).subscribe(
      (response: any) => {
        console.log(response);
        this.dipendentiSenzaContratto = response;
        this.output_ricercaFiltrata = true;
      },
      (error: any) => {
        console.error('Errore durante il recupero della lista dei dipendenti senza contratto:', error);
      }
    );
  }

  autoFillFields(array_index: number) {
    this.formData.AnpeCodicefiscale = this.dipendentiSenzaContratto.anpeCodicefiscale;
    this.formData.AnpeNome = this.dipendentiSenzaContratto.anpeNome;
    this.formData.AnpeCognome = this.dipendentiSenzaContratto.anpeCognome;
    this.formData.AnpePartitaiva = this.dipendentiSenzaContratto.AnpePartitaiva ?? null;
    this.formData.AnpePersonaid = this.dipendentiSenzaContratto.anpePersonaid;
    this.inserimentoContrattoService.idContratto$.next(0);
    this.closeModalRicercaUtentiSenzaContratto();
  }

  // INSERIMENTO E AGGIORNAMENTO
  insertContratto() {
    if (this.uncheck == false) { this.formData.CodsFlagAttiva = 0 }
    else { this.formData.CodsFlagAttiva = 1 }
    this.inserimentoContrattoService.insertNuovoContratto(this.formData).subscribe(
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
  }

  getContrattoByidContratto(idContratto: number) {
    this.inserimentoContrattoService.getAllContrattiById(idContratto).subscribe(
      (response: any) => {
        console.log(response);
        this.formData = response;
        console.log(this.formData);
        this.autoFillformData();
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }

  formValidationCheck() {
    if (
      (this.formData.AnpeCodicefiscale != undefined && this.formData.AnpeCodicefiscale != null && this.formData.AnpeCodicefiscale != "") &&
      (this.formData.AnpeNome != undefined && this.formData.AnpeNome != null && this.formData.AnpeNome != "") &&
      (this.formData.AnpeCognome != undefined && this.formData.AnpeCognome != null && this.formData.AnpeCognome != "") &&
      (this.formData.AnsoSocietaid != undefined && this.formData.AnsoSocietaid != null && this.formData.AnsoSocietaid != "") &&
      (this.formData.CodiDatainiziocontratto != undefined && this.formData.CodiDatainiziocontratto != null && this.formData.CodiDatainiziocontratto != "") &&
      (this.formData.CodiDatafinecontratto != undefined && this.formData.CodiDatafinecontratto != null) &&
      (this.formData.Cotctipocontrattoid != undefined && this.formData.Cotctipocontrattoid != null && this.formData.Cotctipocontrattoid.toString() != "") &&
      (this.formData.CoccCcnlid != undefined && this.formData.CoccCcnlid != null && this.formData.CoccCcnlid.toString() != "") &&
      (this.formData.ColiLivelloid != undefined && this.formData.ColiLivelloid != null && this.formData.ColiLivelloid.toString() != "") &&
      (this.formData.CodiRalcompenso != undefined && this.formData.CodiRalcompenso != null && this.formData.CodiRalcompenso.toString() != "") &&
      (this.formData.CodiMonteore != undefined && this.formData.CodiMonteore != null && this.formData.CodiMonteore.toString() != "") &&
      (this.formData.CodiSmartworking != undefined && this.formData.CodiSmartworking != null) &&
      (
        (this.uncheck == false) ||
        (this.uncheck == true &&
          (this.formData.CodsValoredistacco != undefined && this.formData.CodsValoredistacco != null && this.formData.CodsValoredistacco.toString() != "") &&
          (this.formData.CodsClienteId != undefined && this.formData.CodsClienteId != null && this.formData.CodsClienteId.toString() != "") &&
          (this.formData.CodsDatainiziodistacco != undefined && this.formData.CodsDatainiziodistacco != null && this.formData.CodsDatainiziodistacco != "") &&
          (this.formData.CodsDatafinedistacco != undefined && this.formData.CodsDatafinedistacco != null && this.formData.CodsDatafinedistacco != "")
        ))) {
      this.formValidation = true;
    } else {
      this.formValidation = false;
    }

    this.formValidationCheckDates();
  }

  formValidationCheckDates() {
    var checkDataFineContratto = false;
    var checkDataFineDistacco = false;
    console.log(this.formData.CodiDatafinecontratto.toString());
    console.log(this.formData.CodiDatafinecontratto);
    if (this.formData.CodiDatafinecontratto != "") {
      if (this.formData.CodiDatainiziocontratto < this.formData.CodiDatafinecontratto) {
        checkDataFineContratto = true;
      }
      else {
        checkDataFineContratto = false;
      }
    }
    if (this.formData.CodsDatafinedistacco != "") {
      if (this.formData.CodsDatainiziodistacco < this.formData.CodsDatafinedistacco) {
        checkDataFineDistacco = true;
      }
      else {
        checkDataFineDistacco = false;
      }
    }
    if (checkDataFineContratto && checkDataFineDistacco) {
      this.formValidation = true;
    }
    else {
      this.formValidation = false;
    }
  }

  autoFillformData() {
    //this.getAllTipoLivello();
    /*
    console.log('prova id contratto:' + this.formData.codiContrattopersid);
    this.formData.CodiContrattopersid = this.dipendentiConContratto.codiContrattopersid;
    this.formData.AnpeCodicefiscale = this.dipendentiConContratto.codiceFiscale;
    this.formData.AnpeNome = this.dipendentiConContratto.nome;
    this.formData.AnpePersonaid = this.dipendentiConContratto.personaId;
    this.formData.AnpeCognome = this.dipendentiConContratto.cognome;
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendentiConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    };
    for (let i = 0; i < this.tipiContratto?.length; i++) {
      if (this.tipiContratto[i].cotcContratto == this.dipendentiConContratto.tipoContratto) {
        this.formData.Cotctipocontrattoid = this.tipiContratto[i].cotcTipocontrattoid;
        break;
      }
    };
    for (let i = 0; i < this.tipiCcnl?.length; i++) {
      if (this.tipiCcnl[i].coccDesc == this.dipendentiConContratto.descrizioneCCNL) {
        this.formData.CoccCcnlid = this.tipiCcnl[i].coccCcnlid;
        break;
      }
    };
    this.getAllTipoLivello();
    // METTO COME RUOLO UN VALORE DI DEFAULT
    this.formData.CodiDatainiziocontratto = this.dipendentiConContratto.codiDatainiziocontratto.split("T")[0];
    if (this.formData.CodiDatafinecontratto != null) {
      //this.formData.CodiDatafinecontratto = this.dipendentiConContratto.codiDatafinecontratto.split("T")[0];
    }
    else {
      this.dipendentiConContratto.codiDatafinecontratto = "";
    }
    this.formData.CodiRalcompenso = this.dipendentiConContratto.codiRalcompenso;
    this.formData.CodiMonteore = this.dipendentiConContratto.codiMonteore;
    if (this.dipendentiConContratto.smartWorking == 0) { this.formData.CodiSmartworking = false; }
    else { this.formData.CodiSmartworking = true }
    if (this.dipendentiConContratto.codsFlagAttiva == null || this.dipendentiConContratto.codsFlagAttiva == 0) {
      this.uncheck = false;
    }
    else { this.uncheck = true; }
    this.formData.CodsValoredistacco = this.dipendentiConContratto.codsValoredistacco;
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendentiConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    };
    if (this.formData.CodsDatainiziodistacco != null) {
      this.formData.CodsDatainiziodistacco = this.dipendentiConContratto.codsDatainiziodistacco.split("T")[0];
    }
    else {
      this.formData.CodsDatainiziodistacco = "";
    }
    if (this.formData.CodsDatafinedistacco != null) {
      this.formData.CodsDatafinedistacco = this.dipendentiConContratto.codsDatafinedistacco.split("T")[0];
    }
    else {
      this.formData.CodsDatafinedistacco = "";
    }
    this.formData.CodiNote = this.dipendentiConContratto.codiNote;
    */
  }
}
