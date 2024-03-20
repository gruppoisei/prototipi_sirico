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
  }];

  dipendenteConContratto$!: [{
    //anpePersonaid: number;
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
    
  }
  //static dipendentiConContratto: string;

  constructor(
    //private fb: FormBuilder,
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
        this.dipendenteConContratto$ = response;
        console.log('dipendentiConContratto:' + this.dipendentiConContratto);
        console.log('dipendenteConContratto$:' + this.dipendenteConContratto$);
        /*
        this.inserimentoContrattoService.dipendenteConContratto$.subscribe (prova => 
          {
            prova = response
            console.log("prova_subscribe:" + prova)
          });
        */
        this.output_ricercaFiltrata = true;        
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }
  /*
  ricercaFiltrataPROVA(name: string, surname: string, cf: string, society: string) {
    console.log('ricercaFiltrataPROVA');
    this.inserimentoContrattoService.getAllContrattiByPROVA(name, surname, cf, society);
    console.log('inserimentoContrattoService.dipendenteConContratto$:' + this.inserimentoContrattoService.dipendenteConContratto$);
    this.dipendentiConContratto = this.dipendenteConContratto$;
    //console.log('dipendenteConContrattoSubject:' + this.inserimentoContrattoService.dipendenteConContrattoSubject);
  }
*/
  modifyFields(index: any) {
    console.log('Metodo non ancora implementato. Index:' + index);
    console.log(this.dipendentiConContratto[index]);
    console.log(this.inserimentoContrattoService.dipendenteConContratto$);
    this.router.navigate(['/nuovo-contratto']);//, {myObject: JSON.stringify(this.dipendentiConContratto[index])}]);
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