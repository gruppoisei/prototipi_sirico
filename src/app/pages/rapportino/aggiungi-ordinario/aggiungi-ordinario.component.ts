import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RapportinoService } from '../../../service/rapportino.service';
import { MatIconModule } from '@angular/material/icon';
import { AttivitaGiornoResponse } from '../../../dto/response/AttivitaGiorno';
import { AttivitaGiornoCalendario } from '../../../dto/request/calendario';

@Component({
  selector: 'app-aggiungi-ordinario',
  templateUrl: './aggiungi-ordinario.component.html',
  styleUrl: './aggiungi-ordinario.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatSlideToggle,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class AggiungiOrdinarioComponent {
  @Output() mandaNuovaAttivitaInserita =
    new EventEmitter<AttivitaGiornoCalendario>();

  @Input()
  giornoLavorativoId!: number;


  @Input()
  giornoFestivo!:boolean

  color: any;
  checked: any;
  disabled: any;


  attivitaDaAggiungere: AttivitaGiornoResponse =  {
    giornoLavorativoId: this.giornoLavorativoId,
    attivitaPersonaId:0,
    sedeLavoroPersonaId:0,
    oreLavorate:0,
    oreStraordinario:0,
  }
 

  constructor(public rapportinoService: RapportinoService) {
   
  }

  AggiungiAttivitaGiorno() {
  
    if (
      this.attivitaDaAggiungere.sedeLavoroPersonaId != -1 &&
      this.attivitaDaAggiungere.attivitaPersonaId != -1 &&
      this.attivitaDaAggiungere.oreLavorate > 0
    ) {
      this.attivitaDaAggiungere.giornoLavorativoId = this.giornoLavorativoId
      
      this.rapportinoService
        .AggiungiAttivitaGiorno(this.attivitaDaAggiungere)
        .subscribe((res) => {
          try {
            if (res > 0) {
              this.rapportinoService.AggiornaBox();
              alert('tutto bene');
              let aggiornoComponenteAttivitaGiorno =
                new AttivitaGiornoCalendario();
              aggiornoComponenteAttivitaGiorno.attivitaId = res;
              aggiornoComponenteAttivitaGiorno.oreLavorate =
                this.attivitaDaAggiungere.oreLavorate;
              aggiornoComponenteAttivitaGiorno.oreStraordinario =
                this.attivitaDaAggiungere.oreStraordinario;
              aggiornoComponenteAttivitaGiorno.sedeLavoro =
                this.rapportinoService.infoPersona.listaSedeLavoroPersona.find(
                  (e) =>
                    e.sedeLavodoPersonaId ==
                    this.attivitaDaAggiungere.sedeLavoroPersonaId
                )?.nomeSedeLavoro;
              aggiornoComponenteAttivitaGiorno.nomeProgetto =
                this.rapportinoService.infoPersona.listaAttivitaProgettoPersona.find(
                  (e) =>
                    e.attivitaProgettoPersonaId ==
                    this.attivitaDaAggiungere.attivitaPersonaId
                )?.nomeProgetto;

              this.mandaNuovaAttivitaInserita.emit(
                aggiornoComponenteAttivitaGiorno
              );

              this.attivitaDaAggiungere.attivitaPersonaId=-1;
              this.attivitaDaAggiungere.sedeLavoroPersonaId=-1;
              this.attivitaDaAggiungere.oreLavorate=0;
            }
          } catch (e) {
            console.log(e);
          }
        })
      
    }else{alert("uno o più campi non validi")}
  }
  
 
}
