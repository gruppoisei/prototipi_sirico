import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-ricerca-segnalazioni',
  templateUrl: './pagina-ricerca-segnalazioni.component.html',
  styleUrls: ['./pagina-ricerca-segnalazioni.component.scss']
})
export class PaginaRicercaSegnalazioniComponent {
  constructor(private router : Router){

  }
  handleRowClick(_t96: Record) {
    this.router.navigate(['/sirico-risolvi-aspetti']);

  }
  settoreMateria: SettoreMateria[] = [
    { id: 1, nome: 'Pensioni' },
    { id: 2, nome: 'Welfare' },
    { id: 3, nome: 'Entrate' },
    { id: 4, nome: 'Gestione Privata' },
    { id: 5, nome: 'Pensioni' },
  ];
  areaProdotto: AreaProdotto[] = [
    { id: 1, nome: 'Prodotto1.1.2' },
    { id: 2, nome: 'Pensione supplementare' },
    { id: 3, nome: 'Prodotto 2' },
    { id: 4, nome: 'Prodotto 3' },
    { id: 5, nome: 'Indennità malattia e degenza ospedaliera' },
  ];

  sede: Sede[] = [
    { id: 1, nome: 'Roma' },
    { id: 2, nome: 'Frosinone' },
    { id: 3, nome: 'Rieti' },
    { id: 4, nome: 'Arezzo' },
    { id: 5, nome: 'Modena' },
  ];
  aspetti: Aspetti[] = [
    { id: 1, nome: '' },
    { id: 2, nome: 'Nuovi Aspetti' },
    { id: 3, nome: 'Solo Aspetti Standard' },
  ];

  records: Record[] = [
    { id: 1, dataInvio: '05/01/2023', dataRisoluzione: '05/01/2023', settoreMateria: 'Pensioni', areaProdotto: 'Prodotti1.1.2', stato: 'Risolta', sede: 'Roma' },
    { id: 2, dataInvio: '03/01/2023', dataRisoluzione: '-', settoreMateria: 'Pensioni', areaProdotto: 'Prodotti1.1.2', stato: 'Da risolvere', sede: 'Frosinone' },
    { id: 3, dataInvio: '01/01/2023', dataRisoluzione: '-', settoreMateria: 'Pensioni', areaProdotto: 'Pensione supplementare', stato: 'Da risolvere', sede: 'Viterbo' },
    { id: 4, dataInvio: '23/12/2022', dataRisoluzione: '05/01/2023', settoreMateria: 'Armotizzatori sociali', areaProdotto: 'Indennità malattia e degenza ospedaliera', stato: 'Risolta', sede: 'Roma' },
    { id: 5, dataInvio: '23/12/2022', dataRisoluzione: '02/01/2023', settoreMateria: 'Armotizzatori sociali', areaProdotto: 'Prodotto 2', stato: 'Risolta', sede: 'Roma EUR' }
  ];

}

export interface Record {
  id: number
  dataInvio: string;
  dataRisoluzione: string;
  settoreMateria: string;
  areaProdotto: string;
  stato: string;
  sede: string;
}


interface SettoreMateria {
  id: number;
  nome: string;
}

interface AreaProdotto {
  id: number;
  nome: string;
}

interface Sede {
  id: number;
  nome: string;
}

interface Aspetti {
  id: number;
  nome: string;
}
