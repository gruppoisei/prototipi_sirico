// import { Component } from '@angular/core';
// import { findIndex } from 'rxjs';

// @Component({
//   selector: 'app-insert-ruolo-utente',
//   templateUrl: './insert-ruolo-utente.component.html',
//   styleUrl: './insert-ruolo-utente.component.scss',
// })
// export class InsertRuoloUtenteComponent {
//   indexUtente = -1;
//   utenteSelezionato: any = null;

//   listaUtenti:any = []
//   ruoliModificati: any = [];

//   constructor(){

//     // this.GetAllUtenti()

//   }

//   utenti = [
//     {
//       id: 1,
//       username: 'edo',
//       ruoli: [
//         { idRuolo: 1, nomeRuolo: 'utente' },
//         { idRuolo: 2, nomeRuolo: 'dipentente' },
//       ],
//     },
//     { id: 2, username: 'luca', ruoli: [{ idRuolo: 1, nomeRuolo: 'utente' }] },
//     {
//       id: 3,
//       username: 'ale',
//       ruoli: [
//         { idRuolo: 1, nomeRuolo: 'utente' },
//         { idRuolo: 3, nomeRuolo: 'amministazione' },
//       ],
//     },
//     {
//       id: 4,
//       username: 'gia',
//       ruoli: [
//         { idRuolo: 1, nomeRuolo: 'utente' },
//         { idRuolo: 4, nomeRuolo: 'segreteria' },
//       ],
//     },
//     {
//       id: 5,
//       username: 'carm',
//       ruoli: [
//         { idRuolo: 1, nomeRuolo: 'utente' },
//         { idRuolo: 5, nomeRuolo: 'tecnico' },
//       ],
//     },
//   ];

//   listaRuoli = [
//     { idRuolo: 1, nomeRuolo: 'utente' },
//     { idRuolo: 2, nomeRuolo: 'dipentente' },
//     { idRuolo: 3, nomeRuolo: 'amministazione' },
//     { idRuolo: 4, nomeRuolo: 'segreteria' },
//     { idRuolo: 5, nomeRuolo: 'tecnico' },
//   ];

//   AggiornaListaRuoli() {

//     if (this.indexUtente != -1) {
//       this.utenteSelezionato = this.utenti.find(
//         (utente) => utente.id == this.indexUtente
//       );
//       this.ruoliModificati = this.listaRuoli.map((ruolo: any) => {
//         let stato =
//           this.utenteSelezionato.ruoli.find(
//             (r: any) => r.idRuolo == ruolo.idRuolo
//           ) != undefined
//             ? statoRuolo.presente
//             : statoRuolo.disponibile;
//         return { ...ruolo, stato: stato };
//         //ottieni tutti i ruoli dell'utente dal db
//       });
//     }

//   }

//   AssengaRimuoviRuolo(ruoloNew: any) {
//     console.log(ruoloNew)
//     if (this.utenteSelezionato != null) {
//       let stato = statoRuolo.presente;
//       this.ruoliModificati = this.ruoliModificati.filter((ruolo: any) => {
//         if (ruolo.idRuolo == ruoloNew.idRuolo) {
//           switch (ruolo.stato) {
//             case statoRuolo.presente:
//               ruolo.stato = statoRuolo.rimosso;
//               break;
//             case statoRuolo.disponibile:
//               ruolo.stato = statoRuolo.aggiunto;
//               break;
//             case statoRuolo.aggiunto:
//               ruolo.stato = statoRuolo.disponibile;
//               break;
//             case statoRuolo.rimosso:
//               ruolo.stato = statoRuolo.presente;
//               break;
//           // }
//         }
//         return ruolo;
//       });
//     } else {
//       this.indexUtente = -1;
//       this.ruoliModificati = [];
//     }
//   }

//   AggiornaRuoliPersona()
//   {
//     if(this.ruoliModificati.find((ruolo:any) => ruolo.stato == statoRuolo.aggiunto || ruolo.stato == statoRuolo.rimosso ) != undefined)
//     {
//       //manda ruoli attivi, aggiorna ruoli utente

//     }
//     else{
//       alert("non sono state effettuate modifiche")
//     }
//   }

//   // GetAllUtenti()
//   // {
//   //   this.listaUtenti = //chiamata al DB per caricare la lista utenti
//   // }

//   getAllRuoliUtente()
//   {

//   }

// }

// export enum statoRuolo {
//   presente,
//   rimosso,
//   aggiunto,
//   disponibile,
// }

import { Component, Input } from '@angular/core';
import { findIndex, map } from 'rxjs';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';
import { InsertUtenteService } from '../../../service/insert-utente.service';

