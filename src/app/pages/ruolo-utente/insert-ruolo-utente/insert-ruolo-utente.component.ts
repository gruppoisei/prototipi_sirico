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
import { findIndex } from 'rxjs';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';

@Component({
  selector: 'app-insert-ruolo-utente',
  templateUrl: './insert-ruolo-utente.component.html',
  styleUrl: './insert-ruolo-utente.component.scss',
})
export class InsertRuoloUtenteComponent {

  @Input()
  utente:any


  constructor()
  {
    this.listaRuoliDisponibili = this.AllRuoli
  }
  AllRuoli = [
        { idRuolo: 1, nomeRuolo: 'utente' },
        { idRuolo: 2, nomeRuolo: 'dipentente' },
        { idRuolo: 3, nomeRuolo: 'amministazione' },
        { idRuolo: 4, nomeRuolo: 'segreteria' },
        { idRuolo: 5, nomeRuolo: 'tecnico' },
      ];
      listaRuoliDisponibili:any = []


      listaRuoliAssegnati:NuovoUtenteRequest[] = []
      nuovoRuolo:number = 0

      username = ""
      codiceFiscale = ""
      nome = ""
      cognome = ""
      listaRuoli:any = []

  AggiungiRimuoviRuolo()
  {
    
    if(this.nuovoRuolo != 0 && this.username.length > 2)
    {
      let ruoloDaAggiungere = new NuovoUtenteRequest()
      ruoloDaAggiungere.syutUserName = this.username
      ruoloDaAggiungere.syurFkSyruIdruolosys = this.nuovoRuolo
      console.log(ruoloDaAggiungere)
      this.listaRuoliDisponibili =this.listaRuoliDisponibili.filter((ruolo:any) =>  ruolo.idRuolo != this.nuovoRuolo)
      this.listaRuoliAssegnati.push(ruoloDaAggiungere);
    }
  }
}