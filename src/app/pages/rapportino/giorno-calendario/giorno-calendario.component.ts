import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttivitaGiornoComponent } from '../attivita-giorno/attivita-giorno.component';
import { GiornoDiLavoro } from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { CopiaGiornoDialogComponent } from '../copia-giorno-dialog/copia-giorno-dialog.component';


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

  orarioDiLavoro = 0
  oreLavorate = 0


  constructor(public dialog: MatDialog,private rapportinoService:RapportinoService){}


  ngOnInit(): void {
    
    if(this.rapportinoService.risposta.rapportino.dataRapportino != undefined){
      this.giornoString = String(this.rapportinoService.risposta.rapportino.dataRapportino)
      this.dataGiorno = new Date(Number(this.giornoString.split("-")[0]),Number(this.giornoString.split("-")[1]) -1,this.giorno.dataNumero);
      this.giorno.dataNumero! <10 ? this.giornoString = this.giornoString.slice(0, 8) + 0 + this.giorno.dataNumero  : this.giornoString = this.giornoString.slice(0, 8) + this.giorno.dataNumero
      

      const find = this.rapportinoService.risposta.giorniFestivi.findIndex(e=> e == this.giornoString)
      this.giornoFestivo =(this.dataGiorno!.getDay() ==6 ||this.dataGiorno!.getDay() ==0 || find != -1 )
      if(!this.giornoFestivo) {this.rapportinoService.giorniValidiMese +=1}else this.giorno.listaAssenzeGiorno = []
      
      if((this.giorno.listaAttivitaGiorno.length > 0 || this.giorno.listaAssenzeGiorno.length > 0) &&  !this.giornoFestivo  ) {this.rapportinoService.giorniConfermati +=1}
      
      if(this.giorno.oraEntrata != undefined || this.giorno.oraEntrata !=null ){
        this.oreLavorate =  Number(this.giorno.oraUscita!.split(':')[0]) -
        Number(this.giorno.oraEntrata!.split(':')[0]) -
        (Number(this.giorno.oraFinePausa!.split(':')[0]) -
          Number(this.giorno.oraInizioPausa!.split(':')[0])) +
        (Number(this.giorno.oraUscita!.split(':')[1]) -
          Number(this.giorno.oraEntrata!.split(':')[1]) -
          (Number(this.giorno.oraFinePausa!.split(':')[1]) -
            Number(this.giorno.oraInizioPausa!.split(':')[1]))) /
          60;

          this.rapportinoService.oreConfermate += this.oreLavorate
      }
        
    }
    

  }
  
  
  ClickMe(){
    
    const dialogRef=
    this.dialog.open(AttivitaGiornoComponent, 
      {
        height: "600px", 
        data: {giorno:this.giorno,giornoFestivo:this.giornoFestivo}})
  }

  CopiaGiorno()
  {
    const dialogRef=
    this.dialog.open(CopiaGiornoDialogComponent, 
      {
        width: "800px",
        data:{giorno:this.giorno,giornoFestivo:this.giornoFestivo}})
  }

  Delete(giornoId:number){
    this.rapportinoService.EliminaGiorno(giornoId)
  }


}





