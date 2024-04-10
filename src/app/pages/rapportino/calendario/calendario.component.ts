import { Component } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';
import { Router } from '@angular/router';
import { AuthGuardService, livelli } from '../../../service/auth-guard.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  listaMesi: Date[] = [];
 
  

  giornoDefault: Date = new Date();
  constructor(public rapportinoService:RapportinoService,private guardia:AuthGuardService,private router:Router) {

    if(guardia.utenteRuolo != livelli.utente)
      {
          router.navigate(["homepage"]);
      }
    this.TrovaMesiDaVisualizzare()
    this.giornoDefault = this.listaMesi[1];
    this.rapportinoService.AggiornaBox();
  }



  ConfermaMese()
  {
    this.rapportinoService.ConfermaMese()
  }

  CambiaMese(event: any) {
    this.rapportinoService.giornoRiferimento = event;
    this.rapportinoService.AggiornaBox();
  }

  

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





