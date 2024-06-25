import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-risolvi',
  templateUrl: './modal-risolvi.component.html',
  styleUrl: './modal-risolvi.component.scss'
})
export class ModalRisolviComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  aspetti: Aspetti[] = [
    { nomeAspetto: 'Aspetti Gestionali', idAspetto: 3 },
    { nomeAspetto: 'Formazione', idAspetto: 6 },
    { nomeAspetto: 'Autotutela', idAspetto: 7 },
  ];
}
interface Aspetti {
  nomeAspetto: string;
  idAspetto: number;
}
