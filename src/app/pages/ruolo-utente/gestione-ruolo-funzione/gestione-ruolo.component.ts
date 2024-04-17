import { Component, OnInit } from '@angular/core';
import { InsertUtenteService, PersoneEntity } from '../../../service/insert-utente.service';
import { Router } from '@angular/router';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';

@Component({
  selector: 'app-gestione-ruolo',
  templateUrl: './gestione-ruolo.component.html',
  styleUrls: ['./gestione-ruolo.component.scss']
})
export class GestioneRuoloComponent implements OnInit {
  formData: any = { nome: '' };
  output_ricercaFiltrata: boolean = false;
  ruoli: any[] = [];


  constructor(private ruoliService: InsertUtenteService, private amministrazioneRuoli: AmministrazioneRuoloService, private router: Router) { }

  ngOnInit(): void {
    this.clearSearch();
  }

  caricaRuoli() {
    this.ruoliService.GetRuoli().subscribe(
      (data: any[]) => {
        this.ruoli = data;
        this.output_ricercaFiltrata = true;
      },
      (error) => {
        console.log('Si è verificato un errore nel caricamento dei ruoli:', error);
      }
    );
  }  

  clearSearch() {
    this.formData.nome = '';
    this.output_ricercaFiltrata = false;
  }

  ricercaFiltrata() {
    this.ruoliService.GetRuoli().subscribe(
      (data: any[]) => {
        if (data && Array.isArray(data)) {
          this.ruoli = data;
          this.output_ricercaFiltrata = true;
        } else {
          console.log('Risposta API non valida:', data);
        }
      },
      (error) => {
        console.log('Si è verificato un errore nel caricamento dei ruoli:', error);
      }
    );
  }

  deleteRuolo(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo ruolo?')) {
      this.amministrazioneRuoli.eliminaRuolo(id).subscribe(
        () => {
          this.ruoli = this.ruoli.filter(ruolo => ruolo.syruIdruolosys !== id);
          this.output_ricercaFiltrata = this.ruoli.length > 0;
        },
        error => {
          console.error('Si è verificato un errore durante l\'eliminazione del ruolo:', error);
        }
      );
    }
  }

  modificaRuolo(id: number) {
    this.amministrazioneRuoli.ruoloId$.next(id);
    this.router.navigate(['/Segreteria/insert-ruolo-funzione']);
  }

  closeForm() {
    this.router.navigate(['']);
  }
}
