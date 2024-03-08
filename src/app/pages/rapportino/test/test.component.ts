import { Component } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  giornoRiferimento = "2024/03/01"
  listaMesi = [
    "2024/03/01",
    "2024/02/01",
    "2024/04/01",
    "2024/05/01"
  ]
  constructor(public rapportinoService:RapportinoService){}

  test(){
    console.log("completo")
    console.log(this.rapportinoService.risposta)
    console.log("parziale")
    console.log(this.rapportinoService.risposta.listaGiorniLavoroMese[0])
  }

  CambiaMese(event: any) {
    console.log(event)
    this.giornoRiferimento = event;
    this.rapportinoService.AggiornaGiorniMese(this.giornoRiferimento)
  }

}
