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

  dipendentiSenzaContratto: utenteSenzaContatto[] | null | undefined;

  dipendentiConContratto?: inserimentoContratto;

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
  ) { }

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllClienti();
    this.controllaDisabilitaCampoPartitaIva();
    this.disable_fields = true;
    this.uncheck = true;
    this.dipendentiSenzaContratto;
    console.log(' id contratto passato = ' + this.inserimentoContrattoService.idContratto$.value);
    this.idContratto !== undefined /* && idContratto !== 0 */ ? this.getContrattoByidContratto(this.idContratto) : null;

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
    if (this.dipendentiSenzaContratto && this.dipendentiSenzaContratto.length > array_index) {
      const dipendente = this.dipendentiSenzaContratto[array_index];
      if (dipendente) {
        this.formData.AnpeCodicefiscale = dipendente.anpeCodicefiscale;
        this.formData.AnpeNome = dipendente.anpeNome;
        this.formData.AnpeCognome = dipendente.anpeCognome;
        this.formData.AnpePartitaiva = dipendente.AnpePartitaiva ?? null;
        this.formData.AnpePersonaid = dipendente.anpePersonaid;
        this.inserimentoContrattoService.idContratto$.next(0);
        this.closeModalRicercaUtentiSenzaContratto();
      }
    }
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
        /*
        this.dipendentiConContratto = response;
        console.log(this.dipendentiConContratto);
        */
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

    const isAnpeCodicefiscaleValid = isNotBlank(formData.AnpeCodicefiscale);
    const isAnpeNomeValid = isNotBlank(formData.AnpeNome);
    const isAnpeCognomeValid = isNotBlank(formData.AnpeCognome);
    const isAnsoSocietaidValid = isNotBlank(formData.AnsoSocietaid);
    const isCodiDatainiziocontrattoValid = isNotBlank(formData.CodiDatainiziocontratto);
    const isCodiDatafinecontrattoValid = isNotBlank(formData.CodiDatafinecontratto);
    const isCotctipocontrattoidValid = isTruthy(formData.Cotctipocontrattoid);
    const isCoccCcnlidValid = isTruthy(formData.CoccCcnlid);
    const isColiLivelloidValid = isTruthy(formData.ColiLivelloid);
    const isCodiRalcompensoValid = isTruthy(formData.CodiRalcompenso);
    const isCodiMonteoreValid = isTruthy(formData.CodiMonteore);
    const isCodiSmartworkingValid = isNotBlank(formData.CodiSmartworking) ? true : false;

    const isUncheckFalse = isTrue(this.uncheck);
    const isValidFields = isNotBlank(formData.CodsValoredistacco) && isNotBlank(formData.CodsClienteId) && isNotBlank(formData.CodsDatainiziodistacco) && isNotBlank(formData.CodsDatafinedistacco);

    this.formValidation = isAnpeCodicefiscaleValid && isAnpeNomeValid && isAnpeCognomeValid && isAnsoSocietaidValid && isCodiDatainiziocontrattoValid && isCodiDatafinecontrattoValid && isCotctipocontrattoidValid && isCoccCcnlidValid && isColiLivelloidValid && isCodiRalcompensoValid && isCodiMonteoreValid && isCodiSmartworkingValid && (isUncheckFalse || (isUncheckFalse && isValidFields));

    this.formValidationCheckDates();
  }


  formValidationCheckDates() {
    const startDateContratto = new Date(this.formData.CodiDatainiziocontratto);
    const endDateContratto = new Date(this.formData.CodiDatafinecontratto);
    const startDateDistacco = new Date(this.formData.CodsDatainiziodistacco);
    const endDateDistacco = new Date(this.formData.CodsDatafinedistacco);

    const isValidContratto = startDateContratto < endDateContratto;
    const isValidDistacco = startDateDistacco < endDateDistacco;

    this.formValidation = isValidContratto && isValidDistacco;
  }

  autoFillformData() {
    if (this.dipendentiConContratto == null) {
    } else {
      console.log('importo contratto con id :' + this.dipendentiConContratto.CodiContrattopersid);
      this.formData.CodiContrattopersid = this.dipendentiConContratto.CodiContrattopersid;
      this.formData.AnpeCodicefiscale = this.dipendentiConContratto.AnpeCodicefiscale;
      this.formData.AnpeNome = this.dipendentiConContratto.AnpeNome;
      this.formData.AnpePersonaid = this.dipendentiConContratto.AnpePersonaid;
      this.formData.AnpeCognome = this.dipendentiConContratto.AnpeCognome;
      this.formData.AnpePartitaiva = this.dipendentiConContratto.AnpePartitaiva;
      this.formData.CodiDatainiziocontratto = this.dipendentiConContratto.CodiDatainiziocontratto.split("T")[0];
      this.dipendentiConContratto.CodiDatafinecontratto = this.formData.CodiDatafinecontratto != null ? this.formData.CodiDatafinecontratto : "";
      this.formData.CodiRalcompenso = this.dipendentiConContratto.CodiRalcompenso;
      this.formData.CodiMonteore = this.dipendentiConContratto.CodiMonteore;
      this.formData.CodiSmartworking = this.dipendentiConContratto.CodiSmartworking == null ? false : true;
      this.uncheck = this.dipendentiConContratto.CodsFlagAttiva == null || this.dipendentiConContratto.CodsFlagAttiva == 0 ? false : true;
      this.formData.CodsValoredistacco = this.dipendentiConContratto.CodsValoredistacco;
      this.formData.CodsDatainiziodistacco = this.formData.CodsDatainiziodistacco != null ? this.dipendentiConContratto.CodsDatainiziodistacco.split("T")[0] : "";
      this.formData.CodsDatafinedistacco = this.formData.CodsDatafinedistacco != null ? this.dipendentiConContratto.CodsDatafinedistacco.split("T")[0] : "";
      this.formData.CodiNote = this.dipendentiConContratto.CodiNote;
      const indicesocieta = this.tipiSocieta?.findIndex(societa => societa.ansoRagionesociale === (this.dipendentiConContratto?.SocietaPersona ?? ""));
      this.formData.AnsoSocietaid = indicesocieta !== -1 ? this.tipiSocieta[indicesocieta].ansoSocietaid.toString() : this.formData.AnsoSocietaid;
      const indicetipocontratto = this.tipiContratto?.findIndex(contratto => contratto.cotcContratto === (this.dipendentiConContratto?.TipoContratto ?? ""));
      this.formData.Cotctipocontrattoid = indicetipocontratto !== -1 ? this.tipiContratto[indicetipocontratto].cotcTipocontrattoid : this.formData.Cotctipocontrattoid;
      const indiceccnl = this.tipiCcnl?.findIndex(ccnl => ccnl.coccDesc === (this.dipendentiConContratto?.DescrizioneCCNL ?? ""));
      this.formData.CoccCcnlid = indiceccnl !== -1 ? this.tipiCcnl[indiceccnl].coccCcnlid : this.formData.CoccCcnlid;
      const indicecliente = this.tipiClientiDistacco?.findIndex(societa => societa.ragionesociale === (this.dipendentiConContratto?.SocietaPersona ?? ""));
      this.formData.AnsoSocietaid = indicecliente !== -1 ? this.tipiSocieta[indicecliente].ansoSocietaid.toString() : this.formData.AnsoSocietaid;
    }
  }
}
