import { Component } from '@angular/core';
import { AmministrazioneRuoloService } from '../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';
import { Funzione } from '../../pages/ruolo-utente/insert-ruolo-utente/provass/provass.component';

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
  listaFunzioniChildren: { path: string, component: string }[] = []

  // liste finali distinte
  listaFunzioniAutonome: { path: string, component: string }[] = []
  listaFunzioniPadreConFigli: { path: string, children: { path: string, component: string }[] }[] = []

  // lista finale
  listaFunzioniFinaleMenu: any[] = []


  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService
  ) {

  }

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

    console.log("this.listaFunzioniComponenti");
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

        this.listaFunzioniAutonome.push({
          path: this.listaFunzioniNonPadre[i].aliasComponente,
          component: this.listaFunzioniNonPadre[i].pathDescrizione
        })
      }

    }

    // caso padre con figli o padre senza figli
    for (let i = 0; i < this.listaFunzioniPadre.length; i++) {

      var check = false;

      //console.log(this.listaFunzioniPadre[i].fkFunzioniId)

      for (let l = 0; l < this.listaFunzioniNonPadre.length; l++) {

        //console.log("START");
        //console.log(this.listaFunzioniPadre[i].fkFunzioniId, this.listaFunzioniNonPadre[l].aliasComponente, this.listaFunzioniNonPadre[l].menuPadre);
        //console.log("END");

        if (this.listaFunzioniPadre[i].fkFunzioniId == this.listaFunzioniNonPadre[l].menuPadre) {



          this.listaFunzioniChildren.push({
            path: this.listaFunzioniNonPadre[l].aliasComponente,
            component: this.listaFunzioniNonPadre[l].pathDescrizione
          })

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
        this.listaFunzioniAutonome.push({
          path: this.listaFunzioniPadre[i].aliasComponente,
          component: this.listaFunzioniComponenti[i].pathDescrizione
        })
        check = false;
      }




    }

    // console.log("this.listaFunzioniAutonome");
    // console.log(this.listaFunzioniAutonome);
    // console.log("this.listaFunzioniPadreConFigli");
    // console.log(this.listaFunzioniPadreConFigli);


    this.listaFunzioniFinaleMenu.push(this.listaFunzioniPadreConFigli)
    this.listaFunzioniFinaleMenu.push(this.listaFunzioniAutonome)
    console.log("this.listaFunzioniFinaleMenu");
    console.log(this.listaFunzioniFinaleMenu);
    this.listaFunzioniFinaleMenu = []

    // console.log("this.listaFunzioniComponenti");
    // console.log(this.listaFunzioniComponenti);



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

    }

    for (let q = 0; q < this.listaFunzioniComponenti.length; q++) {
    
      for (let r = 0; r < this.listaFunzioniAutonome.length; r++) {

        if (this.listaFunzioniComponenti[r].aliasComponente == this.listaFunzioniAutonome[r].path) {
          this.listaFunzioniFinaleMenu.push(this.listaFunzioniAutonome[r]);
          break;
        }

      }   

    }

    console.log("this.listaFunzioniFinaleMenu");
    console.log(this.listaFunzioniFinaleMenu);

  }




}

// export interface FunzioneAliasComponente {
//   funzioneId: number;
//   nomeFunzione: string;
//   nomeComponente: string;
//   flagVoceMenu: boolean;
//   valoreVoceMenu: string;
// }