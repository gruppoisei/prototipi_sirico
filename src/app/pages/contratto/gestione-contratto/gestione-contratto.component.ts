import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CronologiaDistaccoComponent } from '../cronologia-distacco/cronologia-distacco.component';
import { InserimentoContratto } from '../../../dto/response/inserimentoContratto';

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
  dipendentiConContratto: any[] = [];
  formData: FormGroup;
  utenteLoggato: string | null = '';

  formDataSearch = {
    anpeNome: null,
    anpeCognome: null,
    anpeCodicefiscale: null,
    ansoSocietaid: null
  }

  formDataContrattoCancellare: InserimentoContratto = {
    codiContrattopersid: null,
    codiRalcompenso: null,
    codiMonteore: null,
    codiDatainiziocontratto: null,
    codiDatafinecontratto: null,
    codiSmartworking: null,
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
    sysuser: "frontend"
  }

  constructor(
    private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) { 
    this.formData = builder.group({
      Nome: ['',Validators.minLength(1)],
      Cognome: ['',Validators.minLength(1)],
      Personaid: null,
      Codicefiscale: '',
      Partitaiva: '',
      Societaid: null,
      Datainiziocontratto: '',    //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      Datafinecontratto: null,    //formatDate(new Date(), 'yyyy/MM/dd', 'en').toString(),
      tipocontrattoid: null,
      Contratto: null,
      CCNLid: 0,
      CCNLdesc: null,
      Livelloid: null,
      livellodesc: null,
      Ralcompenso: null,
      Monteore: null,
      Smartworking: null,
      Valoredistacco: null,
      Datainiziodistacco: null,
      Datafinedistacco: null,
      Note: null,
      Sysuser: '',
      codiFlagAttiva: 1,
      codsFlagAttiva: 0,
      ClienteId: null,
      societaDistacco: null,
      societaPersona: null,
      Contrattopersid: null,
      motivazioneid: null,
      motivazionedesc: null,
    }); 
  }

  ngOnInit(): void { 
    this.utenteLoggato = sessionStorage.getItem('SysUser');
  }

  ricercaFiltrata(name: string | null, surname: string | null, cf: string | null, society: number | null) {
    console.log(society);

    this.inserimentoContrattoService.getAllContrattiBy(name, surname, cf, society).subscribe(
      (response: any) => {
        console.log(response);
        response.forEach((persona: any) => {
          persona.nome = this.troncaNome(persona.nome, 10);
          persona.cognome = this.troncaNome(persona.cognome, 10);
          //console.log(persona.nome, persona.cognome);
          this.dipendentiConContratto = response;
          //this.dipendentiConContratto.push(persona);
        });

        //console.log(JSON.stringify(this.dipendentiConContratto));
        this.output_ricercaFiltrata = true;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  modifyContract(idContratto: any) {
    this.inserimentoContrattoService.idContratto$.next(idContratto);
    this.router.navigate(['/Segreteria/insert-contratto']);
  }

  async deleteContract(idContratto: number) {
    console.log("inizio cancella contratto per contratto id = " + idContratto)
    await this.getContrattoByidContratto(idContratto);
    const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(this.formDataContrattoCancellare.ccnlid).toPromise();      
    this.tipiLivello = livelli;
    console.log(this.tipiLivello);
    //console.log(JSON.stringify(this.formDataContrattoCancellare));
    this.formDataContrattoCancellare.sysuser = this.utenteLoggato;
    this.formDataContrattoCancellare.codiFlagAttiva = 0;
    this.formDataContrattoCancellare.codsFlagAttiva = 0;

    console.log(JSON.stringify(this.formDataContrattoCancellare));
    //debugger;
    this.inserimentoContrattoService.deleteContratto(this.formDataContrattoCancellare).subscribe(
      (response: any) => {
        console.log('response:');
        console.log(response);
        alert(response);
        this.ricercaFiltrata(null, null, null, null);
      },
      (error: any) => {
        alert("Errore durante la chiusura del contratto (errore di frontend)");
      }); 
  }

  async getContrattoByidContratto(idContratto: number) {
    try {
      this.inserimentoContrattoService.idContratto$.next(idContratto);
      const response = await this.inserimentoContrattoService.getContrattiById(idContratto).toPromise();  
      //
      // const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(response.ccnlid).toPromise();      
      // this.tipiLivello = livelli;
      //
      this.formDataContrattoCancellare = response;      
      //console.log(JSON.stringify(response));
      console.log(this.formDataContrattoCancellare);
      this.formData = response
      //
      this.formDataContrattoCancellare.codiContrattopersid = response.codiContrattopersid;
      console.log('this.formData.codiContrattopersid');
      console.log(this.formDataContrattoCancellare.codiContrattopersid);
      //
      console.log("Contratto caricato:", response);
      return true;
    } catch (error) {
      console.error("Errore nell'apertura di un contratto:", error);
      return false;
    }
  }

  troncaNome(nome: string, lunghezzaMassima: number): string {
    if (nome.length > (lunghezzaMassima + 2)) {
      //console.log("qui: ", nome.length);
      return nome.substring(0, lunghezzaMassima) + '...';
    }
    return nome;
  }

  // insertContratto() {
  //   console.log('entrato insertContratto()');
  //   this.inserimentoContrattoService.insertNuovoContratto(this.formData.value).subscribe(
  //     (response: any) => {
  //       console.log('response insertContratto()');
  //       console.log(response);
  //       alert(response);
  //       this.ricercaFiltrata(this.formDataSearch.anpeNome, this.formDataSearch.anpeCognome, this.formDataSearch.anpeCodicefiscale, this.formDataSearch.ansoSocietaid)
  //     },
  //     (error: any) => {
  //       console.error("Errore durante l'aggiornamento del nuovo contratto:", error);
  //       alert("Errore durante l'aggiornamento del nuovo contratto");
  //     }
  //   );
  // }

  openCronologiaDistaccoModal(personaId: number, nomePersona: string, cognomePersona: string) {
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi = personaId;
    this.inserimentoContrattoService.nomePersonaCronologiaDistacchi = nomePersona;
    this.inserimentoContrattoService.cognomePersonaCronologiaDistacchi = cognomePersona;
    const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
      width: '75%',
      height: '80%',
    });
  }

  reset() {
    this.formData.reset();
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
      this.reset();
    }
    else {
      console.log('Operazione annullata');
    }
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['']);
  }
}