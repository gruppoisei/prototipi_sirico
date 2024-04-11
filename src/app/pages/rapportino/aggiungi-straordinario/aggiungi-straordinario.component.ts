import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AttivitaGiornoCalendario } from '../../../dto/request/calendario';
import { AttivitaGiornoResponse } from '../../../dto/response/AttivitaGiorno';
import { RapportinoService } from '../../../service/rapportino.service';

@Component({
  selector: 'app-aggiungi-straordinario',
  templateUrl: './aggiungi-straordinario.component.html',
  styleUrl: './aggiungi-straordinario.component.scss',
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
export class AggiungiStraordinarioComponent {
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
        (this.attivitaDaAggiungere.oreLavorate > 0 || this.attivitaDaAggiungere.oreStraordinario > 0)
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
                this.attivitaDaAggiungere.oreStraordinario=0;
              }
            } catch (e) {
              console.log(e);
            }
          })
        
      }else{alert("uno o più campi non validi")}
    }
    
   
  }
  