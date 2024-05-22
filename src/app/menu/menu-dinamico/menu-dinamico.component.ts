import { Component, Input } from '@angular/core';
import { AmministrazioneRuoloService } from '../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';
import { Funzione, ProvassComponent } from '../../pages/ruolo-utente/insert-ruolo-utente/provass/provass.component';
import { Router } from '@angular/router';
import { CalendarioComponent } from '../../pages/rapportino/calendario/calendario.component';
import { RichiestaAssenzaSegreteriaComponent } from '../../pages/assenza/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { RichiestaAssenzaUtenteComponent } from '../../pages/assenza/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { DipendentiCommessaComponent } from '../../pages/commessa-box/dipendenti-commessa/dipendenti-commessa.component';
import { SalvaCommessaComponent } from '../../pages/commessa-box/salva-commessa/salva-commessa.component';
import { GestioneClienteComponent } from '../../pages/contratto/gestione-cliente/gestione-cliente.component';
import { GestioneContrattoComponent } from '../../pages/contratto/gestione-contratto/gestione-contratto.component';
import { GestioneDipendenteComponent } from '../../pages/gestione-dipendente/gestione-dipendente.component';
import { GestioneRuoloComponent } from '../../pages/ruolo-utente/gestione-ruolo-funzione/gestione-ruolo.component';
import { GestioneRuoloUtenteComponent } from '../../pages/ruolo-utente/gestione-ruolo-utente/gestione-ruolo-utente.component';
import { UtilityCostiPersonaleComponent } from '../../pages/utility-costi-personale/utility-costi-personale.component';
import { InsertContrattoComponent } from '../../pages/contratto/insert-contratto/insert-contratto.component';
import { InsertRuoloUtenteComponent } from '../../pages/ruolo-utente/insert-ruolo-utente/insert-ruolo-utente.component';
import { InsertPersonaComponent } from '../../pages/insert-persona/insert-persona.component';
import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { InsertClienteComponent } from '../../pages/contratto/insert-cliente/insert-cliente.component';

@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrl: './menu-dinamico.component.scss'
})
export class MenuDinamicoComponent {

  homePagePath = "";

  limiteVociMenu: number = 0;

  // idRuolo: number = 5;
  idRuolo: number = 2010;



  // lista di partenza
  listaFunzioniComponenti: any[] = [];

  // liste intermedie
  listaFunzioniPadre: any[] = [];
  listaFunzioniNonPadre: any[] = [];
  // listaFunzioniChildren: { path: string, component: string }[] = []
  listaFunzioniChildren: any[] = []

  // liste finali distinte
  listaFunzioniAutonome: any[] = []
  //listaFunzioniAutonome: { path: string, component: string }[] = []
  listaFunzioniPadreConFigli: { path: string, children: { path: string, component: string }[] }[] = []

  // lista finale
  listaSupportoOrdinamentoFunzioniAutonome: any[] = []
  // listaSupportoOrdinamentoFunzioniAutonome: { path: string, component: string }[] = []
  listaFunzioniFinaleMenu: any[] = []

