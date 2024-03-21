import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { inserimentoContratto } from '../../dto/response/inserimentoContratto';
import { ricercaContratto } from '../../dto/request/ricercaContratto';
import { InsertContrattoService } from '../../service/insert-contratto.service';
import { GestioneContrattoComponent } from '../gestione-contratto/gestione-contratto.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss',
  providers: [GestioneContrattoComponent]
})

export class InsertContrattoComponent implements OnInit {

  uncheck: any;
  disable_fields: any;

  checkDateValidity: boolean = false;
  dateinizioTouched: boolean = false;
  datefineTouched: boolean = false;

  contratto: any;

  tipiSocieta!: [{ ansoSocietaid: number; ansoRagionesociale: string }];
  tipiContratto!: [{ cotcTipocontrattoid: number; cotcContratto: string }];
  tipiCcnl!: [{ coccCcnlid: number; coccDesc: string }];
  tipiLivello!: [{ coliLivelloid: number; coliLivellocontratto: string }];
  tipiSocietaDistacco!: [{ ansoSocietaid: number; ansoRagionesociale: string }]
  //tipiRuolo!: { anruRuoloid: number; anruRuolodesc: string };
  tipiRuolo: { anruRuoloid: number; anruRuolodesc: string }[] = [
    {
      anruRuoloid: 0,
      anruRuolodesc: "Operaio"
    },
    {
      anruRuoloid: 1,
      anruRuolodesc: "Impiegato"
    },
    {
      anruRuoloid: 2,
      anruRuolodesc: "Quadro"
    },
    {
      anruRuoloid: 3,
      anruRuolodesc: "Dirigente"
    }
  ]

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  output_ricercaFiltrata: any;

  dipendentiSenzaContratto!: [{
    anpePersonaid: number;
    anpeNome: string;
    anpeCognome: string;
    anpeCodicefiscale: string;
  }];

  dipendentiConContratto!: {
    //anpePersonaid: number;
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

  //prova: any[] = this.dipendentiConContratto;
  array_societa: any = [];

  formData: inserimentoContratto = {
    AnpeNome: "",
    AnpeCognome: "",
    AnpePersonaid: null,
    AnpeCodicefiscale: "",
    AnsoSocietaid: null,
    CodiDatainiziocontratto: formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    CodiDatafinecontratto: formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    codiFkCotctipocontrattoid: null,
    CoccCcnlid: 0,
    ColiLivelloid: null,
    AnruRuoloid: null,
    CodiRalcompenso: null,
    CodiMonteore: null,
    CodiSmartworking: null,
    costopresuntomese: null,
    costopresuntogiorno: null,
    CodsValoredistacco: null,
    ansoSocietaDistaccoid: null,
    CodsDatainiziodistacco: null,
    CodsDatafinedistacco: null,
    CodiNote: null,
    CodiSysuser: "Edo",
    CodiFlagAttiva: null,
    CodsFlagAttiva: 0,
    CodsClienteId: null,
    // altro
    /*
    CodiContrattopersid: null,
    TipoContratto: null,
    DescrizioneCCNL: null,
    LivelloContratto: null,
    SocietaDistacco: "",
    SocietaPersona: ""
    */
  };


  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null
  }

  private routeSub!: Subscription;
  //activeRoute: any;

