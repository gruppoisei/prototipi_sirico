import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InsertUtenteService } from '../../../service/insert-utente.service';


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
    // Costruire l'URL con i parametri
    let url = 'http://localhost:5143/AmministrazioneRuolo/GetUtentiERuoli?';
    if (nome) {
      url += 'nome=' + nome + '&';
    }
    if (cognome) {
      url += 'cognome=' + cognome + '&';
    }
    if (ruoloId) {
      url += 'ruoloId=' + ruoloId;
    }

    console.log(url);

    this.http.get<any[]>(url)
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