  // lista di supporto al caricamento dei componenti associati, quelli non raggiungibili direttamente ma vincolati ad altri
  //componentiAssociati: number[] = [];
  pathPadreEFunzionalitaAssociata: { pathPadre: string, funzionalitaAssociata: number }[] = [];
  listaCaricamentoComponentiAssociati: any[] = [];


  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService, private router: Router
  ) {

  }

  listaComponenti = [
    {
      idComponente: 0,
      component: HomepageComponent,
    },
    {
      idComponente: 1,
      component: CalendarioComponent,
    },
    {
      idComponente: 2,
      component: RichiestaAssenzaUtenteComponent,
    },
    {
      idComponente: 3,
      component: GestioneContrattoComponent,
    },
    {
      idComponente: 4,
      component: GestioneRuoloComponent,
    },
    {
      idComponente: 5,
      component: GestioneDipendenteComponent,
    },
    {
      idComponente: 6,
      component: GestioneClienteComponent,
    },
    {
      idComponente: 7,
      component: GestioneRuoloUtenteComponent,
    },
    {
      idComponente: 8,
      component: RichiestaAssenzaSegreteriaComponent,
    },
    {
      idComponente: 9,
      component: UtilityCostiPersonaleComponent,
    },
    {
      idComponente: 10,
      component: SalvaCommessaComponent,
    },
    {
      idComponente: 11,
      component: DipendentiCommessaComponent,
    },
    {
      idComponente: 12,
      component: ProvassComponent,
    },
    {
      idComponente: 13,
      component: InsertContrattoComponent,
    },
    {
      idComponente: 14,
      component: InsertPersonaComponent,
    },
    {
      idComponente: 15,
      component: InsertRuoloUtenteComponent,
    },
    {
      idComponente: 17,
      component: InsertClienteComponent,
    }
  ]


  async getFunzioniComponenti() {
    this.listaFunzioniComponenti = await firstValueFrom(
      this.amministrazioneRuolo.GetAllFunzioniComponenteByIdRuolo(this.idRuolo)
    );

    this.listaFunzioniComponenti.sort((a, b) => a.indicemenu > b.indicemenu ? 1 : -1);

    console.log("this.listaFunzioniComponenti ordinata");
    console.log(this.listaFunzioniComponenti);

    // resetto il contenuto dell'array menu finale
    this.listaFunzioniFinaleMenu = [];

    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      // verifico se hanno una funzionalita associata
      if (this.listaFunzioniComponenti[i].funzionalitaAssociata != null) {
        //this.componentiAssociati.push(this.listaFunzioniComponenti[i].funzionalitaAssociata);
        this.pathPadreEFunzionalitaAssociata.push({
          pathPadre: this.listaFunzioniComponenti[i].aliasComponente,
          funzionalitaAssociata: this.listaFunzioniComponenti[i].funzionalitaAssociata
        });
      }
      
      // verifico se appartengono alla voce di menu o no
      if (this.listaFunzioniComponenti[i].menu == true) {
        this.listaFunzioniPadre.push(this.listaFunzioniComponenti[i]);
      }
      else if (this.listaFunzioniComponenti[i].menu == false) {
        this.listaFunzioniNonPadre.push(this.listaFunzioniComponenti[i]);
      }
    }

    // caso figli senza padre (funzioni autonome)
    for (let i = 0; i < this.listaFunzioniNonPadre.length; i++) {

      if (this.listaFunzioniNonPadre[i].menuPadre == 0) {
        let newEl = {
          path: this.listaFunzioniNonPadre[i].aliasComponente,
          component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniNonPadre[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        }
        this.listaFunzioniAutonome.push(newEl)
      }

    }

    // caso padre con figli o padre senza figli
    for (let i = 0; i < this.listaFunzioniPadre.length; i++) {

      var check = false;

      for (let l = 0; l < this.listaFunzioniNonPadre.length; l++) {

        if (this.listaFunzioniPadre[i].fkFunzioniId == this.listaFunzioniNonPadre[l].menuPadre) {
          let newEl = {
            path: this.listaFunzioniNonPadre[l].aliasComponente,
            component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniNonPadre[l].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
          }
          this.listaFunzioniChildren.push(newEl);
          check = true;
        }
      }

      // caso padre con figli
      if (check == true) {
        this.listaFunzioniPadreConFigli.push({
          path: this.listaFunzioniPadre[i].aliasComponente,
          children: this.listaFunzioniChildren
        })
        check = false;
        this.listaFunzioniChildren = []
      }

      // caso padre senza figli (funzione autonoma)
      else if (check == false) {
        let newEl = {
          path: this.listaFunzioniPadre[i].aliasComponente,
          component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniPadre[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        }
        this.listaFunzioniAutonome.push(newEl)
        check = false;
      }

    }

    // ordino l'array
    this.sortArray();

    // aggiungo le funzioni autonome (flag voce menu = false, indice menu = 0)
    for (let i = 0; i < this.listaSupportoOrdinamentoFunzioniAutonome.length; i++) {

      let newEl = {
        path: this.listaSupportoOrdinamentoFunzioniAutonome[i].path,
        component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaSupportoOrdinamentoFunzioniAutonome[i].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);

    }

    // limito la stampa delle voci di menu escludendo i componenti associati
    // e tenendo conto del componente aggiuntivo home, impostato dopo di default (length + 1)
    this.limiteVociMenu = this.listaFunzioniFinaleMenu.length + 1;

    // recupero componenti associati
    // for (let i = 0; i < this.componentiAssociati.length; i++) {
    for (let i = 0; i < this.pathPadreEFunzionalitaAssociata.length; i++) {

      //const response = await this.amministrazioneRuolo.getComponenteByFunzionalitaAssociata(this.componentiAssociati[i]).toPromise();
      var response = await this.amministrazioneRuolo.getComponenteByFunzionalitaAssociata(this.pathPadreEFunzionalitaAssociata[i].funzionalitaAssociata).toPromise();
      response.pathDescrizione = this.pathPadreEFunzionalitaAssociata[i].pathPadre + '/' + response.pathDescrizione
      //this.listaCaricamentoComponentiAssociati.push(response);
      this.listaCaricamentoComponentiAssociati.push(response);
    }

    console.log("this.listaCaricamentoComponentiAssociati");
    console.log(this.listaCaricamentoComponentiAssociati);

    // verifico se i componenti associati sono associati a una voce di sottomenu e in quel caso mappo il padre

    console.log("this.listaFunzioniFinaleMenu");
    console.log(this.listaFunzioniFinaleMenu);

    // inserisco i componenti associati alla fine della lista funzioni finale menu
    for (let i = 0; i < this.listaCaricamentoComponentiAssociati.length; i++) {
      
      for (let l = 0; l < this.listaFunzioniFinaleMenu.length; l++)
      
        if (this.listaFunzioniFinaleMenu[l]['children']) {

          for (let j = 0; j < this.listaFunzioniFinaleMenu[l].children.length; j++) {
            
            if (this.listaFunzioniFinaleMenu[l].children[j].path == this.listaCaricamentoComponentiAssociati[i].pathDescrizione.split('/')[0]) {
                            
              this.listaCaricamentoComponentiAssociati[i].pathDescrizione = this.listaFunzioniFinaleMenu[l].path+'/'+this.listaCaricamentoComponentiAssociati[i].pathDescrizione
            }

          }          
        }

      
      let newEl = {
        path: this.listaCaricamentoComponentiAssociati[i].pathDescrizione,
        component: this.listaComponenti.find(componente => componente.idComponente == this.listaCaricamentoComponentiAssociati[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);
    }

    // inserisco il componente HOME come primo elemento della lista per il logo del menù come voce di default
    this.listaFunzioniFinaleMenu.unshift({
      path: this.homePagePath,
      component: this.listaComponenti.find(funzione => funzione.idComponente == 0)?.component
    });

    console.log("this.listaFunzioniFinaleMenu");
    console.log(this.listaFunzioniFinaleMenu);

    // creo la nuova route
    this.router.resetConfig(this.listaFunzioniFinaleMenu);

    console.log("this.router");
    console.log(this.router);
  }


  sortArray() {

    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      if (this.listaFunzioniComponenti[i].indicemenu != 0) {

        // ciclo this.listaFunzioniPadreConFigli e verifico se presente;
        for (let l = 0; l < this.listaFunzioniPadreConFigli.length; l++) {

          if (this.listaFunzioniComponenti[i].aliasComponente == this.listaFunzioniPadreConFigli[l].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniPadreConFigli[l]);
            break;
          }

        }

        // ciclo this.listaFunzioniAutonome e verifico se presente
        for (let l = 0; l < this.listaFunzioniAutonome.length; l++) {

          if (this.listaFunzioniComponenti[i].aliasComponente == this.listaFunzioniAutonome[l].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniAutonome[l]);
            break;
          }

        }

      }
      else {

        for (let l = 0; l < this.listaFunzioniAutonome.length; l++) {

          if (this.listaFunzioniComponenti[i].aliasComponente == this.listaFunzioniAutonome[l].path) {
            let newEl = {
              path: this.listaFunzioniAutonome[l].path,
              component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaFunzioniAutonome[l].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
            }
            this.listaSupportoOrdinamentoFunzioniAutonome.push(newEl);
            break;
          }

        }

      }

    }

  }


  routerPrint() {
    console.log('router:');
    console.log(this.router);
  }



}

