import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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

  constructor(private router: Router, private http: HttpClient) {
    this.clearSearch();
  }

  ricercaPersonaFiltrata(nome: string, cognome: string, ruolo: number) {
    const params = {
      Nome: nome,
      Cognome: cognome,
      Ruolo: ruolo
    };
    this.http.get<any[]>('http://localhost:5143/Persona/GetPersoneByParams', { params })
      .subscribe((risultati) => {
        this.utenti = risultati;
        this.output_ricercaFiltrata = this.utenti && this.utenti.length > 0;
      }, (error) => {
        console.error('Errore durante la ricerca:', error);
      });
  }


  ngOnInit(): void {
    console.log("oninit");
    this.caricaRuoli();
    console.log(this.ruoli);
    console.log("qui");
  }

  caricaRuoli() {
    this.http.get<any[]>('http://localhost:5143/AmministrazioneRuolo/GetRuoli')
      .subscribe((dati) => {
        this.ruoli = dati;
      });
  }

  clearSearch() {
    this.formData.Nome = '';
    this.formData.Cognome = '';
    this.formData.Ruolo = '';
  }

  closeForm() {
    this.router.navigate(['/homepage']);
  }

  modificaRuolo(id: number) {
    this.router.navigate(['/insert-ruolo-utente']);
  }

  deleteRuolo(id: number) {
    //delete da implementare
  }

  onCercaButtonClick() {
    console.log('Cerca button clicked!');
    console.log('FormData:', this.formData);
  }
}
