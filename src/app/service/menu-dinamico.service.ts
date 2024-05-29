import { Component, Injectable, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutingModule, listaFunzioneComponente, listaAliasComponente } from '../app-routing.module';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenuDinamicoService {

  httpOptionsNoResponseType: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  listaRuoloFunzioni: any;

  homePagePath = "";

  limiteVociMenu: any;

  idRuolo: any;

  currentAlias: string = "";
  finalPath: string = "";
  componenteAssociato: any = "";
  componenteMappato: any = "";

  // lista di partenza
  listaFunzioniComponenti: any[] = [];


  // liste intermedie
  listaFunzioniPadre: any[] = [];
  listaFunzioniNonPadre: any[] = [];
  listaFunzioniChildren: any[] = []

  // liste finali distinte
  listaFunzioniAutonome: any[] = []
  listaFunzioniPadreConFigli: { path: string, children: { path: string, component: string }[] }[] = []

  // lista finale
  listaSupportoOrdinamentoFunzioniAutonome: any[] = []
  listaFunzioniFinaleMenu: any[] = ['']

  // lista di supporto al caricamento dei componenti associati, quelli non raggiungibili direttamente ma vincolati ad altri
  pathPadreEFunzionalitaAssociata: { pathPadre: string, funzionalitaAssociata: number }[] = [];
  listaCaricamentoComponentiAssociati: any[] = [];


  constructor(
    // private amministrazioneRuolo: AmministrazioneRuoloService,
    private router: Router,
    private auth: AuthenticationService,
    private Http: HttpClient
  ) {
    //this.getFunzioniComponenti(0);



  }
  ngOnInit(): void {
    console.log("auth.utente da menudinamico constructor");
    // console.log(auth.utente);
    console.log(this.auth.utente?.idRuolo);
    //this.changeDetectorRef.detectChanges();


    this.getFunzioniComponenti(this.auth.utente!.idRuolo);
  }


  logout() {
    console.log('logout')
    this.auth.logout().subscribe({

      next: () => {
        this.router.navigate([''])
      },

      error: (err) => {

      }
    })
  }

  async getFunzioniComponenti(idRuolo: number) {
    // console.log("idRuolo in getFunzioniComponenti()");
    // console.log(idRuolo);

    this.listaFunzioniComponenti = await this.GetPathEComponenteByRuoloId(idRuolo).toPromise();

    // ordino la lista ricevuta secondo l'indice menu
    this.listaFunzioniComponenti.sort((a, b) => a.indicemenu > b.indicemenu ? 1 : -1);

    console.log("this.listaFunzioniComponenti ordinata");
    console.log(this.listaFunzioniComponenti);

    // resetto il contenuto dell'array menu finale
    this.listaFunzioniFinaleMenu = [];
    this.listaFunzioniChildren = [];

    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      // verifico se appartengono alla voce di menu o no (menu = padre)
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
        let newEl = {
          path: this.listaFunzioniNonPadre[i].pathDescrizione,
          component: listaFunzioneComponente.find(componente => componente.idComponente == this.listaFunzioniNonPadre[i].fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        }
        this.listaFunzioniAutonome.push(newEl)
      }
    }

    // console.log("this.listaFunzioniAutonome");
    // console.log(this.listaFunzioniAutonome);

    // caso padre con o senza figli
    for (let i = 0; i < this.listaFunzioniPadre.length; i++) {
      
      var check = false;

      for (let l = 0; l < this.listaFunzioniNonPadre.length; l++) {

        if (this.listaFunzioniPadre[i].fkFunzioniId == this.listaFunzioniNonPadre[l].menuPadre) {
          let newEl = {
            path: /*this.listaFunzioniPadre[i].pathDescrizione + '/' +*/ this.listaFunzioniNonPadre[l].pathDescrizione,
            component: listaFunzioneComponente.find(componente => componente.idComponente == this.listaFunzioniNonPadre[l].fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
          }
          this.listaFunzioniChildren.push(newEl);
          check = true;
        }
      }

      // console.log("this.listaFunzioniChildren | i");
      // console.log(this.listaFunzioniChildren, ' | ', i);

      // caso padre con figli
      if (check == true) {
        this.listaFunzioniChildren.sort((a, b) => a.path > b.indicemenu ? 1 : -1);

        this.listaFunzioniPadreConFigli.push({
          path: this.listaFunzioniPadre[i].pathDescrizione,
          children: this.listaFunzioniChildren
        })
        check = false;
        this.listaFunzioniChildren = []
      }

      // caso padre senza figli (funzione autonoma)
      else if (check == false) {
        let newEl = {
          path: this.listaFunzioniPadre[i].pathDescrizione,
          component: listaFunzioneComponente.find(componente => componente.idComponente == this.listaFunzioniPadre[i].fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
        }
        this.listaFunzioniAutonome.push(newEl)
        check = false;
      }

    }

    // console.log("this.listaFunzioniPadreConFigli");
    // console.log(this.listaFunzioniPadreConFigli);

    // console.log("this.listaFunzioniAutonome");
    // console.log(this.listaFunzioniAutonome);

    // ordino l'array delle voci di menu; alla fine pusho le funzioni autonome
    this.sortArray();

    // console.log("this.listaSupportoOrdinamentoFunzioniAutonome");
    // console.log(this.listaSupportoOrdinamentoFunzioniAutonome);

    // aggiungo le funzioni autonome (flag voce menu = false, indice menu = 0)
    for (let i = 0; i < this.listaSupportoOrdinamentoFunzioniAutonome.length; i++) {

      let newEl = {
        path: this.listaSupportoOrdinamentoFunzioniAutonome[i].path,
        component: listaFunzioneComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.pathDescrizione == this.listaSupportoOrdinamentoFunzioniAutonome[i].path).fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);
    }

    // limito la stampa delle voci di menu escludendo i componenti associati
    // e tenendo conto del componente aggiuntivo home, impostato dopo di default (length + 1)
    this.limiteVociMenu = this.listaFunzioniFinaleMenu.length + 1;
    // console.log("this.limiteVociMenu");
    // console.log(this.limiteVociMenu);

    // recupero e mappo i componenti associati
    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      const check = false;

      if (this.listaFunzioniComponenti[i].aliasAssociato != null && this.listaFunzioniComponenti[i].componenteAliasAssociato != null) {

        for (let l = 0; l < this.listaFunzioniFinaleMenu.length; l++) {

          // pusho nell'array finale i path collegati direttamente alla voce di menu
          if (this.listaFunzioniFinaleMenu[l].path == this.listaFunzioniComponenti[i].pathDescrizione) {

            let newEl = {
              path: this.listaFunzioniFinaleMenu[l].path + '/' + this.listaFunzioniComponenti[i].aliasAssociato,
              // component: listaAliasComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.pathDescrizione == this.listaSupportoOrdinamentoFunzioniAutonome[i].path).fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
              component: listaAliasComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti[i].fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
            }
            this.listaFunzioniFinaleMenu.push(newEl);
          }

          // pusho nell'array finale i path collegati a un children di una delle voci di menu
          else {

            if (this.listaFunzioniFinaleMenu[l]['children']) {

              for (let m = 0; m < this.listaFunzioniFinaleMenu[l].children.length; m++) {

                if (this.listaFunzioniFinaleMenu[l].children[m].path == this.listaFunzioniComponenti[i].pathDescrizione) {

                  // console.log("this.listaFunzioniComponenti[i].fkFunzioniId");
                  // console.log(this.listaFunzioniComponenti[i].fkFunzioniId);

                  let newEl = {
                    path: this.listaFunzioniFinaleMenu[l].children[m].path + '/' + this.listaFunzioniComponenti[i].aliasAssociato,
                    // component: listaAliasComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.pathDescrizione == this.listaSupportoOrdinamentoFunzioniAutonome[i].path).fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
                    component: listaAliasComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti[i].fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
                  }
                  this.listaFunzioniFinaleMenu.push(newEl);
                }

              }
            }

          }



        }
      }

    }

    // inserisco il componente HOME come primo elemento della lista per il logo del menù come voce di default
    this.listaFunzioniFinaleMenu.unshift({
      path: this.homePagePath,
      component: listaFunzioneComponente.find(funzione => funzione.idComponente == 0)?.component
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

          if (this.listaFunzioniComponenti[i].pathDescrizione == this.listaFunzioniPadreConFigli[l].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniPadreConFigli[l]);
            break;
          }

        }

        // ciclo this.listaFunzioniAutonome e verifico se presente
        for (let l = 0; l < this.listaFunzioniAutonome.length; l++) {

          if (this.listaFunzioniComponenti[i].pathDescrizione == this.listaFunzioniAutonome[l].path) {
            this.listaFunzioniFinaleMenu.push(this.listaFunzioniAutonome[l]);
            break;
          }

        }

      }

      else {

        for (let l = 0; l < this.listaFunzioniAutonome.length; l++) {

          if (this.listaFunzioniComponenti[i].pathDescrizione == this.listaFunzioniAutonome[l].path) {
            let newEl = {
              path: this.listaFunzioniAutonome[l].path,
              component: listaFunzioneComponente.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.pathDescrizione == this.listaFunzioniAutonome[l].path).fkFunzioniId)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
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

  // getPathMenu(): string {
  //   this.caricaComponenteAssociato().then((data) => {
  //     this.finalPath = data;
  //     console.log("getPathMenu()");
  //     console.log(this.finalPath);
  //   })
  //     .catch((ex) => {
  //       console.log(ex);
  //       this.finalPath = "";
  //     });
  //   return this.finalPath;
  // }

  /*
    async caricaComponenteAssociato(): Promise<string> {
  
      console.log("this.router.url")
      console.log(this.router.url)
  
      this.currentAlias = this.router.url.replaceAll('%20', ' ');
  
      console.log("this.currentAlias")
      console.log(this.currentAlias)
  
      var lastAlias = this.currentAlias.substring(this.currentAlias.lastIndexOf("/") + 1, this.currentAlias.length);
  
      this.componenteAssociato = await this.getAliasComponenteAssociatoByPath(lastAlias).toPromise();
  
      console.log("this.componenteAssociato:");
      console.log(this.componenteAssociato);
  
      return this.finalPath = this.currentAlias + '/' + this.componenteAssociato.pathDescrizione;
    }
  */



  /*
    GetAllFunzioniComponenteByIdRuolo(ruoloId: number) {
      return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetPathEAliasComponenteByRuoloId?RuoloId=' + ruoloId)
    }
  
    getComponenteByFunzionalitaAssociata(funzionalitaAssociata: number) {
      return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetComponenteByFunzionalitaAssociata?funzionalitaAssociata=' + funzionalitaAssociata)
    }
  
    getAliasComponenteAssociatoByPath(path: string) {
      return this.Http.get<any>('http://localhost:5143/AliasComponenti/GetAliasComponenteAssociatoByPath?path=' + path, this.httpOptionsNoResponseType);
    }
  
    GetAllInfoFunzioneRuoloById(ruoloId: number) {
      return this.Http.get<any>(`http://localhost:5143/AmministrazioneRuolo/GetAllInfoFunzioniRuoloById?ruoloId=` + ruoloId)
    }
    */
  GetPathEComponenteByRuoloId(ruoloId: number) {
    return this.Http.get<any>(`http://localhost:5143/AliasComponenti/GetPathEComponenteByRuoloId?ruoloId=` + ruoloId)
  }



}
