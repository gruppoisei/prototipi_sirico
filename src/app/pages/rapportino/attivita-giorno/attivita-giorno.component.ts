import { Component, Inject, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
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
import { GiornoDiLavoro } from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { AppModule } from '../../../app.module';



@Component({
    selector: 'app-attivita-giorno',
    templateUrl: './attivita-giorno.component.html',
    styleUrl: './attivita-giorno.component.scss',
    standalone: true,
    imports: [ AppModule, NgFor, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, FormsModule, MatSlideToggle, NgIf, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule,]
})
export class AttivitaGiornoComponent {



// giorno = new Date(this.rapportinoService.risposta.rapportino.dataRapportino!.getFullYear(),
// this.rapportinoService.risposta.rapportino.dataRapportino!.getMonth(),
// this.data.dataNumero)
giorno = new Date()


Commessa: any;
Sede: any;
oreOrd: any;
oreStra: any;
color: any;
checked: any;
disabled: any;
oraEntrata: string="";
oraUscita: string="";
inizioPausa: string="";
finePausa:string="";



  selected!: FormControl<any>;
  sedi: any[] = [
    {value: '0', viewValue: 'smart-working'},
    {value: '1', viewValue: 'Roma'},
    {value: '2', viewValue: 'Milano'},
  ]
    commesse: any[] = [
      {value: '0', viewValue: 'XXX'},
      {value: '1', viewValue: 'YYY'},
      {value: '2', viewValue: 'ZZZ'},
    ]


    orari: string[]= [
      '9:00', '9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'
   ]

   


  constructor(public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiornoDiLavoro,public rapportinoService:RapportinoService) {}


MostraOrdinario() {
  this.showOrdinario= !this.showOrdinario 
  this.showReperibilita= false


}
  entrata= "9:00";
  inizioPausaa= "12:00"
  finePausaa="13:00"
  uscita="18:00"
  showOrdinario= false;
  showReperibilita= false;
pickerFrom: any;
myDatePickerFrom: any;


AggiungiReperibilita(){
this.showReperibilita= !this.showReperibilita
this.showOrdinario= false
}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

test(){

  console.log ("ora entrata:"+ this.entrata+ "inizio pausa:"+this.inizioPausaa+"finepausa:"+this.finePausaa+"ora uscita:"+this.uscita)
}


}

