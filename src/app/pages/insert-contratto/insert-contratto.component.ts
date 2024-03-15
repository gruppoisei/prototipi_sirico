import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Contratto } from '../../dto/request/contratto';
import { InsertContrattoService } from '../../service/insert-contratto.service';


@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss'
})

export class InsertContrattoComponent implements OnInit {

  /*
    myGroup = new FormGroup({
      firstName: new FormControl()
  });
   */

  submitForm() {
    console.log(this.formData);
  }

  checkbox: any;
  uncheck: any;
  disable_fields: any;

  //contratto: Contratto[] = [];
  tipiSocieta: [{ ansoSocietaid: number; ansoRagionesociale: string }] | undefined;
  tipiContratto: [{ cotcTipocontrattoid: number; cotcContratto: string }] | undefined;
  tipiCcnl: [{ coccCcnlid: number; coccDesc: string }] | undefined;
  tipiLivello: [{ coliLivelloid: number; coliLivellocontratto: string }] | undefined;
  tipiRuolo: [{ anruRuoloid: number; anruRuolodesc: string }] | undefined;
  tipiSocietaDistacco: [{ ansoSocietaid: number; ansoRagionesociale: string }] | undefined;

  // DIALOG
  @ViewChild('approvalModal') approvalModal!: TemplateRef<any>;
  //ricercaForm!: FormGroup;
  output_ricercaFiltrata: any;
  dipendentiSenzaContratto: [{
    anpePersonaid: number;
    anpeNome: string;
    anpeCognome: string;
    anpeCodicefiscale: string
  }] | undefined;

  formData: Contratto = {
    AnpeNome: null,
    AnpeCognome: null,
    AnpePersonaid: null,
    AnpeCodicefiscale: null,
    AnsoSocietaid: null,
    CodiDatainiziocontratto: null,
    CodiDatafinecontratto: null,
    CotcTipocontrattoid: null,
    CoccCcnlid: 0,
    ColiLivelloid: null,
    AnruRuoloid: null,
    CodiRalcompenso: null,
    CodiMonteore: null,
    smartworking: null,
    costopresuntoannuo: null,
    costopresuntogiorno: null,
    CodsValoredistacco: null,
    AnsoSocietaDistaccoid: null,
    CodsDatainiziodistacco: null,
    CodsDatafinedistacco: null,
    CodiNote: null,
    CodiSysuser: "Edo"
  };

  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null  
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    //this.getAllTipoLivello(); 
    this.getAllTipoRuolo();
    this.disable_fields = true;
    this.uncheck = false;

    
  }

  /*
   check(uncheck: any) {
     if (uncheck == null) { this.uncheck = true; }
     else if (uncheck == true ) { this.uncheck = false; }
     }
  
     // (onClick = check(uncheck);
  */

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
      AnpeNome: null,
      AnpeCognome: null,
      AnpePersonaid: null,
      AnpeCodicefiscale: null,
      AnsoSocietaid: null,
      CodiDatainiziocontratto: null,
      CodiDatafinecontratto: null,
      CotcTipocontrattoid: null,
      CoccCcnlid: 0,
      ColiLivelloid: null,
      AnruRuoloid: null,
      CodiRalcompenso: null,
      CodiMonteore: null,
      smartworking: false,
      costopresuntoannuo: null,
      costopresuntogiorno: null,
      CodsValoredistacco: null,
      AnsoSocietaDistaccoid: null,
      CodsDatainiziodistacco: null,
      CodsDatafinedistacco: null,
      CodiNote: null,
      CodiSysuser: "Edo"
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
        console.error('Errore durante il recupero dei tipi di contratto:', error);
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
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllTipoRuolo() {
    this.inserimentoContrattoService.getAllTipoRuolo().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiRuolo = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

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
    //this.formDataDialog.reset();
    /*this.formDataDialog = this.fb.group({
      nome: '',
      cognome: '',
      codiceFiscale: ''
    })*/
    this.formDataDialog = {
      nome: null,
      cognome: null,
      codiceFiscale: null
    }
  }

  ricercaFiltrata(name: string, surname: string, cf: string) {
    console.log('1: name:' + name + '; surname:' + surname + '; cf:' + cf);
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





  insertContratto() {

  }




}