  //gestioneContratto: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
  ) {

  }

  subscription!: Subscription;
  idContratto!: number;

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.disable_fields = true;
    this.uncheck = false;
    this.dipendentiSenzaContratto;
    
    if (this.inserimentoContrattoService.idContratto$.value != undefined) {
      this.getContrattoByidContratto(this.inserimentoContrattoService.idContratto$.value);
    }       
  }

  clearForm() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.reset();
      this.uncheck = false;
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
      AnsoSocietaid: null,
      CodiDatainiziocontratto: new Date().toLocaleString(),
      CodiDatafinecontratto: new Date().toLocaleString(),
      codiFkCotctipocontrattoid: null,
      CoccCcnlid: 0,
      ColiLivelloid: null,
      AnruRuoloid: null,
      CodiRalcompenso: null,
      CodiMonteore: null,
      CodiSmartworking: false,
      costopresuntomese: null,
      costopresuntogiorno: null,
      CodsValoredistacco: null,
      ansoSocietaDistaccoid: null,
      CodsDatainiziodistacco: null,
      CodsDatafinedistacco: null,
      CodiNote: null,
      CodiSysuser: "Edo",
      CodiFlagAttiva: null,
      CodsFlagAttiva: 0,
      CodsClienteId: null,
      // altro
      /*
      CodiContrattopersid: null,
      TipoContratto: null,
      DescrizioneCCNL: null,
      LivelloContratto: null,
      SocietaDistacco: "",
      SocietaPersona: ""
      */
    };
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/homepage']);
  }

  getAllTipoSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiSocieta = response;
        this.tipiSocietaDistacco = response;
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
        this.getAllTipoLivello();
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllTipoLivello() {
    this.inserimentoContrattoService.getAllTipoLivello(this.formData.CoccCcnlid).subscribe(
      (response: any) => {
        console.log(response);
        this.tipiLivello = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di livello:', error);
      }
    );
  }

  /*
    getAllTipoRuolo() {
      this.inserimentoContrattoService.getAllTipoRuolo().subscribe(
        (response: any) => {
          console.log(response);
          this.tipiRuolo = response;
        },
        (error: any) => {
          console.error('Errore durante il recupero dei tipi di ruolo:', error);
        }
      );
    }
    */

  // DIALOG FUNCTIONS

  showModalApprovazione(): void {
    console.log('lavoro nel dialog box');
    this.dialog.open(this.approvalModal, {
      width: '80vw',
      height: '80vh'
    })
  }

  closeModal(): void {
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
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  autoFillFields(array_index: number) {
    this.formData.AnpeCodicefiscale = this.dipendentiSenzaContratto[array_index].anpeCodicefiscale;
    this.formData.AnpeNome = this.dipendentiSenzaContratto[array_index].anpeNome;
    this.formData.AnpeCognome = this.dipendentiSenzaContratto[array_index].anpeCognome;
    this.formData.AnpePersonaid = this.dipendentiSenzaContratto[array_index].anpePersonaid;
    this.closeModal();
  }

  insertContratto() {
    if (this.uncheck == false) { this.formData.CodsFlagAttiva = 0 }
    else { this.formData.CodsFlagAttiva = 1 }
    this.formData.CodsClienteId = this.formData.ansoSocietaDistaccoid;
    this.inserimentoContrattoService.insertNuovoContratto(this.formData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error("Errore durante l'inserimento del nuovo contratto:", error);
      }
    );
  }

  checkDateTimeValidity(): boolean {
    const startDate = Date.parse(this.formData.CodiDatainiziocontratto);
    const endDate = Date.parse(this.formData.CodiDatafinecontratto);
    if (this.dateinizioTouched && this.datefineTouched) {
      this.checkDateValidity = true;
    }
    if (startDate < endDate) {
      return true;
    }
    return false;
  }

  getContrattoByidContratto(idContratto: number) {
    this.inserimentoContrattoService.getAllContrattiById(idContratto).subscribe(
      (response: any) => {
        console.log(response);
        this.dipendentiConContratto = response;
        console.log(this.dipendentiConContratto);
        this.autoFillformData();         
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }
  
  autoFillformData() {
    //this.getAllTipoLivello();
    this.formData.AnpeCodicefiscale = this.dipendentiConContratto.codiceFiscale;
    this.formData.AnpeNome = this.dipendentiConContratto.nome;
    this.formData.AnpeCognome = this.dipendentiConContratto.cognome;
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendentiConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    }
    for (let i = 0; i < this.tipiContratto?.length; i++) {
      if (this.tipiContratto[i].cotcContratto == this.dipendentiConContratto.tipoContratto) {
        this.formData.codiFkCotctipocontrattoid = this.tipiContratto[i].cotcTipocontrattoid;
        break;
      }
    }
    for (let i = 0; i < this.tipiCcnl?.length; i++) {
      console.log(i);
      if (this.tipiCcnl[i].coccDesc == this.dipendentiConContratto.descrizioneCCNL) {
        this.formData.CoccCcnlid = this.tipiCcnl[i].coccCcnlid;
        this.getAllTipoLivello();
        break;
      }
    }
    //console.log('this.formData.CoccCcnlid:' + this.formData.CoccCcnlid);

    //console.log('lunghezza array tipi livello:' + this.tipiLivello?.length);
    for (let i = 0; i < this.tipiLivello?.length; i++) {
      //console.log('this.tipiLivello[i].coliLivellocontratto:' + this.tipiLivello[i].coliLivellocontratto);
      //console.log('this.dipendentiConContratto.livelloContratto:' + this.dipendentiConContratto.livelloContratto);
      if (this.tipiLivello[i].coliLivellocontratto == this.dipendentiConContratto.livelloContratto) {
        this.formData.ColiLivelloid = this.tipiLivello[i].coliLivelloid;
      }
    }
    // METTO COME RUOLO UN VALORE DI DEFAULT
    this.formData.AnruRuoloid = this.tipiRuolo[0].anruRuoloid.toString();

    this.formData.CodiDatainiziocontratto = this.dipendentiConContratto.codiDatainiziocontratto.split("T")[0],
      this.formData.CodiDatafinecontratto = this.dipendentiConContratto.codiDatafinecontratto.split("T")[0]
    this.formData.CodiRalcompenso = this.dipendentiConContratto.codiRalcompenso,
      this.formData.CodiMonteore = this.dipendentiConContratto.codiMonteore
    if (this.dipendentiConContratto.smartWorking == 0) { this.formData.CodiSmartworking = false; }
    else { this.formData.CodiSmartworking = true }
    // METTO COME COSTO MENSILE E GIORNALIERO UN VALORE DI DEFAULT
    this.formData.costopresuntomese = Number((this.dipendentiConContratto.codiRalcompenso / 13).toFixed(2)),
      this.formData.costopresuntogiorno = Number(((this.dipendentiConContratto.codiRalcompenso / 13) / 26).toFixed(2))
    if (this.dipendentiConContratto.codsFlagAttiva == 0) { this.uncheck = false; }
    else { this.uncheck = true; }
    this.formData.CodsValoredistacco = this.dipendentiConContratto.codsValoredistacco
    for (let i = 0; i < this.tipiSocietaDistacco?.length; i++) {
      if (this.tipiSocietaDistacco[i].ansoRagionesociale == this.dipendentiConContratto.societaDistacco) {
        this.formData.ansoSocietaDistaccoid = this.tipiSocietaDistacco[i].ansoSocietaid;
      }
    }
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendentiConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    }
    this.formData.CodsDatainiziodistacco = this.dipendentiConContratto.codsDatainiziodistacco.split("T")[0],
      this.formData.CodsDatafinedistacco = this.dipendentiConContratto.codsDatafinedistacco.split("T")[0],
      this.formData.CodiNote = this.dipendentiConContratto.codiNote
  }



}
