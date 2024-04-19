import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InsertUtenteService } from '../../../service/insert-utente.service';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';

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

  constructor(private router: Router, private http: HttpClient, private ruoliservice: InsertUtenteService) {
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
  }

  caricaRuoli() {
    this.ruoliservice.GetRuoli().subscribe((res) => this.ruoli = res);
  }

  clearSearch() {
    this.formData.Nome = '';
    this.formData.Cognome = '';
    this.formData.Ruolo = null;
  }

  closeForm() {
    this.router.navigate(['']);
  }

  modificaRuolo(id: number) {
    this.ruoliservice.utenteId$.next(id);
    this.ruoliservice.utenteId = id
    this.router.navigate(['/Segreteria/insert-ruolo-utente']);
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
