import { Component } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  listaMesi: Date[] = [];
  giornoRiferimento = new Date();

  // giorniLav:GiornoLavorativo[] = []
  primoDelMese = new Date();
  ultimoDelMese = new Date();

  giorniMesePassato: number[] = [];
  giorniMeseCorrente: number[] = [];
  giorniMeseSeguente: number[] = [];

  giornoDefault: Date = new Date();
  constructor(public rapportinoService:RapportinoService) {
    this.TrovaMesiDaVisualizzare()
    this.giornoDefault = this.listaMesi[1];
    this.AggiornaBox();
  }

  CreazioneArrayGiorni(num: number) {
    let giorni: number[] = [];
    for (let i = 0; i < num; i++) {
      giorni.push(i);
    }
    return giorni;
  }

  CambiaMese(event: any) {
    this.giornoRiferimento = event;
    this.AggiornaBox();
  }

  AggiornaBox() {
    this.rapportinoService.AggiornaGiorniMese(this.giornoRiferimento)

    this.primoDelMese = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth(),
      1
    );
    this.ultimoDelMese = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() + 1,
      0
    );

    this.giorniMesePassato = Array(this.giornoRiferimento.getDay() - 1)
      .fill(0)
      .map((x, i) => {
        return new Date(
          this.primoDelMese.getFullYear(),
          this.primoDelMese.getMonth(),
          this.primoDelMese.getDate() - this.giornoRiferimento.getDay() + i + 1
        ).getDate();
      });



    // this.giorniMeseCorrente = Array(this.ultimoDelMese.getDate())
    //   .fill(0)
    //   .map((x, i) => {
    //     return i + 1;
    //   });



    if (this.ultimoDelMese.getDay() == 0) {
      this.giorniMeseSeguente = [];
    } else {
      this.giorniMeseSeguente = Array(7 - this.ultimoDelMese.getDay())
        .fill(0)
        .map((x, i) => {
          return i + 1;
        });
    }
  }


  TrovaMesiDaVisualizzare(){
    this.listaMesi[0] = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() - 1,
      this.giornoRiferimento.getDate()
    );
    this.listaMesi[1] = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth(),
      this.giornoRiferimento.getDate()
    );
    this.listaMesi[2] = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() + 1,
      this.giornoRiferimento.getDate()
    );
    this.listaMesi[3] = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() + 2,
      this.giornoRiferimento.getDate()
    );
    this.listaMesi[4] = new Date(
      this.giornoRiferimento.getFullYear(),
      this.giornoRiferimento.getMonth() + 3,
      this.giornoRiferimento.getDate()
    );
  }

}





