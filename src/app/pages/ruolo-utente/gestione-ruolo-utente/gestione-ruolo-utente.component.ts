import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-gestione-ruolo-utente',
  templateUrl: './gestione-ruolo-utente.component.html',
  styleUrls: ['./gestione-ruolo-utente.component.scss']
})
export class GestioneRuoloUtenteComponent {
  formData: any = {};
  output_ricercaFiltrata: any;
  utenti: any;

  constructor(private router: Router, private http: HttpClient) { 
    this.clearSearch();
  }

  ricercaPersonaFiltrata(nome: string, cognome: string, codiceFiscale: string) {
    const params = {
      nome: nome, 
      cognome: cognome,
      codiceFiscale: codiceFiscale
    };
    return this.http.get<any[]>('http://localhost:5143/Persona/GetPersoneByParams', { params });
  }

  clearSearch() {
    this.formData.AnpeNome = '';
    this.formData.AnpeCognome = '';
    this.formData.AnpeCodiceFiscale = '';
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
