import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttivitaGiornoComponent } from '../attivita-giorno/attivita-giorno.component';
import { GiornoDiLavoro } from '../../../dto/request/calendario';


@Component({
  selector: 'app-giorno-calendario',
  templateUrl: './giorno-calendario.component.html',
  styleUrl: './giorno-calendario.component.scss',
  
  
})
export class GiornoCalendarioComponent {

  @Input()
  giorno!: GiornoDiLavoro

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AttivitaGiornoComponent, {
      data: {giorno :this.giorno},
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.giorno)
    });
  }
  
  
  ClickMe(){
    const dialogRef=
    this.dialog.open(AttivitaGiornoComponent, 
      {
        height: "600px", 
        data: this.giorno})
  }


}





