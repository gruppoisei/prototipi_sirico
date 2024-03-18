import { Component, Inject, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf,NgFor } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AttivitaGiornoCalendario, GiornoDiLavoro } from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { AggiungiOrdinarioComponent } from "../aggiungi-ordinario/aggiungi-ordinario.component";
import { AggiungiReperibilitaComponent } from "../aggiungi-reperibilita/aggiungi-reperibilita.component";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { GiornoLavorativo } from '../../../dto/request/giornolavorativo';
import { AttivitaGiornoResponse } from '../../../dto/response/AttivitaGiorno';
import { AggiungiAssenzaComponent } from "../aggiungi-assenza/aggiungi-assenza.component";



@Component({
    selector: 'app-attivita-giorno',
    templateUrl: './attivita-giorno.component.html',
    styleUrl: './attivita-giorno.component.scss',
    standalone: true,
    imports: [CommonModule, MatIconModule, NgFor, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, FormsModule, MatSlideToggle, NgIf, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule, AggiungiOrdinarioComponent, AggiungiReperibilitaComponent, MatCardModule, AggiungiAssenzaComponent]
})
export class AttivitaGiornoComponent {
  
  showOrdinario= false;
  showReperibilita= false;
  showAssenza=false;
  giorno: GiornoLavorativo = {
    // giornoLavoroId:this.data.giorno.giornoLavorativoId,
    giornoLavoroId:0,
    oraEntrata:"9:00",
    oraInizioPausa:"12:00",
    oraFinePausa:"13:00",
    oraUscita:"18:00",
  }

  constructor(public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {giorno:GiornoDiLavoro,giornoFestivo:boolean},public rapportinoService:RapportinoService) {
      console.log(data.giorno)
      
      if(data.giorno.giornoLavorativoId != undefined)
      this.giorno.giornoLavoroId = data.giorno.giornoLavorativoId
      if(this.data.giorno.oraEntrata != null && this.data.giorno.oraEntrata != undefined)
      {
        this.giorno.oraEntrata = this.data.giorno.oraEntrata
        this.giorno.oraInizioPausa = this.data.giorno.oraInizioPausa
        this.giorno.oraFinePausa = this.data.giorno.oraFinePausa
        this.giorno.oraUscita = this.data.giorno.oraUscita
        console.log(this.giorno)
      }
    }


MostraOrdinario() {
  this.showOrdinario= !this.showOrdinario 
  this.showReperibilita= false
  this.showAssenza = false
}
MostraAssenza() {
  this.showAssenza= !this.showAssenza 
  this.showReperibilita= false
  this.showOrdinario= false

}
  
MostraReperibilita(){
this.showReperibilita= !this.showReperibilita
this.showOrdinario= false
this.showAssenza = false

}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

ConfermaGiorno(){ 
  if(this.VerificaGiorno())
  {


  }else{



  }
  
  


}

AttivitaOrdinariaAggiunta(AttivitaDaAggiungere:AttivitaGiornoCalendario){
  this.data.giorno.listaAttivitaGiorno.push(AttivitaDaAggiungere)
  
}

AnnullaGiorno(){
  this.dialogRef.close();
}

EliminaAttivita(attivitaId:number){
    this.rapportinoService.EliminaAttivita(attivitaId,this.data.giorno.giornoLavorativoId!)

    this.data.giorno.listaAttivitaGiorno = this.data.giorno.listaAttivitaGiorno.filter(attivita =>  attivita.attivitaId != attivitaId );
}


VerificaGiorno():boolean{
  let ore =0
  let mezzore =0
  let sommaOreAttivita = 0
  ore = Number(this.giorno.oraUscita!.split(":")[0])-Number(this.giorno.oraEntrata!.split(":")[0])-(Number(this.giorno.oraFinePausa!.split(":")[0])-Number(this.giorno.oraInizioPausa!.split(":")[0]))
  mezzore = (Number(this.giorno.oraUscita!.split(":")[1])-Number(this.giorno.oraEntrata!.split(":")[1])-(Number(this.giorno.oraFinePausa!.split(":")[1])-Number(this.giorno.oraInizioPausa!.split(":")[1])))/60
  
  
  for(let i =0;i<this.data.giorno.listaAttivitaGiorno.length ;i++)
  {
    console.log("count "+i+": " + this.data.giorno.listaAttivitaGiorno[i].oreLavorate)
    console.log("count "+i+": " + this.data.giorno.listaAttivitaGiorno[i].oreStraordinario)
    console.log(this.data.giorno.listaAttivitaGiorno)
    console.log(this.rapportinoService.infoPersona.listaSedeLavoroPersona)
    sommaOreAttivita = sommaOreAttivita + this.data.giorno.listaAttivitaGiorno[i].oreLavorate +this.data.giorno.listaAttivitaGiorno[i].oreStraordinario
  }
  console.log("somma attivita: "+sommaOreAttivita)
  console.log("somma ore: "+(ore+mezzore))
  if(sommaOreAttivita > 8 && sommaOreAttivita == (ore+mezzore))
  {
    return true
  }else{
    return false

  }

}


}

