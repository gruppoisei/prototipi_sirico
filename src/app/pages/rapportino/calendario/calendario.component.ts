import { Component, OnInit } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';
import { Rapportino } from '../../../dto/request/calendario';
import { convertitoreOraIntero } from '../giorno-calendario/giorno-calendario.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent{
  listaMesi: Date[] = [];

  giornoDefault: Date = new Date();
  constructor(public rapportinoService: RapportinoService) {
    this.giornoDefault = this.listaMesi[1];

    this.rapportinoService.AggiornaGiorniMese(this.rapportinoService.giornoRiferimento).subscribe(
      res =>
        {
          this.rapportinoService.AggiornaBox();
          this.AggiornaDettagliRapportinoMese();
          this.TrovaMesiDaVisualizzare();
          this.rapportinoService.RaccogliInfoPersona();
        }
    )
   
  }
  

  AggiornaDettagliRapportinoMese() {
    console.log(1000)
    debugger;
    this.rapportinoService.resetiCampi();
    let oreOrdinarieMese = 0;
    let oreStraordinarieMese = 0;
    let oreAssenzaMese = 0;
    this.rapportinoService.risposta.listaGiorniLavoroMese.map((giorno) => {
      giorno.giornoValido = false;
      let oreOrdinarieGiorno = 0;
      let oreStraordinarieGiorno = 0;
      let oreAssenzaGiorno = 0;

      //giorni lavorativi mese
      if (!giorno.giornoFestivo) {
        this.rapportinoService.giorniValidiMese += 1;
        this.rapportinoService.oreMinimeTotali += this.rapportinoService.risposta.rapportino.oreLavoroGiornaliere!
      }
      //orario giorno
      let orarioDiLavoroConvertitoInOre =
        convertitoreOraIntero(giorno.oraUscita!) -
        convertitoreOraIntero(giorno.oraEntrata!) -
        convertitoreOraIntero(giorno.oraFinePausa!) +
        convertitoreOraIntero(giorno.oraInizioPausa!);

      giorno.listaAssenzeGiorno.forEach((assenza) => {
        let start = assenza.oraInizio;
        let end = assenza.oraFine;

        if (assenza.oraInizio < giorno.oraEntrata!) {
          start = giorno.oraEntrata!;
          assenza.oraInizio = giorno.oraEntrata!;
        }

        if (assenza.oraFine > giorno.oraUscita!) {
          end = giorno.oraUscita!;
          assenza.oraFine = giorno.oraUscita!;
        }

        if (assenza.statoApprovazione) {
          if (assenza.oraFine <= giorno.oraEntrata) {
            giorno.listaAssenzeGiorno = giorno.listaAssenzeGiorno.filter(
              (a) => a.assenzaId != assenza.assenzaId
            );
          }

          let oreAssenza =
            convertitoreOraIntero(end) - convertitoreOraIntero(start);

          //sottraggo tempo pausa
          if (
            assenza.oraInizio < giorno.oraInizioPausa! &&
            assenza.oraFine > giorno.oraInizioPausa!
          ) {
            start = giorno.oraInizioPausa!;
            end = giorno.oraFinePausa!;
            if (
              assenza.oraInizio < giorno.oraInizioPausa! &&
              assenza.oraFine > giorno.oraInizioPausa! &&
              assenza.oraFine < giorno.oraFinePausa!
            ) {
              end = assenza.oraFine;
              //somma tempo parziale rispetto a inizio pausa
            }
           

            oreAssenza =
              oreAssenza -
              (convertitoreOraIntero(giorno.oraFinePausa!) -
                convertitoreOraIntero(giorno.oraInizioPausa!));
            if (
              oreAssenza >
              this.rapportinoService.risposta.rapportino.oreLavoroGiornaliere!
            )
              oreAssenza =
                this.rapportinoService.risposta.rapportino
                  .oreLavoroGiornaliere!;
            
            oreOrdinarieGiorno += oreAssenza;
            oreAssenzaGiorno += oreAssenza;
          }

        }
      });


          
          for (let i = 0; i < giorno.listaAttivitaGiorno.length; i++) {
            oreOrdinarieGiorno += giorno.listaAttivitaGiorno[i].oreLavorate;
            oreStraordinarieGiorno +=
              giorno.listaAttivitaGiorno[i].oreStraordinario;

            let prog = this.rapportinoService.oreProgetto.findIndex(
              (a) =>
                a.nomeProgetto == giorno.listaAttivitaGiorno[i].nomeProgetto
            );

            if (prog == -1)
              this.rapportinoService.oreProgetto.push({
                nomeProgetto: giorno.listaAttivitaGiorno[i].nomeProgetto!,
                oreProgetto:
                  giorno.listaAttivitaGiorno[i].oreLavorate +
                  giorno.listaAttivitaGiorno[i].oreStraordinario,
              });
            else
              this.rapportinoService.oreProgetto[i].oreProgetto +=
                giorno.listaAttivitaGiorno[i].oreLavorate +
                giorno.listaAttivitaGiorno[i].oreStraordinario;
          }
          this.rapportinoService.oreLavorateMese += oreOrdinarieGiorno
          this.rapportinoService.oreStraordinarioMese += oreStraordinarieGiorno
          if (
            (oreOrdinarieGiorno + oreStraordinarieGiorno ==
              orarioDiLavoroConvertitoInOre &&
              oreOrdinarieGiorno ==
                this.rapportinoService.risposta.rapportino
                  .oreLavoroGiornaliere) ||
            (this.rapportinoService.risposta.rapportino.part_time &&
              oreOrdinarieGiorno + oreStraordinarieGiorno > 0) ||
            (giorno.giornoFestivo &&
              oreStraordinarieGiorno > 0 &&
              oreOrdinarieGiorno == 0)
          ) {
            giorno.giornoValido = true;
            this.rapportinoService.giorniConfermati += 1;
          }
       return giorno
    });


    //


  }

  ConfermaMese() {
    this.rapportinoService.ConfermaMese();
  }

  CambiaMese(event: any) {
    this.rapportinoService.giornoRiferimento = event;
    this.rapportinoService.AggiornaBox();
  }

  TrovaMesiDaVisualizzare() {
    this.listaMesi[0] = new Date(
      this.rapportinoService.giornoRiferimento.getFullYear(),
      this.rapportinoService.giornoRiferimento.getMonth() - 1,
      1
    );
    this.listaMesi[1] = new Date(
      this.rapportinoService.giornoRiferimento.getFullYear(),
      this.rapportinoService.giornoRiferimento.getMonth(),
      1
    );
    this.listaMesi[2] = new Date(
      this.rapportinoService.giornoRiferimento.getFullYear(),
      this.rapportinoService.giornoRiferimento.getMonth() + 1,
      1
    );
    this.listaMesi[3] = new Date(
      this.rapportinoService.giornoRiferimento.getFullYear(),
      this.rapportinoService.giornoRiferimento.getMonth() + 2,
      1
    );
    this.listaMesi[4] = new Date(
      this.rapportinoService.giornoRiferimento.getFullYear(),
      this.rapportinoService.giornoRiferimento.getMonth() + 3,
      1
    );
  }
}
