import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { inserimentoContratto } from '../../../dto/response/inserimentoContratto';


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

  formData: inserimentoContratto = {
    anpeNome: '',
    anpeCognome: '',
    anpePersonaid: null,
    anpeCodicefiscale: '',
    anpePartitaiva: '',
    ansoSocietaid: null,
    codiDatainiziocontratto: '', //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    codiDatafinecontratto: null, //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
    cotctipocontrattoid: null,
    tipoContratto: null,
    coccCcnlid: 0,
    descrizioneCCNL: null,
    coliLivelloid: null,
    livelloContratto: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiSmartworking: null,
    codsValoredistacco: null,
    codsDatainiziodistacco: null,
    codsDatafinedistacco: null,
    codiNote: null,
    codiSysuser: 'Frontend',
    codiFlagAttiva: 1,
    codsFlagAttiva: 0,
    codsClienteId: null,
    societaDistacco: null,
    societaPersona: null,
    codiContrattopersid: null,
    codiFkCossVisitamedica: null,
    durataValiditaVisitaMedica: null,
    codiFkCossCorsosicurezza1: null,
    durataValiditaCorsoSicurezza1: null,
    codiFkCossCorsosicurezza2: null,
    durataValiditaCorsoSicurezza2: null,
    codiFkComlIdmotivazione: null,
  }

  formDataSearch = {
    anpeNome: null,
    anpeCognome: null,
    anpeCodicefiscale: null,
    ansoSocietaid: null
  }

  constructor(
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    /*
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    this.getAllTipoLivello();
    */
  }

  ricercaFiltrata(name: string | null, surname: string | null, cf: string | null, society: number | null) {
    console.log(society);

    this.inserimentoContrattoService.getAllContrattiBy(name, surname, cf, society).subscribe(
      (response: any) => {
        console.log(response);
        this.dipendentiConContratto = response;
        console.log(JSON.stringify(this.dipendentiConContratto));
        this.output_ricercaFiltrata = true;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  modifyContract(idContratto: any) {
    this.inserimentoContrattoService.idContratto$.next(idContratto);
    this.inserimentoContrattoService.isContrattoPassato = idContratto;
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
        this.formData = response;
        console.log(this.formData.codiDatafinecontratto);
        var formattedDate = new Date().toISOString().split('.')[0];
        this.formData.codiDatafinecontratto = formattedDate;
        console.log(this.dipendenteConContratto.codiDatafinecontratto);
        console.log('formData');
        console.log(this.formData);
        this.insertContratto();
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }

/*
  mappingContratto() {
    if (this.dipendentiConContratto == null) {
    } else {
      console.log(
        'importo contratto con id :' +
          this.dipendentiConContratto.codiContrattopersid
      );
      this.formData.codiContrattopersid = this.dipendentiConContratto.codiContrattopersid;
      this.formData.anpeCodicefiscale = this.dipendentiConContratto.anpeCodicefiscale;
      this.formData.anpeNome = this.dipendentiConContratto.anpeNome;
      this.formData.anpePersonaid = this.dipendentiConContratto.anpePersonaid;
      this.formData.anpeCognome = this.dipendentiConContratto.anpeCognome;
      this.formData.anpePartitaiva = this.dipendentiConContratto.anpePartitaiva;
      this.formData.codiDatainiziocontratto = this.dipendentiConContratto.codiDatainiziocontratto.split('T')[0];
      this.formData.codiDatafinecontratto = this.formData.codiDatafinecontratto != null ? this.formData.codiDatafinecontratto : null;
      this.formData.codiRalcompenso = this.dipendentiConContratto.codiRalcompenso;
      this.formData.codiMonteore = this.dipendentiConContratto.codiMonteore;
      this.formData.codiSmartworking = this.dipendentiConContratto.codiSmartworking == null ? false : true;
      this.formData.codsFlagAttiva = this.dipendentiConContratto.codsFlagAttiva;
      this.formData.codsValoredistacco = this.dipendentiConContratto.codsValoredistacco;
      this.formData.codsDatainiziodistacco = this.dipendentiConContratto.codsDatainiziodistacco != null ? this.dipendentiConContratto.codsDatainiziodistacco.split('T')[0] : null;
      this.formData.codsDatafinedistacco = this.dipendentiConContratto.codsDatafinedistacco != null ? this.dipendentiConContratto.codsDatafinedistacco.split('T')[0] : null;
      this.formData.codiNote = this.dipendentiConContratto.codiNote;
      const indicesocieta = this.tipiSocieta?.findIndex( (societa) => societa.ansoRagionesociale === (this.dipendentiConContratto?.societaPersona ?? ''));
      const indicemotivaz = this.tipiMotiviFinecontratto?.findIndex((Motivi) => Motivi.descMotivo === (this.dipendentiConContratto?.codiFkComlIdmotivazione ?? ''));
      this.formData.ansoSocietaid = indicesocieta !== -1 ? this.tipiSocieta[indicesocieta].ansoSocietaid.toString() : this.formData.ansoSocietaid;
      const indicetipocontratto = this.tipiContratto?.findIndex( (contratto) => contratto.cotcContratto === (this.dipendentiConContratto?.tipoContratto ?? '') );
      this.formData.cotctipocontrattoid = indicetipocontratto !== -1 ? this.tipiContratto[indicetipocontratto].cotcTipocontrattoid : this.formData.cotctipocontrattoid;
      const indiceccnl = this.tipiCcnl?.findIndex((ccnl) => ccnl.coccDesc === (this.dipendentiConContratto?.descrizioneCCNL ?? ''));
      this.formData.coccCcnlid = indiceccnl !== -1 ? this.tipiCcnl[indiceccnl].coccCcnlid : this.formData.coccCcnlid;
      const indicecliente = this.tipiClientiDistacco?.findIndex((societa) => societa.ragionesociale === (this.dipendentiConContratto?.societaPersona ?? ''));
      this.formData.ansoSocietaid = indicecliente !== -1 ? this.tipiSocieta[indicecliente].ansoSocietaid.toString() : this.formData.ansoSocietaid;
    }
  }
*/

  insertContratto() {
    console.log('entrato insertContratto()');
    this.inserimentoContrattoService.insertNuovoContratto(this.formData).subscribe(
      (response: any) => {
        console.log('response insertContratto()');
        console.log(response);
        alert(response);
        this.ricercaFiltrata(this.formDataSearch.anpeNome, this.formDataSearch.anpeCognome, this.formDataSearch.anpeCodicefiscale, this.formDataSearch.ansoSocietaid)
      },
      (error: any) => {
        console.error("Errore durante l'aggiornamento del nuovo contratto:", error);
        alert("Errore durante l'aggiornamento del nuovo contratto");
      }
    );
  }

  /*
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
    this.inserimentoContrattoService.getAllTipoLivello(this.formData.coccCcnlid).subscribe(
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
  */

  reset() {
    this.formData = {
      anpeNome: '',
      anpeCognome: '',
      anpePersonaid: null,
      anpeCodicefiscale: '',
      anpePartitaiva: '',
      ansoSocietaid: null,
      codiDatainiziocontratto: '', //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      codiDatafinecontratto: null, //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      cotctipocontrattoid: null,
      tipoContratto: null,
      coccCcnlid: 0,
      descrizioneCCNL: null,
      coliLivelloid: null,
      livelloContratto: null,
      codiRalcompenso: null,
      codiMonteore: null,
      codiSmartworking: null,
      codsValoredistacco: null,
      codsDatainiziodistacco: null,
      codsDatafinedistacco: null,
      codiNote: null,
      codiSysuser: 'Frontend',
      codiFlagAttiva: 1,
      codsFlagAttiva: 0,
      codsClienteId: null,
      societaDistacco: null,
      societaPersona: null,
      codiContrattopersid: null,
      codiFkCossVisitamedica: null,
      durataValiditaVisitaMedica: null,
      codiFkCossCorsosicurezza1: null,
      durataValiditaCorsoSicurezza1: null,
      codiFkCossCorsosicurezza2: null,
      durataValiditaCorsoSicurezza2: null,
      codiFkComlIdmotivazione: null,
    };
  }

  resetSearch() {
    this.formDataSearch = {
      anpeNome: null,
      anpeCognome: null,
      anpeCodicefiscale: null,
      ansoSocietaid: null
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