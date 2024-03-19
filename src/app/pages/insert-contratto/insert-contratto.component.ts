import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Contratto } from '../../dto/request/contratto';
import { InsertContrattoService } from '../../service/insert-contratto.service';
import { GestioneContrattoComponent } from '../gestione-contratto/gestione-contratto.component';


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

  tipiSocieta: [{ ansoSocietaid: number; ansoRagionesociale: string }] | undefined;
  tipiContratto: [{ cotcTipocontrattoid: number; cotcContratto: string }] | undefined;
  tipiCcnl: [{ coccCcnlid: number; coccDesc: string }] | undefined;
  tipiLivello: [{ coliLivelloid: number; coliLivellocontratto: string }] | undefined;
  tipiRuolo: [{ anruRuoloid: number; anruRuolodesc: string }] | undefined;
  tipiSocietaDistacco: [{ ansoSocietaid: number; ansoRagionesociale: string }] | undefined;

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  output_ricercaFiltrata: any;

  dipendentiSenzaContratto!: [{
    anpePersonaid: number;
    anpeNome: string;
    anpeCognome: string;
    anpeCodicefiscale: string;
  }];

  formData: Contratto = {
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
    costopresuntoannuo: null,
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
    CodiContrattopersid: null,
    TipoContratto: null,
    DescrizioneCCNL: null,
    LivelloContratto: null,
    SocietaDistacco: "",
    SocietaPersona: ""
  };

  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null
  }
  activeRoute: any;
  
  gestioneContratto: any;

  constructor(
    //private fb: FormBuilder,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    /*this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();*/
    //this.getAllTipoRuolo();
    this.disable_fields = true;
    this.uncheck = false;
    this.dipendentiSenzaContratto;
    //this.dipendentiConContratto;
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
      costopresuntoannuo: null,
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
      CodiContrattopersid: null,
      TipoContratto: null,
      DescrizioneCCNL: null,
      LivelloContratto: null,
      SocietaDistacco: "",
      SocietaPersona: ""
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
    //console.log(this.formData);
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
      console.log("entrato");
      return true;
    }
    return false;
  }

  prova() {
    console.log("PROVA:" + this.gestioneContratto.dipendentiConContratto);
  }

}
