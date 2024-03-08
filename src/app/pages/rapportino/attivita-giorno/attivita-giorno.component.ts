import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GiornoLavorativo } from '../../../dto/response/giorno-lavorativo';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-attivita-giorno',
  templateUrl: './attivita-giorno.component.html',
  styleUrl: './attivita-giorno.component.scss',
  standalone:true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule,FormsModule, MatSlideToggle, NgIf,MatFormFieldModule,MatCheckboxModule, MatInputModule, MatSelectModule
  ],
})
export class AttivitaGiornoComponent {
Commessa: any;
Sede: any;
oreOrd: any;
oreStra: any;
color: any;
checked: any;
disabled: any;
  selected!: FormControl<any>;
  sedi: any[] = [
    {value: '0', viewValue: 'smart-working'},
    {value: '1', viewValue: 'Roma'},
    {value: '2', viewValue: 'Milano'},
  ]
    commessa: any[] = [
      {value: '0', viewValue: 'XXX'},
      {value: '1', viewValue: 'YYY'},
      {value: '2', viewValue: 'ZZZ'},
    ]


    oreOrdinarie: any[]=[
      {value: '0', viewValue: '1'},
      {value: '1', viewValue: '2'},
      {value: '2', viewValue: '3'},
      {value: '3', viewValue: '4'},
      {value: '4', viewValue: '5'},
      {value: '5', viewValue: '6'},
      {value: '6', viewValue: '7'},
      {value: '7', viewValue: '8'},
      {value: '8', viewValue: '9'},

    ]

    oreStraordinarie: any[]=[
      {value: '0', viewValue: '1'},
      {value: '1', viewValue: '2'},
      {value: '2', viewValue: '3'},
      {value: '3', viewValue: '4'},
      {value: '4', viewValue: '5'},
      {value: '5', viewValue: '6'},
    ]
  
    oraEntrata: any[]= [
      {value: '0', viewValue: '9:00'},
      {value: '1', viewValue: '9:30'},
      {value: '2', viewValue: '10:00'},
      {value: '3', viewValue: '10:30'},
      {value: '4', viewValue: '11:00'},
      {value: '5', viewValue: '11:30'},
      {value: '6', viewValue: '12:00'},
      {value: '7', viewValue: '12:30'},
      {value: '8', viewValue: '13:00'},
      {value: '9', viewValue: '13:30'},
      {value: '10', viewValue: '14:00'},
      {value: '11', viewValue: '14:30'},
      {value: '12', viewValue: '15:00'},
      {value: '13', viewValue: '15:30'},
      {value: '14', viewValue: '16:00'},
      {value: '15', viewValue: '16:30'},
      {value: '16', viewValue: '17:00'},
      {value: '17', viewValue: '17:30'},
      {value: '18', viewValue: '18:00'},
      {value: '19', viewValue: '18:30'},
      {value: '20', viewValue: '19:00'},
      {value: '21', viewValue: '19:30'},
      {value: '22', viewValue: '20:00'},
      
    ]

    oraInizioPausa: any[]= [
      {value: '0', viewValue: '9:00'},
      {value: '1', viewValue: '9:30'},
      {value: '2', viewValue: '10:00'},
      {value: '3', viewValue: '10:30'},
      {value: '4', viewValue: '11:00'},
      {value: '5', viewValue: '11:30'},
      {value: '6', viewValue: '12:00'},
      {value: '7', viewValue: '12:30'},
      {value: '8', viewValue: '13:00'},
      {value: '9', viewValue: '13:30'},
      {value: '10', viewValue: '14:00'},
      {value: '11', viewValue: '14:30'},
      {value: '12', viewValue: '15:00'},
      {value: '13', viewValue: '15:30'},
      {value: '14', viewValue: '16:00'},
      {value: '15', viewValue: '16:30'},
      {value: '16', viewValue: '17:00'},
      {value: '17', viewValue: '17:30'},
      {value: '18', viewValue: '18:00'},
      {value: '19', viewValue: '18:30'},
      {value: '20', viewValue: '19:00'},
      {value: '21', viewValue: '19:30'},
      {value: '22', viewValue: '20:00'},
      
    ]

    oraFinePausa: any[]= [
      {value: '0', viewValue: '9:00'},
      {value: '1', viewValue: '9:30'},
      {value: '2', viewValue: '10:00'},
      {value: '3', viewValue: '10:30'},
      {value: '4', viewValue: '11:00'},
      {value: '5', viewValue: '11:30'},
      {value: '6', viewValue: '12:00'},
      {value: '7', viewValue: '12:30'},
      {value: '8', viewValue: '13:00'},
      {value: '9', viewValue: '13:30'},
      {value: '10', viewValue: '14:00'},
      {value: '11', viewValue: '14:30'},
      {value: '12', viewValue: '15:00'},
      {value: '13', viewValue: '15:30'},
      {value: '14', viewValue: '16:00'},
      {value: '15', viewValue: '16:30'},
      {value: '16', viewValue: '17:00'},
      {value: '17', viewValue: '17:30'},
      {value: '18', viewValue: '18:00'},
      {value: '19', viewValue: '18:30'},
      {value: '20', viewValue: '19:00'},
      {value: '21', viewValue: '19:30'},
      {value: '22', viewValue: '20:00'},
      
    ]

    oraUscita: any[]= [
      {value: '0', viewValue: '9:00'},
      {value: '1', viewValue: '9:30'},
      {value: '2', viewValue: '10:00'},
      {value: '3', viewValue: '10:30'},
      {value: '4', viewValue: '11:00'},
      {value: '5', viewValue: '11:30'},
      {value: '6', viewValue: '12:00'},
      {value: '7', viewValue: '12:30'},
      {value: '8', viewValue: '13:00'},
      {value: '9', viewValue: '13:30'},
      {value: '10', viewValue: '14:00'},
      {value: '11', viewValue: '14:30'},
      {value: '12', viewValue: '15:00'},
      {value: '13', viewValue: '15:30'},
      {value: '14', viewValue: '16:00'},
      {value: '15', viewValue: '16:30'},
      {value: '16', viewValue: '17:00'},
      {value: '17', viewValue: '17:30'},
      {value: '18', viewValue: '18:00'},
      {value: '19', viewValue: '18:30'},
      {value: '20', viewValue: '19:00'},
      {value: '21', viewValue: '19:30'},
      {value: '22', viewValue: '20:00'},
      
    ]

  constructor(public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiornoLavorativo, private router: Router) {}


MostraOrdinario() {
  this.showOrdinario= !this.showOrdinario 
  this.showReperibilita= false


}
  entrata= "9:00";
  inizioPausa= "12:00"
  finePausa="13:00"
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

}

