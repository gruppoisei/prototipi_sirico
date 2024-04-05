import { Component, OnInit } from '@angular/core';
import { InsertUtenteService } from '../../../service/insert-utente.service';

@Component({
  selector: 'app-gestione-ruolo',
  templateUrl: './gestione-ruolo.component.html',
  styleUrls: ['./gestione-ruolo.component.scss']
})
export class GestioneRuoloComponent implements OnInit {
  formData: any;
  output_ricercaFiltrata: any;
  ruoli: any;

  constructor(private insertUtenteService: InsertUtenteService) { }

  ngOnInit(): void {
    this.caricaRuoli();
  }

  caricaRuoli() {
    this.insertUtenteService.GetRuoli().subscribe(
      (data) => {
        this.ruoli = data;
        this.output_ricercaFiltrata = true;
      },
      (error) => {
        console.log('Si è verificato un errore nel caricamento dei ruoli:', error);
      }
    );
  }

  clearSearch() {
    throw new Error('Method not implemented.');
  }
  ricercaFiltrata(arg0: any) {
    throw new Error('Method not implemented.');
  }
  deleteRuolo(arg0: any) {
    throw new Error('Method not implemented.');
  }
  modificaRuolo(arg0: any) {
    throw new Error('Method not implemented.');
  }

  closeForm() {

    throw new Error('Method not implemented.');
  }
}