@Component({
  selector: 'app-insert-ruolo-utente',
  templateUrl: './insert-ruolo-utente.component.html',
  styleUrl: './insert-ruolo-utente.component.scss',
})
export class InsertRuoloUtenteComponent {
  @Input()
  utenteId: any;

  listaRuoliDisponibili: any[] = [];
  listaRuoliAssegnati: any[] = [];

  nuovoRuolo: number = 0;

  codiceFiscale = '';
  nome = '';
  cognome = '';
  utente: any;
  utenteDaAggiungere = new NuovoUtenteRequest();

  AllRuoli: any[] = [];

  constructor(private utenteService: InsertUtenteService) {
    utenteService.GetAllRuoli().subscribe((res) => {
      res.forEach((ruolo: any) => {
        let newRuolo = {
          idRuolo: ruolo.syruIdruolosys,
          nomeRuolo: ruolo.syruDescruolosys,
        };
        this.AllRuoli.push(newRuolo);
        
      });
    });
    if (this.utenteId != null) {
      utenteService
        .GetAllInfoUtenteRuoloById(this.utenteId)
        .subscribe((res) => {
          this.utente = res;
          this.listaRuoliAssegnati = this.utente.listaRuoli;
          // this.listaRuoliDisponibili = this.AllRuoli;
          this.listaRuoliDisponibili = this.AllRuoli.filter(
            (ruolo: any) =>
              !this.listaRuoliAssegnati.some(
                (r: any) => r.idRuolo == ruolo.idRuolo
              )
          );
        });

        
      }else this.listaRuoliDisponibili = this.AllRuoli;
    // utenteService.GetAllRuoli().subscribe({
    //   next: (res) => {
    //     res.forEach((ruolo: any) => {
    //       let newRuolo = {
    //         idRuolo: ruolo.syruIdruolosys,
    //         nomeRuolo: ruolo.syruDescruolosys,
    //       };
    //       console.log(newRuolo);
    //       this.AllRuoli.push(newRuolo);
    //     });
    //   }

    // })

    // if (this.utenteId != null) {
    //   utenteService
    //     .GetAllInfoUtenteRuoloById(this.utenteId)
    //     .subscribe((res) => {
    //       this.utente = res;
    //     });
    //   this.listaRuoliAssegnati = this.utente.listaRuoli; //da configurare forse con un map
    //   this.listaRuoliDisponibili = this.AllRuoli;
    // this.listaRuoliDisponibili = this.AllRuoli.filter((ruolo:any) => !this.listaRuoliAssegnati.some((r:any) => r.idRuolo == ruolo.idRuolo))

    //chiamata raccolta info utente e persona
    //riempio ruoli assegnati
  }
  // console.log(this.AllRuoli);

  AggiungiRuolo() {
    if (this.nuovoRuolo != 0) {
      this.utenteDaAggiungere.listaRuoliId.push(this.nuovoRuolo);
      this.listaRuoliAssegnati.push(
        this.AllRuoli.find((ruolo: any) => ruolo.idRuolo == this.nuovoRuolo)
      );
      this.listaRuoliDisponibili = this.listaRuoliDisponibili.filter(
        (ruolo: any) => ruolo.idRuolo != this.nuovoRuolo
      );
    }
  }

  RimuoviRuolo(ruoloId: number) {
    this.utenteDaAggiungere.listaRuoliId =
      this.utenteDaAggiungere.listaRuoliId.filter(
        (ruolo: any) => ruolo.idRuolo != ruoloId
      );
    let ruoloDaAggiungere = this.AllRuoli.find(
      (ruolo: any) => ruolo.idRuolo == ruoloId
    );
    this.listaRuoliDisponibili.push(ruoloDaAggiungere);
    this.listaRuoliAssegnati = this.listaRuoliAssegnati.filter(
      (ruolo: any) => ruolo.idRuolo != ruoloId
    );
  }

  ConfermaModifica() {
    // let uguali = true
    // for(let i = 0;i < this.listaRuoliAssegnati.length;i++ )
    // {
    //   if(!this.utente.listaRuoli.some((r:any) => r.idRuolo == this.listaRuoliAssegnati[i].idRuolo ))
    //   {
    //     uguali = false
    //     break;
    //   }
    // }
      
    // if (this.listaRuoliAssegnati.length != this.utente.listaRuoli.length || !uguali) {
    //   this.utenteService.ConfermaNuovoUtenteModificaRuolo(this.utente);
      
    // } else {
    //   alert('non sono state effettuate modifiche');
    // }
    console.log(this.utente)
    console.log(this.utenteDaAggiungere)
  }
}
