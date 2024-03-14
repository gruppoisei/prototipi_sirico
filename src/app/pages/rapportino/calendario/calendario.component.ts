import { Component } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  listaMesi: Date[] = [];
  // giornoRiferimento = new Date();

  // giorniLav:GiornoLavorativo[] = []
  // primoDelMese = new Date();
  // ultimoDelMese = new Date();

  // giorniMesePassato: number[] = [];
  // giorniMeseSeguente: number[] = [];

  giornoDefault: Date = new Date();
  constructor(public rapportinoService:RapportinoService) {
    this.TrovaMesiDaVisualizzare()
    this.giornoDefault = this.listaMesi[1];
    this.rapportinoService.AggiornaBox();
  }

  // CreazioneArrayGiorni(num: number) {
  //   let giorni: number[] = [];
  //   for (let i = 0; i < num; i++) {
  //     giorni.push(i);
  //   }
  //   return giorni;
  // }

  CambiaMese(event: any) {
    this.rapportinoService.giornoRiferimento = event;
    this.rapportinoService.AggiornaBox();
  }

  // AggiornaBox() {


  //   this.rapportinoService.AggiornaGiorniMese(this.rapportinoService.giornoRiferimento)

  //   this.primoDelMese = new Date(
  //     this.giornoRiferimento.getFullYear(),
  //     this.giornoRiferimento.getMonth(),
  //     1
  //   );

  //   this.ultimoDelMese = new Date(
  //     this.giornoRiferimento.getFullYear(),
  //     this.giornoRiferimento.getMonth() + 1,
  //     0
  //   );
  //   console.log("prova")
  //   console.log(this.primoDelMese.getDay() - 1)

  //   this.giorniMesePassato = Array(this.primoDelMese.getDay() - 1)
  //     .fill(0)
  //     .map((x, i) => {
  //       return new Date(
  //         this.primoDelMese.getFullYear(),
  //         this.primoDelMese.getMonth(),
  //         this.primoDelMese.getDate() - this.primoDelMese.getDay() + i +1
  //       ).getDate();
  //     });




  //   if (this.ultimoDelMese.getDay() == 0) {
  //     this.giorniMeseSeguente = [];
  //   } else {
  //     this.giorniMeseSeguente = Array(7 - this.ultimoDelMese.getDay())
  //       .fill(0)
  //       .map((x, i) => {
  //         return i + 1;
  //       });
  //   }

  //   console.log()
  // }


  TrovaMesiDaVisualizzare(){
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





