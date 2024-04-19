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
  
  oreGiornoFullTime = 8
  orarioDiLavoroConvertitoInOre = 0;
  oreLavorate = 0;
  oreStraordinario = 0;
  validatoreOreGiorno = false;

  verificaGiornoCompletoInizio = '00:00';
  verificaGiornoCompletoFine = '23:59';

  constructor(
    public dialog: MatDialog,
    public rapportinoService: RapportinoService
  ) {}

  ngOnInit(): void {
    // if (
    //   this.rapportinoService.risposta.rapportino.dataRapportino != undefined
    // ) {
    //   if (!this.giorno.giornoFestivo) {
    //     this.rapportinoService.giorniValidiMese += 1;
    //     this.rapportinoService.oreMinimeTotali +=
    //       this.rapportinoService.risposta.rapportino.oreLavoroGiornaliere!;
    //     this.VerificaValiditaGiorno();
    //     this.rapportinoService.oreLavorateMese += this.oreLavorate;
    //   }
     
    // }
  }
  ClickMe() {
    const dialogRef = this.dialog.open(AttivitaGiornoComponent, {
      height: '600px',
      data: this.giorno,
    });
  }

  CopiaGiorno() {
    const dialogRef = this.dialog.open(CopiaGiornoDialogComponent, {
      width: '800px',
      data: this.giorno,
    });
  }

  Delete(giornoId: number) {
    this.rapportinoService.EliminaGiorno(giornoId);
  }

  VerificaValiditaGiorno() {
    this.orarioDiLavoroConvertitoInOre =
      this.ConvertitoreOraIntero(this.giorno.oraUscita!) -
      this.ConvertitoreOraIntero(this.giorno.oraEntrata!) -
      this.ConvertitoreOraIntero(this.giorno.oraFinePausa!) +
      this.ConvertitoreOraIntero(this.giorno.oraInizioPausa!);

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
      if(assenza.statoApprovazione == true) {
        if (assenza.oraFine <= this.giorno.oraEntrata) {
          this.giorno.listaAssenzeGiorno =
            this.giorno.listaAssenzeGiorno.filter(
              (a) => a.assenzaId != assenza.assenzaId
            );
        }

        let oretotali=this.ConvertitoreOraIntero(end) - this.ConvertitoreOraIntero(start);

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

          oretotali =
            oretotali -
            (this.ConvertitoreOraIntero(this.giorno.oraFinePausa!) -
              this.ConvertitoreOraIntero(this.giorno.oraInizioPausa!));
              if(oretotali > this.rapportinoService.risposta.rapportino.oreLavoroGiornaliere!) oretotali = this.rapportinoService.risposta.rapportino.oreLavoroGiornaliere!
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
      (this.oreLavorate + this.oreStraordinario ==
        this.orarioDiLavoroConvertitoInOre &&
        this.oreLavorate == this.oreGiornoFullTime) ||
      (this.rapportinoService.risposta.rapportino.part_time &&
        this.oreLavorate + this.oreStraordinario > 0) ||
        (this.giorno.giornoFestivo && this.oreStraordinario > 0 && this.oreLavorate == 0)
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
    return ver;
  }

  ConvertitoreOraIntero(orario: string): number {
    return Number(orario.split(':')[0]) + Number(orario.split(':')[1]) / 60;
  }
}

export const convertitoreOraIntero = (orario: string): number => {
  return Number(orario.split(':')[0]) + Number(orario.split(':')[1]) / 60;
}
