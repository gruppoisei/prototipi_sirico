import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { ricercaContratto } from '../../../dto/request/ricercaContratto';


@Component({
  selector: 'app-gestione-contratto',
  templateUrl: './gestione-contratto.component.html',
  styleUrl: './gestione-contratto.component.scss'
})


export class GestioneContrattoComponent implements OnInit {

  output_ricercaFiltrata: any;

  tipiSocieta!: [{ ansoSocietaid: number; ansoRagionesociale: string }];
  tipiContratto!: [{ cotcTipocontrattoid: number; cotcContratto: string }];
  tipiCcnl!: [{ coccCcnlid: number; coccDesc: string }];
  tipiLivello!: [{ coliLivelloid: number; coliLivellocontratto: string }];
  tipiSocietaDistacco!: [{ ansoSocietaid: number; ansoRagionesociale: string }]
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

  dipendenteConContratto!: {
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
    codiFkCotctipocontrattoid: null;
    codsClienteId: number;
  };


  dipendentiConContratto!: [{
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
    codiFkCotctipocontrattoid: null;
    codsClienteId: number;
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

  formDataSearch = {
    AnpeNome: "",
    AnpeCognome: "",
    AnpeCodicefiscale: "",
    AnsoSocietaid: 0
  }

  constructor(
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllTipoLivello();
  }

  ricercaFiltrata(name: string, surname: string, cf: string, society: number) {  
    console.log(society);
      
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

  modifyContract(idContratto: any) {
    this.inserimentoContrattoService.idContratto$.next(idContratto);
    this.router.navigate(['/nuovo-contratto']);
  }

  deleteContract(idContratto: number) {
    this.getContrattoByidContratto(idContratto);

  }

  getContrattoByidContratto(idContratto: number) {
    console.log('$:' + this.inserimentoContrattoService.idContratto$.value);
    this.inserimentoContrattoService.getAllContrattiById(idContratto).subscribe(
      (response: any) => {
        console.log('response contratto singolo');
        console.log(response);
        this.dipendenteConContratto = response;
        //console.log(this.dipendenteConContratto);
        console.log(this.dipendenteConContratto.codiDatafinecontratto);
        var formattedDate = new Date().toISOString().split('.')[0];
        //console.log(formattedDate);
        this.dipendenteConContratto.codiDatafinecontratto = formattedDate;
        console.log(this.dipendenteConContratto.codiDatafinecontratto);
        //this.autoFillformData();
        this.mappingContratto();
        console.log('formData');
        console.log(this.formData);
        this.insertContratto();
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }

  mappingContratto() {
    this.inserimentoContrattoService.idContratto$.next(this.dipendenteConContratto.codiContrattopersid);
    this.formData.CodiContrattopersid = this.dipendenteConContratto.codiContrattopersid;
    this.formData.AnpeCodicefiscale = this.dipendenteConContratto.codiceFiscale;
    this.formData.AnpeNome = this.dipendenteConContratto.nome;
    this.formData.AnpePersonaid = this.dipendenteConContratto.personaId;
    this.formData.AnpeCognome = this.dipendenteConContratto.cognome;
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendenteConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    };
    for (let i = 0; i < this.tipiContratto?.length; i++) {
      if (this.tipiContratto[i].cotcContratto == this.dipendenteConContratto.tipoContratto) {
        this.formData.codiFkCotctipocontrattoid = this.tipiContratto[i].cotcTipocontrattoid;
        break;
      }
    };
    for (let i = 0; i < this.tipiCcnl?.length; i++) {
      if (this.tipiCcnl[i].coccDesc == this.dipendenteConContratto.descrizioneCCNL) {
        this.formData.CoccCcnlid = this.tipiCcnl[i].coccCcnlid;
        break;
      }
    };

    console.log('lunghezza array tipi livello:' + this.tipiLivello?.length);
    for (let i = 0; i < this.tipiLivello?.length; i++) {
      //console.log('this.tipiLivello[i].coliLivellocontratto:' + this.tipiLivello[i].coliLivellocontratto);
      //console.log('this.dipendentiConContratto.livelloContratto:' + this.dipendentiConContratto.livelloContratto);
      if (this.tipiLivello[i].coliLivellocontratto == this.dipendenteConContratto.livelloContratto) {
        this.formData.ColiLivelloid = this.tipiLivello[i].coliLivelloid;
      }
    };
    // METTO COME RUOLO UN VALORE DI DEFAULT
    this.formData.AnruRuoloid = this.tipiRuolo[0].anruRuoloid.toString();

    this.formData.CodiDatainiziocontratto = this.dipendenteConContratto.codiDatainiziocontratto.split("T")[0];
    this.formData.CodiDatafinecontratto = this.dipendenteConContratto.codiDatafinecontratto.split("T")[0];
    this.formData.CodiRalcompenso = this.dipendenteConContratto.codiRalcompenso;
    this.formData.CodiMonteore = this.dipendenteConContratto.codiMonteore;
    if (this.dipendenteConContratto.smartWorking == 0) { this.formData.CodiSmartworking = false; }
    else { this.formData.CodiSmartworking = true }
    // METTO COME COSTO MENSILE E GIORNALIERO UN VALORE DI DEFAULT
    this.formData.costopresuntomese = Number((this.dipendenteConContratto.codiRalcompenso / 13).toFixed(2));
    this.formData.costopresuntogiorno = Number(((this.dipendenteConContratto.codiRalcompenso / 13) / 26).toFixed(2));
    /*  
    if (this.dipendenteConContratto.codsFlagAttiva == null || this.dipendenteConContratto.codsFlagAttiva == 0) {
      this.uncheck = false; 
    }
    else { this.uncheck = true; }
    */
    this.formData.CodsValoredistacco = this.dipendenteConContratto.codsValoredistacco;
    for (let i = 0; i < this.tipiSocietaDistacco?.length; i++) {
      if (this.tipiSocietaDistacco[i].ansoRagionesociale == this.dipendenteConContratto.societaDistacco) {
        this.formData.ansoSocietaDistaccoid = this.tipiSocietaDistacco[i].ansoSocietaid;
      }
    };
    for (let i = 0; i < this.tipiSocieta?.length; i++) {
      if (this.tipiSocieta[i].ansoRagionesociale == this.dipendenteConContratto.societaPersona) {
        this.formData.AnsoSocietaid = this.tipiSocieta[i].ansoSocietaid.toString();
        break;
      }
    };
    if (this.dipendenteConContratto.codsDatainiziodistacco != null) {
      this.formData.CodsDatainiziodistacco = this.dipendenteConContratto.codsDatainiziodistacco.split("T")[0];
    }
    if (this.dipendenteConContratto.codsDatafinedistacco != null) {
      this.formData.CodsDatafinedistacco = this.dipendenteConContratto.codsDatafinedistacco.split("T")[0];
    }
    this.formData.CodiNote = this.dipendenteConContratto.codiNote;
    console.log('$:' + this.inserimentoContrattoService.idContratto$.value);
    this.formData.CodiFlagAttiva = 1;
    if (this.dipendenteConContratto.codsFlagAttiva == null) {
      this.dipendenteConContratto.codsFlagAttiva = 0;
    }
    else {
      this.formData.CodsFlagAttiva = this.dipendenteConContratto.codsFlagAttiva;
    }

    this.formData.CodsClienteId = this.dipendenteConContratto.codsClienteId;
    //"CodsClienteId": null, "TipoContratto": null, "DescrizioneCCNL": null, "LivelloContratto": null, "SocietaDistacco": "", "SocietaPersona": ""
  }


  insertContratto() {
    console.log('entrato insertContratto()');
    this.inserimentoContrattoService.insertNuovoContratto(this.formData).subscribe(
      (response: any) => {
        console.log('response insertContratto()');
        console.log(response);
        alert(response); 
        this.ricercaFiltrata(this.formDataSearch.AnpeNome, this.formDataSearch.AnpeCognome, this.formDataSearch.AnpeCodicefiscale, this.formDataSearch.AnsoSocietaid)       
      },
      (error: any) => {
        console.error("Errore durante l'aggiornamento del nuovo contratto:", error);
        alert("Errore durante l'aggiornamento del nuovo contratto");
      }
    );
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
        console.log('response get tipi livello:');
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

  resetSearch() {
    this.formDataSearch = {
      AnpeNome: "",
      AnpeCognome: "",
      AnpeCodicefiscale: "",
      AnsoSocietaid: 0
    }
  }

  clearSearch() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.resetSearch();
      //this.reset();
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