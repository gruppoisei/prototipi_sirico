import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttivitaGiornoComponent } from '../attivita-giorno/attivita-giorno.component';
import { GiornoDiLavoro } from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-giorno-calendario',
  templateUrl: './giorno-calendario.component.html',
  styleUrl: './giorno-calendario.component.scss',
  
  
})
export class GiornoCalendarioComponent {

  @Input()
  giorno!: GiornoDiLavoro
  dataGiorno?:Date = new Date()
  giornoFestivo:boolean = false
  giornoString:string=""


  constructor(public dialog: MatDialog,private rapportinoService:RapportinoService){
    

  }

  ngOnInit(): void {
    
    if(this.rapportinoService.risposta.rapportino.dataRapportino != undefined){
      this.giornoString = String(this.rapportinoService.risposta.rapportino.dataRapportino)
      this.dataGiorno = new Date(Number(this.giornoString.split("-")[0]),Number(this.giornoString.split("-")[1]) -1,this.giorno.dataNumero);
      this.giorno.dataNumero! <10 ? this.giornoString = this.giornoString.slice(0, 8) + 0 + this.giorno.dataNumero  : this.giornoString = this.giornoString.slice(0, 8) + this.giorno.dataNumero


      const find = this.rapportinoService.risposta.giorniFestivi.findIndex(e=> e == this.giornoString)
      this.giornoFestivo =(this.dataGiorno!.getDay() ==6 ||this.dataGiorno!.getDay() ==0 || find != -1 )
      if(!this.giornoFestivo){
        this.rapportinoService.giorniValidiMese +=1
      }
      

        
    }
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AttivitaGiornoComponent, {
      data: {giorno :this.giorno,giornoFestivo:this.giornoFestivo},
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

  Delete(giornoId:number){
    console.log(giornoId)
    this.rapportinoService.EliminaGiorno(giornoId)
  }


}





