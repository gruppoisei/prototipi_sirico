import { Component, Injectable, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutingModule, listaComponenti } from '../app-routing.module';
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
  // listaFunzioniChildren: { path: string, component: string }[] = []
  listaFunzioniChildren: any[] = []

  // liste finali distinte
  listaFunzioniAutonome: any[] = []
  //listaFunzioniAutonome: { path: string, component: string }[] = []
  listaFunzioniPadreConFigli: { path: string, children: { path: string, component: string }[] }[] = []

  // lista finale
  listaSupportoOrdinamentoFunzioniAutonome: any[] = []
  // listaSupportoOrdinamentoFunzioniAutonome: { path: string, component: string }[] = []
  listaFunzioniFinaleMenu: any[] = ['']

  // lista di supporto al caricamento dei componenti associati, quelli non raggiungibili direttamente ma vincolati ad altri
  //componentiAssociati: number[] = [];
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
    console.log("idRuolo in getFunzioniComponenti()");
    console.log(idRuolo);

    this.GetAllInfoFunzioneRuoloById(idRuolo).subscribe((response) => {
      this.listaRuoloFunzioni = response
        // console.log("this.listaRuoloFunzioni")
        // console.log(this.listaRuoloFunzioni)
    });



    this.listaFunzioniComponenti = await firstValueFrom(
      // this.amministrazioneRuolo.GetAllFunzioniComponenteByIdRuolo(this.idRuolo)
      this.GetAllFunzioniComponenteByIdRuolo(idRuolo)
    );

    this.listaFunzioniComponenti.sort((a, b) => a.indicemenu > b.indicemenu ? 1 : -1);

    console.log("this.listaFunzioniComponenti ordinata");
    console.log(this.listaFunzioniComponenti);

    // resetto il contenuto dell'array menu finale
    this.listaFunzioniFinaleMenu = [];

    for (let i = 0; i < this.listaFunzioniComponenti.length; i++) {

      // verifico se hanno una funzionalita associata
      if (this.listaFunzioniComponenti[i].funzionalitaAssociata != null) {

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
          component: listaComponenti.find(componente => componente.idComponente == this.listaFunzioniNonPadre[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
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
            component: listaComponenti.find(componente => componente.idComponente == this.listaFunzioniNonPadre[l].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
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
          component: listaComponenti.find(componente => componente.idComponente == this.listaFunzioniPadre[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
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
        component: listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaSupportoOrdinamentoFunzioniAutonome[i].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);

    }

    // limito la stampa delle voci di menu escludendo i componenti associati
    // e tenendo conto del componente aggiuntivo home, impostato dopo di default (length + 1)
    this.limiteVociMenu = this.listaFunzioniFinaleMenu.length + 1;
    console.log(this.limiteVociMenu);
    console.log(this.limiteVociMenu);

    // recupero componenti associati
    // for (let i = 0; i < this.componentiAssociati.length; i++) {
    for (let i = 0; i < this.pathPadreEFunzionalitaAssociata.length; i++) {

      //const response = await this.amministrazioneRuolo.getComponenteByFunzionalitaAssociata(this.componentiAssociati[i]).toPromise();
      var response = await this.getComponenteByFunzionalitaAssociata(this.pathPadreEFunzionalitaAssociata[i].funzionalitaAssociata).toPromise();
      response.pathDescrizione = this.pathPadreEFunzionalitaAssociata[i].pathPadre + '/' + response.pathDescrizione
      //this.listaCaricamentoComponentiAssociati.push(response);
      this.listaCaricamentoComponentiAssociati.push(response);
    }

    console.log("this.listaCaricamentoComponentiAssociati");
    console.log(this.listaCaricamentoComponentiAssociati);

    // console.log("this.listaFunzioniFinaleMenu");
    // console.log(this.listaFunzioniFinaleMenu);

    // inserisco i componenti associati alla fine della lista funzioni finale menu
    for (let i = 0; i < this.listaCaricamentoComponentiAssociati.length; i++) {

      for (let l = 0; l < this.listaFunzioniFinaleMenu.length; l++)

        if (this.listaFunzioniFinaleMenu[l]['children']) {

          for (let j = 0; j < this.listaFunzioniFinaleMenu[l].children.length; j++) {

            if (this.listaFunzioniFinaleMenu[l].children[j].path == this.listaCaricamentoComponentiAssociati[i].pathDescrizione.split('/')[0]) {

              this.listaCaricamentoComponentiAssociati[i].pathDescrizione = this.listaFunzioniFinaleMenu[l].path + '/' + this.listaCaricamentoComponentiAssociati[i].pathDescrizione
            }

          }
        }


      let newEl = {
        path: this.listaCaricamentoComponentiAssociati[i].pathDescrizione,
        component: listaComponenti.find(componente => componente.idComponente == this.listaCaricamentoComponentiAssociati[i].idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
      }
      this.listaFunzioniFinaleMenu.push(newEl);
    }
    console.log("this.homePagePath")
    console.log(this.homePagePath)
    // inserisco il componente HOME come primo elemento della lista per il logo del menù come voce di default
    this.listaFunzioniFinaleMenu.unshift({
      path: this.homePagePath,
      component: listaComponenti.find(funzione => funzione.idComponente == 0)?.component
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
              component: listaComponenti.find(componente => componente.idComponente == this.listaFunzioniComponenti.find(funzione => funzione.aliasComponente == this.listaFunzioniAutonome[l].path).idComponente)!.component //this.listaFunzioniNonPadre[i].pathDescrizione
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

}
