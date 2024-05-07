import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CronologiaDistaccoComponent } from '../cronologia-distacco/cronologia-distacco.component';

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

  formDataSearch = {
    anpeNome: null,
    anpeCognome: null,
    anpeCodicefiscale: null,
    ansoSocietaid: null
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
      Sysuser: 'Frontend',
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

  ngOnInit(): void { }

  ricercaFiltrata(name: string | null, surname: string | null, cf: string | null, society: number | null) {
    console.log(society);

    this.inserimentoContrattoService.getAllContrattiBy(name, surname, cf, society).subscribe(
      (response: any) => {
        console.log(response);
        response.forEach((persona: any) => {
          persona.nome = this.troncaNome(persona.nome, 10);
          persona.cognome = this.troncaNome(persona.cognome, 10);
          //console.log(persona.nome, persona.cognome);
          this.dipendentiConContratto.push(persona);
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

  deleteContract(idContratto: number) {
    this.getContrattoByidContratto(idContratto);
  }

  getContrattoByidContratto(idContratto: number) {
    console.log('$:' + this.inserimentoContrattoService.idContratto$.value);
    this.inserimentoContrattoService.getContrattiById(idContratto).subscribe(
      (response: any) => {
        this.formData = response;
        var formattedDate = new Date().toISOString().split('.')[0];
        this.formData.value.codiDatafinecontratto = formattedDate;
        console.log('formData');
        console.log(this.formData);
        this.insertContratto();
      },
      (error: any) => {
        console.error('Errore durante il recupero del contratto:', error);
      }
    );
  }

  troncaNome(nome: string, lunghezzaMassima: number): string {
    if (nome.length > (lunghezzaMassima + 2)) {
      //console.log("qui: ", nome.length);
      return nome.substring(0, lunghezzaMassima) + '...';
    }
    return nome;
  }

  insertContratto() {
    console.log('entrato insertContratto()');
    this.inserimentoContrattoService.insertNuovoContratto(this.formData.value).subscribe(
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