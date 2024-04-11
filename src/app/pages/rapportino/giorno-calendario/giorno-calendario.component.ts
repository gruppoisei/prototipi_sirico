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
  giorno!: GiornoDiLavoro;
  // dataGiorno?: Date = new Date();
  // giornoFestivo: boolean = false;
  // giornoString: string = '';

  orarioDiLavoroConvertitoInOre = 0;
  oreLavorate = 0;
  oreStraordinario = 0;
  validatoreOreGiorno = false;
  erroreGiornoFestivo = false;

  verificaGiornoCompletoInizio = '00:00';
  verificaGiornoCompletoFine = '23:59';

  constructor(
    public dialog: MatDialog,
    public rapportinoService: RapportinoService
  ) {}

  // ngOnInit(): void {
  //   if (
  //     this.rapportinoService.risposta.rapportino.dataRapportino != undefined
  //   ) {
  //     this.giornoString = String(
  //       this.rapportinoService.risposta.rapportino.dataRapportino
  //     );
  //     this.dataGiorno = new Date(
  //       Number(this.giornoString.split('-')[0]),
  //       Number(this.giornoString.split('-')[1]) - 1,
  //       this.giorno.dataNumero
  //     );
  //     this.giorno.dataNumero! < 10
  //       ? (this.giornoString =
  //           this.giornoString.slice(0, 8) + 0 + this.giorno.dataNumero)
  //       : (this.giornoString =
  //           this.giornoString.slice(0, 8) + this.giorno.dataNumero);

  //     const find = this.rapportinoService.risposta.giorniFestivi.findIndex(
  //       (e) => e == this.giornoString
  //     );
  //     this.giornoFestivo =
  //       this.dataGiorno!.getDay() == 6 ||
  //       this.dataGiorno!.getDay() == 0 ||
  //       find != -1;
  //     if (!this.giornoFestivo) 
  //       //if(this.giorno.giornoFestivo)
  //       {
  //       this.rapportinoService.giorniValidiMese += 1;
  //       this.rapportinoService.oreMinimeTotali += 8;
  //       this.VerificaValiditaGiorno();
  //       this.rapportinoService.oreLavorateMese += this.oreLavorate;

  //     } else {
  //       for (let i = 0; i < this.giorno.listaAttivitaGiorno.length; i++) {
  //         if (this.giorno.listaAttivitaGiorno[i].oreLavorate > 0) {
  //           this.erroreGiornoFestivo = true;
  //           this.rapportinoService.erroriGiorniMese++;
  //         }
  //       }
  //       this.giorno.listaAssenzeGiorno = [];
  //     }
  //   }
  // }
  ngOnInit(): void {
    if (
      this.rapportinoService.risposta.rapportino.dataRapportino != undefined
    ) {
    //   this.giornoString = String(
    //     this.rapportinoService.risposta.rapportino.dataRapportino
    //   );
    //   this.dataGiorno = new Date(
    //     Number(this.giornoString.split('-')[0]),
    //     Number(this.giornoString.split('-')[1]) - 1,
    //     this.giorno.dataNumero
    //   );
    //   this.giorno.dataNumero! < 10
    //     ? (this.giornoString =
    //         this.giornoString.slice(0, 8) + 0 + this.giorno.dataNumero)
    //     : (this.giornoString =
    //         this.giornoString.slice(0, 8) + this.giorno.dataNumero);

    //   const find = this.rapportinoService.risposta.giorniFestivi.findIndex(
    //     (e) => e == this.giornoString
    //   );
    //   this.giornoFestivo =
    //     this.dataGiorno!.getDay() == 6 ||
    //     this.dataGiorno!.getDay() == 0 ||
    //     find != -1;
      if (!this.giorno.giornoFestivo) 
        //if(this.giorno.giornoFestivo)
        {
        this.rapportinoService.giorniValidiMese += 1;
        this.rapportinoService.oreMinimeTotali += 8;
        this.VerificaValiditaGiorno();
        this.rapportinoService.oreLavorateMese += this.oreLavorate;

      } else {
        for (let i = 0; i < this.giorno.listaAttivitaGiorno.length; i++) {
          if (this.giorno.listaAttivitaGiorno[i].oreLavorate > 0) {
            this.erroreGiornoFestivo = true;
            this.rapportinoService.erroriGiorniMese++;
          }
        }
        this.giorno.listaAssenzeGiorno = [];
      }
    }
  }
  ClickMe() {
    const dialogRef = this.dialog.open(AttivitaGiornoComponent, {
      height: '600px',
      data: this.giorno
      // data: { giorno: this.giorno, giornoFestivo: this.giornoFestivo },
    });
  }

  CopiaGiorno() {
    const dialogRef = this.dialog.open(CopiaGiornoDialogComponent, {
      width: '800px',
      // data: { giorno: this.giorno, giornoFestivo: this.giornoFestivo },
      data: this.giorno
    });
  }

  Delete(giornoId: number) {
    this.rapportinoService.EliminaGiorno(giornoId);
  }

  VerificaValiditaGiorno() {
    this.orarioDiLavoroConvertitoInOre =


        this.ConvertitoreOraIntero(this.giorno.oraUscita!) - this.ConvertitoreOraIntero(this.giorno.oraEntrata!) -this.ConvertitoreOraIntero(this.giorno.oraFinePausa!) + this.ConvertitoreOraIntero(this.giorno.oraInizioPausa!)

    this.giorno.listaAssenzeGiorno.forEach((assenza) => {
      let start = assenza.oraInizio;
      let end = assenza.oraFine;
      if (assenza.oraInizio < this.giorno.oraEntrata!) {
        start = this.giorno.oraEntrata!;
        assenza.oraInizio = this.giorno.oraEntrata!;
      }
      if (assenza.oraFine > this.giorno.oraUscita!) {
        end = this.giorno.oraUscita!;
        assenza.oraFine = this.giorno.oraUscita!;
      }
      if (assenza.statoApprovazione == true) {
        if (assenza.oraFine <= this.giorno.oraEntrata) {
          this.giorno.listaAssenzeGiorno =
            this.giorno.listaAssenzeGiorno.filter(
              (a) => a.assenzaId != assenza.assenzaId
            );
        }

        let oretotali;

        oretotali = this.ConvertitoreOraIntero(end) - this.ConvertitoreOraIntero(start)
        
        //sottraggo tempo pausa
        if (
          assenza.oraInizio < this.giorno.oraInizioPausa! &&
          assenza.oraFine > this.giorno.oraInizioPausa!
        ) {
          start = this.giorno.oraInizioPausa!;
          end = this.giorno.oraFinePausa!;
          if (
            assenza.oraInizio < this.giorno.oraInizioPausa! &&
            assenza.oraFine > this.giorno.oraInizioPausa! &&
            assenza.oraFine < this.giorno.oraFinePausa!
          ) {
            end = assenza.oraFine;
            //somma tempo parziale rispetto a inizio pausa
          }
          //sottraggo pausa
                             
                oretotali = oretotali -(this.ConvertitoreOraIntero(this.giorno.oraFinePausa!) -this.ConvertitoreOraIntero(this.giorno.oraInizioPausa!))
        }
        this.oreLavorate += oretotali;
        this.rapportinoService.oreAssenzaMese += oretotali;
      }
    });
    //somma delle ore attivita complessive
    for (let i = 0; i < this.giorno.listaAttivitaGiorno.length; i++) {
      this.oreLavorate += this.giorno.listaAttivitaGiorno[i].oreLavorate;
      this.rapportinoService.oreStraordinarioMese +=
        this.giorno.listaAttivitaGiorno[i].oreStraordinario;
      
      let prog = this.rapportinoService.oreProgetto.findIndex(
        (a) => a.nomeProgetto == this.giorno.listaAttivitaGiorno[i].nomeProgetto
      );
      if (prog == -1)
        this.rapportinoService.oreProgetto.push({
          nomeProgetto: this.giorno.listaAttivitaGiorno[i].nomeProgetto!,
          oreProgetto:
            this.giorno.listaAttivitaGiorno[i].oreLavorate +
            this.giorno.listaAttivitaGiorno[i].oreStraordinario,
        });
      else
        this.rapportinoService.oreProgetto[i].oreProgetto +=
          this.giorno.listaAttivitaGiorno[i].oreLavorate +
          this.giorno.listaAttivitaGiorno[i].oreStraordinario;
    }

    if (
      this.oreLavorate + this.oreStraordinario ==
        this.orarioDiLavoroConvertitoInOre &&
      this.oreLavorate >= 8
    ) {
      this.validatoreOreGiorno = true;
      this.rapportinoService.giorniConfermati += 1;
    }
  }

  VerificaMeseEsatto(): boolean {
  
    let ver =
      this.rapportinoService.oggi.getMonth() ==
      Number(
        this.rapportinoService.risposta.rapportino.dataRapportino
          ?.toString()
          .split('-')[1]
      ) -
        1;
    console.log(ver);
    return ver;
  }


  ConvertitoreOraIntero(orario:string):number{
    return Number(orario.split(":")[0]) + (Number(orario.split(":")[1])/60)
  }
}
