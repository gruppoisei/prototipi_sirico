import { formatDate } from '@angular/common';
import { Component, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../service/insert-contratto.service';
//import { inserimentoContratto } from '../../dto/response/inserimentoContratto';
import { BehaviorSubject } from 'rxjs';
import { ricercaContratto } from '../../dto/request/ricercaContratto';


@Component({
  selector: 'app-gestione-contratto',
  templateUrl: './gestione-contratto.component.html',
  styleUrl: './gestione-contratto.component.scss'
})


export class GestioneContrattoComponent implements OnInit {

  output_ricercaFiltrata: any;

  dipendentiConContratto!: [{
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
  }];

  formData: ricercaContratto = {
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
    CodiContrattopersid: null,
    TipoContratto: null,
    DescrizioneCCNL: null,
    LivelloContratto: null,
    SocietaDistacco: "",
    SocietaPersona: ""

  }

  idContract: number = 0;

  constructor(
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
      

  }


  ricercaFiltrata(name: string, surname: string, cf: string, society: string) {
    this.inserimentoContrattoService.getAllContrattiBy(name, surname, cf, society).subscribe(
      (response: any) => {
        //console.log(response);
        this.dipendentiConContratto = response;
        this.output_ricercaFiltrata = true;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }
  support_idContratto: number = 0;
  modifyContract(idContratto: any) {
    //console.log('nome: ' + this.dipendentiConContratto[idContratto].nome);
    //console.log('codice fiscale: ' + this.dipendentiConContratto[idContratto].codiceFiscale);
    //console.log('idContratto come parametro:' + idContratto);
    this.idContract = idContratto
    this.support_idContratto = this.inserimentoContrattoService.toggleidContratto2(idContratto);
    console.log('support_idContratto:' + this.support_idContratto);
    console.log('idContratto$ in modifyContract(idContratto):' + this.inserimentoContrattoService.idContratto$.value);
    //console.log('idContratto$:' + this.inserimentoContrattoService.idContratto$);
    //console.log('idContratto:' + this.inserimentoContrattoService.idContratto);

    /*
    .subscribe( () => {
      this.conto$.next({
        name: "Massimo",
        surname: "Nicolardi",
        balance: 200000,
        iban: "IT67678ew78wewe"
      });
  })
  */
    //this.inserimentoContrattoService.toggleidContratto(idContratto);
    this.router.navigate(['/nuovo-contratto', idContratto]);
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

      CodiContrattopersid: null,
      TipoContratto: null,
      DescrizioneCCNL: null,
      LivelloContratto: null,
      SocietaDistacco: "",
      SocietaPersona: ""

    };
  }

  clearSearch() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.reset();
    }
    else {
      console.log('Operazione annullata');
    }
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/homepage']);
  }

}