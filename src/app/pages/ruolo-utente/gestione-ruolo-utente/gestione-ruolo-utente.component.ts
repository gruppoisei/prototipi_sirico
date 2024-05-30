import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InsertUtenteService } from '../../../service/insert-utente.service';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-gestione-ruolo-utente',
  templateUrl: './gestione-ruolo-utente.component.html',
  styleUrls: ['./gestione-ruolo-utente.component.scss']
})
export class GestioneRuoloUtenteComponent implements OnInit {

  formData: any = {};
  output_ricercaFiltrata: any;
  utenti: any;
  ruoli: { syruIdruolosys: number, syruDescruolosys: string }[] = [];
  risultati: any;

  constructor(private router: Router,
    private http: HttpClient,
    private ruoliservice: InsertUtenteService,
    public menuDinamicoService: MenuDinamicoService
  ) {
    this.clearSearch();
  }

  ricercaPersonaFiltrata(nome: string, cognome: string, ruoloId: number) {
    this.ruoliservice.getPersonaFiltrata(nome, cognome, ruoloId)
      .subscribe((risultati) => {
        if (risultati && risultati.length > 0) {
          this.utenti = risultati;
          this.output_ricercaFiltrata = true;
          this.caricaRuoli();
        } else {
          this.utenti = [];
          this.output_ricercaFiltrata = false;
        }
      }, (error) => {
        console.error('Errore durante la ricerca:', error);
      });
  }

  ngOnInit(): void {
    this.clearSearch();
    this.caricaRuoli();

    this.menuDinamicoService.loadComponentAssociato();
    this.menuDinamicoService.getPermissionFlag();
  }

  // loadComponentAssociato() {
  //   console.log("this.router.url")
  //   console.log(this.router.url)

  //   const currentAlias = this.router.url.replaceAll('%20', ' ');

  //   console.log("this.currentAlias")
  //   console.log(currentAlias)

  //   var lastAlias = currentAlias.substring(currentAlias.lastIndexOf("/") + 1, currentAlias.length);
    
  //   console.log("lastAlias");
  //   console.log(lastAlias);

  //   // ciclo listafunzionifinale nei children per vedere se matcho;
  //   for (let i = this.menuDinamicoService.limiteVociMenu; i < this.menuDinamicoService.listaFunzioniFinaleMenu.length; i++) {

  //     if (this.menuDinamicoService.listaFunzioniFinaleMenu[i].path.includes(lastAlias)) {
  //       console.log(this.menuDinamicoService.listaFunzioniFinaleMenu[i]);
  //       this.finalPath = this.menuDinamicoService.listaFunzioniFinaleMenu[i].path
  //     }

  //   }


  //   //this.finalPath = ???

  //   console.log("this.finalPath");
  //   console.log(this.finalPath);
  // }

  caricaRuoli() {
    this.ruoliservice.GetRuoli().subscribe((res) => this.ruoli = res);
  }

  clearSearch() {
    this.formData.Nome = '';
    this.formData.Cognome = '';
    this.formData.Ruolo = null;
  }

  closeForm() {
    // this.router.navigate(['/Home']);
    this.router.navigate([""]);
  }

  modificaRuolo(id: number) {
    this.ruoliservice.utenteId$.next(id);
    this.ruoliservice.utenteId = id
    // Cambiare ^ e testare
    // this.router.navigate(['/AmministrazioneApplicativo/insert-ruolo-utente']);
    this.router.navigate(['/'+this.menuDinamicoService.finalPath]);
  }

  eliminaUtente(Id: number) {
    console.log(Id);
    const utenteDaEliminare = new NuovoUtenteRequest();
    utenteDaEliminare.userId = Id;
    utenteDaEliminare.sysuser = "frontend";
    console.log(utenteDaEliminare);
    this.ruoliservice.ConfermaNuovoUtenteModificaRuolo(utenteDaEliminare).subscribe(
      (response) => {
        console.log(response.message);
        this.ricercaPersonaFiltrata(this.formData.Nome, this.formData.Cognome, this.formData.Ruolo);
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  onCercaButtonClick() {
    console.log('Cerca button clicked!');
    console.log('FormData:', this.formData);
  }

}
