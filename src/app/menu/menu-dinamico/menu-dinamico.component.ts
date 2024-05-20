import { Component } from '@angular/core';
import { AmministrazioneRuoloService } from '../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';
import { Funzione } from '../../pages/ruolo-utente/insert-ruolo-utente/provass/provass.component';
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

@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrl: './menu-dinamico.component.scss'
})
export class MenuDinamicoComponent {



  idRuolo: number = 5;

  // lista originale
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


  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService, private router: Router
  ) {

  }

  listaComponenti = [
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
      component: GestioneRuoloUtenteComponent,
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
    }
  ]

  db = [
    {
      path: "Segreteria",
      children: [
        {
          path: "Home",
          component: 0,
        },
        {
          path: "Prodotto",
          component: 1,
        },
      ]
    }
  ]

  async getFunzioniComponenti() {
    this.listaFunzioniComponenti = await firstValueFrom(
      this.amministrazioneRuolo.GetAllFunzioniComponenteByIdRuolo(this.idRuolo)
    );

    this.listaFunzioniComponenti.sort((a, b) => a.indicemenu > b.indicemenu ? 1 : -1);

    console.log("this.listaFunzioniComponenti ordinata");
    console.log(this.listaFunzioniComponenti);

    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      if (this.listaFunzioniComponenti[i].menu == true) {
        this.listaFunzioniPadre.push(this.listaFunzioniComponenti[i]);
      }
      else if (this.listaFunzioniComponenti[i].menu == false) {
        this.listaFunzioniNonPadre.push(this.listaFunzioniComponenti[i]);
      }
    }

    // console.log("this.listaFunzioniPadre");
    // console.log(this.listaFunzioniPadre);
    // console.log("this.listaFunzioniNonPadre");
    // console.log(this.listaFunzioniNonPadre);

    // caso figli senza padre (funzioni autonome)
    for (let i = 0; i < this.listaFunzioniNonPadre.length; i++) {

      if (this.listaFunzioniNonPadre[i].menuPadre == 0) {

        // console.log("this.listaFunzioniNonPadre[i].idComponente");
        // console.log(this.listaFunzioniNonPadre[i].idComponente);

        let newEl = {
          path: this.listaFunzioniNonPadre[i].aliasComponente,
          //component: this.listaFunzioniNonPadre[i].pathDescrizione,
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
            //component: this.listaFunzioniNonPadre[l].pathDescrizione
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
          //component: this.listaFunzioniComponenti[i].pathDescrizione
          component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniPadre[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        }
        this.listaFunzioniAutonome.push(newEl)
        check = false;
      }




    }

    // ordino l'array
    for (let n = 0; n < this.listaFunzioniComponenti.length; n++) {

      if (this.listaFunzioniComponenti[n].indicemenu != 0) {

        // ciclo this.listaFunzioniPadreConFigli e verifico se presente;
        for (let p = 0; p < this.listaFunzioniPadreConFigli.length; p++) {

          if (this.listaFunzioniComponenti[n].aliasComponente == this.listaFunzioniPadreConFigli[p].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniPadreConFigli[p]);
            break;
          }
        }

        // ciclo this.listaFunzioniAutonome e verifico se presente
        for (let o = 0; o < this.listaFunzioniAutonome.length; o++) {

          if (this.listaFunzioniComponenti[n].aliasComponente == this.listaFunzioniAutonome[o].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniAutonome[o]);
            break;
          }

        }
      }
      else {

        for (let o = 0; o < this.listaFunzioniAutonome.length; o++) {

          if (this.listaFunzioniComponenti[n].aliasComponente == this.listaFunzioniAutonome[o].path) {
            // console.log("this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente ==  this.listaFunzioniAutonome[o].path).idComponente");
            // console.log(this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente ==  this.listaFunzioniAutonome[o].path).idComponente);
            let newEl = {
              path: this.listaFunzioniAutonome[o].path,
              //component: this.listaFunzioniAutonome[o].component
              //component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniAutonome[o].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
              component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaFunzioniAutonome[o].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
            }
            this.listaSupportoOrdinamentoFunzioniAutonome.push(newEl);
            break;
          }

        }

      }

    }

    // aggiungo le funzioni autonome (indice menu = 0)
    for (let s = 0; s < this.listaSupportoOrdinamentoFunzioniAutonome.length; s++) {
// console.log("this.listaSupportoOrdinamentoFunzioniAutonome");
// console.log(this.listaSupportoOrdinamentoFunzioniAutonome);
      let newEl = {
        path: this.listaSupportoOrdinamentoFunzioniAutonome[s].path,
        //component: this.listaSupportoOrdinamentoFunzioniAutonome[s].component
        // component: this.listaComponenti.find(componente => componente.idComponente == this.listaSupportoOrdinamentoFunzioniAutonome[s].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        component: this.listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaSupportoOrdinamentoFunzioniAutonome[s].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);
    }

    console.log("this.listaFunzioniFinaleMenu");
    console.log(this.listaFunzioniFinaleMenu);



    //this.router.resetConfig([this.listaFunzioniFinaleMenu[0]]);
    
    //this.router.resetConfig([this.pp]);
    this.router.resetConfig(this.listaFunzioniFinaleMenu);

    console.log("this.router");
    console.log(this.router);
  }

  // pp: any = { path: "aaa", children: [{ path: "bbb", component: this.listaComponenti[1].component }] }





  // prova() {
  //   let prova = this.listaComponenti.find(componente => componente.idComponente == 5)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
  //   console.log("prova");
  //   console.log(prova);
  // }

  routerPrint() {
    console.log('router:');
    console.log(this.router);
    }


}



// export interface FunzioneAliasComponente {
//   funzioneId: number;
//   nomeFunzione: string;
//   nomeComponente: string;
//   flagVoceMenu: boolean;
//   valoreVoceMenu: string;
// }