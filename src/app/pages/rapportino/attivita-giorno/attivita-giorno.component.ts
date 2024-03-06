import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GiornoLavorativo } from '../../../dto/response/giorno-lavorativo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-attivita-giorno',
  templateUrl: './attivita-giorno.component.html',
  styleUrl: './attivita-giorno.component.scss',
  standalone:true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule,FormsModule, MatSlideToggle, NgIf],
})
export class AttivitaGiornoComponent {
Commessa: any;
Sede: any;
oreOrd: any;
oreStra: any;
color: any;
checked: any;
disabled: any;


  constructor(public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiornoLavorativo, private router: Router) {}


MostraOrdinario() {
  this.showOrdinario= !this.showOrdinario 

}
  entrata= "9:00";
  inizioPausa= "12:00"
  finePausa="13:00"
  uscita="18:00"
  showOrdinario= false;

pickerFrom: any;
myDatePickerFrom: any;
  
  onNoClick(): void {
    this.dialogRef.close();
  }





}

