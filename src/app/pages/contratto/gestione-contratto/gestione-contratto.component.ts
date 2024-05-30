import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CronologiaDistaccoComponent } from '../cronologia-distacco/cronologia-distacco.component';
import { InserimentoContratto } from '../../../dto/response/inserimentoContratto';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { InsertContrattoComponent } from '../insert-contratto/insert-contratto.component';
import { AppComponent } from '../../../app.component';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-gestione-contratto',
  templateUrl: './gestione-contratto.component.html',
  styleUrl: './gestione-contratto.component.scss'
})

export class GestioneContrattoComponent implements OnInit {

  // EREDITARE
  //currentAlias: string = "";
  //finalPath: any;
  //componenteAssociato: any = "";
  //componenteMappato: any = "";

  //listaComponenti = [{ idComponente: 13, component: InsertContrattoComponent }]
  //

  output_ricercaFiltrata: any;

  tipiSocieta: { societaid: number; ragionesociale: string }[] = [];
  tipiLivello: { livelloid: number; livelloContratto: string; }[] = [];
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
    public menuDinamicoService: MenuDinamicoService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {
    this.formData = builder.group({
      Nome: ['', Validators.minLength(1)],
      Cognome: ['', Validators.minLength(1)],
      nomeTroncato: '',
      cognomeTroncato: '',
      Personaid: null,
      Codicefiscale: '',
      Partitaiva: '',
      Societaid: null,
      Datainiziocontratto: '',
      Datafinecontratto: null,
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
    this.getAllSocieta();

    this.menuDinamicoService.loadComponentAssociato();

    // fill listaRuoloFunzioni nell'homepage.component, chiamato subito dopo il login
    // console.log(this.menuDinamicoService.listaRuoloFunzioni);
    this.menuDinamicoService.getPermissionFlag();
    // console.log(this.menuDinamicoService.funzione);

    /*
        this.menuDinamico.caricaComponenteAssociato().then((data) => {
          this.finalPath = data;
          console.log("this.finalPath");
          console.log(this.finalPath);
        })
          .catch((ex) => {
            console.log(ex);
          });*/
  }

  ricercaFiltrata(name: string | null, surname: string | null, cf: string | null, society: number | null) {

    this.inserimentoContrattoService.getAllContrattiBy(name, surname, cf, society).subscribe(
      (response: any) => {
        response.forEach((persona: any) => {
          persona.nomeTroncato = this.troncaNome(persona.nome, 10);
          persona.cognomeTroncato = this.troncaNome(persona.cognome, 10);
          this.dipendentiConContratto = response;
        });

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
    await this.getContrattoByidContratto(idContratto);
    const livelli = await this.inserimentoContrattoService.getAllTipoLivelloByCCNL(this.formDataContrattoCancellare.ccnlid).toPromise();
    this.tipiLivello = livelli;
    this.formDataContrattoCancellare.sysuser = this.utenteLoggato;
    this.formDataContrattoCancellare.codiFlagAttiva = 0;
    this.formDataContrattoCancellare.codsFlagAttiva = 0;

    this.inserimentoContrattoService.deleteContratto(this.formDataContrattoCancellare).subscribe(
      (response: any) => {
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
      this.formDataContrattoCancellare = response;
      this.formData = response
      this.formDataContrattoCancellare.codiContrattopersid = response.codiContrattopersid;
      return true;
    } catch (error) {
      console.error("Errore nell'apertura di un contratto:", error);
      return false;
    }
  }

  getAllSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
        this.tipiSocieta = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di societa:', error);
      }
    );
  }

  troncaNome(nome: string, lunghezzaMassima: number): string {
    if (nome.length > (lunghezzaMassima + 2)) {
      return nome.substring(0, lunghezzaMassima) + '...';
    }
    return nome;
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
  }

  closeForm() {
    // if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
    // this.router.navigate(['/Home']);
    this.router.navigate([""]);
  }
}