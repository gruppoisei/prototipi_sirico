import { Component, Inject, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf, NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  AttivitaGiornoCalendario,
  GiornoDiLavoro,
} from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { AggiungiOrdinarioComponent } from '../aggiungi-ordinario/aggiungi-ordinario.component';
import { AggiungiReperibilitaComponent } from '../aggiungi-reperibilita/aggiungi-reperibilita.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GiornoLavorativo } from '../../../dto/request/giornolavorativo';
import { AggiungiAssenzaComponent } from '../aggiungi-assenza/aggiungi-assenza.component';
import { AggiungiStraordinarioComponent } from "../aggiungi-straordinario/aggiungi-straordinario.component";

@Component({
    selector: 'app-attivita-giorno',
    templateUrl: './attivita-giorno.component.html',
    styleUrl: './attivita-giorno.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        NgFor,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSlideToggle,
        NgIf,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        AggiungiOrdinarioComponent,
        AggiungiReperibilitaComponent,
        MatCardModule,
        AggiungiAssenzaComponent,
        AggiungiStraordinarioComponent
    ]
})
export class AttivitaGiornoComponent {
  showOrdinario = false;
  showReperibilita = false;
  showAssenza = false;
  showStraordinario = false;
  verificaGiornoCompletoInizio = "00:00"
  verificaGiornoCompletoFine = "23:59"
  giorno: GiornoLavorativo = {
    giornoLavoroId: this.data.giornoLavorativoId,
    oraEntrata: '09:00',
    oraInizioPausa: '12:00',
    oraFinePausa: '13:00',
    oraUscita: '18:00',
  };
  nuovoGiorno:boolean = true
  constructor(
    public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: GiornoDiLavoro,
    public rapportinoService: RapportinoService
  ) {
    this.nuovoGiorno = Number(data.giornoData!.toString().split("-")[2]) >= new Date().getDate()
    if (data.giornoLavorativoId != undefined)
      this.giorno.giornoLavoroId = data.giornoLavorativoId;
    if (
      this.data.oraEntrata != null &&
      this.data.oraEntrata != undefined
    ) {
      this.giorno.oraEntrata = this.data.oraEntrata;
      this.giorno.oraInizioPausa = this.data.oraInizioPausa;
      this.giorno.oraFinePausa = this.data.oraFinePausa;
      this.giorno.oraUscita = this.data.oraUscita;
    }
  }

  MostraOrdinario() {
    this.showOrdinario = !this.showOrdinario;
    this.showReperibilita = false;
    this.showAssenza = false;
    this.showStraordinario = false

  }
  MostraAssenza() {
    this.showAssenza = !this.showAssenza;
    this.showReperibilita = false;
    this.showOrdinario = false;
    this.showStraordinario = false

  }

  MostraReperibilita() {
    this.showReperibilita = !this.showReperibilita;
    this.showOrdinario = false;
    this.showAssenza = false;
    this.showStraordinario = false
  }
  MostraStraordinario() {
    this.showStraordinario = !this.showStraordinario
    this.showOrdinario = false;
    this.showReperibilita = false;
    this.showAssenza = false;
  }

  AssenzaAggiunta()
  {
    this.dialogRef.close()
    this.rapportinoService.AggiornaGiorniMese()
  }

  ConfermaGiorno() {
    if (this.VerificaGiorno()) {
      this.rapportinoService.ConfermaGiorno(this.giorno)
    } else {
    }
  }

  AttivitaOrdinariaAggiunta(AttivitaDaAggiungere: AttivitaGiornoCalendario) {
    this.data.listaAttivitaGiorno.push(AttivitaDaAggiungere);
  }

  AnnullaGiorno() {
    this.dialogRef.close();
  }

  EliminaAttivita(attivitaId: number) {
    this.rapportinoService.EliminaAttivita(
      attivitaId,
      this.data.giornoLavorativoId!
    );

    this.data.listaAttivitaGiorno =
      this.data.listaAttivitaGiorno.filter(
        (attivita) => attivita.attivitaId != attivitaId
      );
  }

  EliminaAssenza(assenzaId: number) {
    this.rapportinoService.EliminaAssenza(assenzaId)
      this.dialogRef.close()
    
  }

  VerificaGiorno() {
    let oreGiornoConvertiteDaTempo = 0;

    //conversione in ore lavorate gli orari giornata
    oreGiornoConvertiteDaTempo =
      Number(this.giorno.oraUscita!.split(':')[0]) -
      Number(this.giorno.oraEntrata!.split(':')[0]) -
      (Number(this.giorno.oraFinePausa!.split(':')[0]) -
        Number(this.giorno.oraInizioPausa!.split(':')[0])) +
      (Number(this.giorno.oraUscita!.split(':')[1]) -
        Number(this.giorno.oraEntrata!.split(':')[1]) -
        (Number(this.giorno.oraFinePausa!.split(':')[1]) -
          Number(this.giorno.oraInizioPausa!.split(':')[1]))) /
        60;

    if(oreGiornoConvertiteDaTempo < 8)
    {
      alert("numero ore assegnate alla giornata non valido")
      return false
    }else{
      return true;
    }
    
  }


 
}
