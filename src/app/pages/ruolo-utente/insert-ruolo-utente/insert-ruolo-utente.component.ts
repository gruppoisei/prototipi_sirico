import { Component, Input, OnDestroy } from '@angular/core';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';
import { InsertUtenteService } from '../../../service/insert-utente.service';
import { MatDialog } from '@angular/material/dialog';
//import { CercaPersonaSenzaUtenteComponent } from './cerca-persona-senza-utente/cerca-persona-senza-utente.component';
import { DialogCercaPersonaComponent } from '../../dialog-cerca-persona/dialog-cerca-persona.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-ruolo-utente',
  templateUrl: './insert-ruolo-utente.component.html',
  styleUrl: './insert-ruolo-utente.component.scss',
})
export class InsertRuoloUtenteComponent implements OnDestroy {
AddRuolo() {
throw new Error('Method not implemented.');
}

  // @Input()
  utenteId: any = null
  // utenteId = 1;

  listaRuoliDisponibili: any[] = [];
  listaRuoliAssegnati: any[] = [];
  listaOriginale: any[] = []
  AllRuoli: any[] = [];

  nuovoRuolo: number = 0;
  personaSelezionata = {
    anpeNome: null,
    anpeCognome: null,
    anpeCodicefiscale: null,
    listaRuoli: [],
    username: null,
    anpePersonaid: -1,
  };

  utenteDaAggiungere = new NuovoUtenteRequest();


  constructor(
    private utenteService: InsertUtenteService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.utenteId = utenteService.utenteId;

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
        .subscribe((res: any) => {


          this.personaSelezionata.anpeNome = res.nome;
          this.personaSelezionata.anpeCognome = res.cognome;
          this.personaSelezionata.anpeCodicefiscale = res.codiceFiscale;
          this.personaSelezionata.username = res.username;

          this.utenteDaAggiungere.userId = this.utenteId;
          this.utenteDaAggiungere.listaRuoliId = [];
          res.listaRuoli.map((ruolo: any) => {
            this.utenteDaAggiungere.listaRuoliId.push(ruolo.idRuolo);
            this.listaOriginale.push(ruolo.idRuolo)

          }
          );

          this.listaRuoliAssegnati = res.listaRuoli;
          this.listaRuoliDisponibili = this.AllRuoli.filter(
            (ruolo: any) =>
              !this.listaRuoliAssegnati.some(
                (r: any) => r.idRuolo == ruolo.idRuolo
              )
          );
        });
    } else this.listaRuoliDisponibili = this.AllRuoli;
  }
  ngOnDestroy(): void {
    this.utenteService.utenteId = undefined
  }

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
    this.nuovoRuolo = 0;  // azzero per evitare multiple aggiunte dello stesso ruolo
  }

  RimuoviRuolo(ruoloId: number) {
    this.utenteDaAggiungere.listaRuoliId =
      this.utenteDaAggiungere.listaRuoliId.filter(
        (ruolo: any) => ruolo != ruoloId
      );
    let ruoloDaAggiungere = this.AllRuoli.find(
      (ruolo: any) => ruolo.idRuolo == ruoloId
    );
    this.listaRuoliDisponibili.push(ruoloDaAggiungere);
    this.listaRuoliAssegnati = this.listaRuoliAssegnati.filter(
      (ruolo: any) => ruolo.idRuolo != ruoloId
    );
  }

  /*
    InserisciNuovoUtente() {
      console.log('InserisciNuovoUtente()');
      console.log('this.personaSelezionata: ');
      console.log(this.personaSelezionata);
      //console.log('utente da aggiungere: ' + this.utenteDaAggiungere);
  
      //this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.id;
  
      //console.log('idPersona: ' + this.personaSelezionata.anpePersonaid);    
      //if (this.personaSelezionata != undefined) {
  
  
      console.log('this.personaSelezionata.anpePersonaid: ' + this.personaSelezionata.anpePersonaid);
      if (this.personaSelezionata.anpePersonaid != undefined) {
        if (this.personaSelezionata.anpePersonaid == -1) { alert('Selezionare persona a cui associare utente'); }
        //else { this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.id; }
        else if (this.utenteDaAggiungere != undefined)
          if (this.utenteDaAggiungere.username != undefined)
            if (this.utenteDaAggiungere.username.length < 8)
              alert('username non valido');
            else if (this.utenteDaAggiungere.listaRuoliId.length == 0)
              alert("assegnare almeno un ruolo all'utente");
            else {
              //this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.id;
              this.utenteDaAggiungere.personaId = this.personaSelezionata.anpePersonaid;
              console.log(this.utenteDaAggiungere);
              this.utenteService
                .ConfermaNuovoUtenteModificaRuolo(this.utenteDaAggiungere)
                .subscribe((res) => console.log(res));
            }
            
      } else alert('riempire campi per procedere');
    }
  */

  InserisciNuovoUtente() {
    /*
    console.log('this.personaSelezionata: ');
    console.log(this.personaSelezionata.anpePersonaid);
    console.log('this.utenteDaAggiungere: ');
    console.log(this.utenteDaAggiungere);
    */
    if (this.personaSelezionata.anpePersonaid == -1) {
      alert('Selezionare persona a cui associare utente');
    }
    else if (this.utenteDaAggiungere.username == undefined || this.utenteDaAggiungere.username.length < 8) {
    //else if (this.personaSelezionata.username ) {
      alert('Username non valido');
    }
    else if (this.utenteDaAggiungere.listaRuoliId.length == 0) {
      alert("Assegnare almeno un ruolo all'utente");
    }
    else {
      this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.id;
      this.utenteDaAggiungere.personaId = this.personaSelezionata.anpePersonaid;
      console.log(this.utenteDaAggiungere);
      this.utenteService
        .ConfermaNuovoUtenteModificaRuolo(this.utenteDaAggiungere)
        .subscribe((res) =>
          //console.log(res)
          alert('Inserimento avvenuto con successo!')
      );
        this.clearForm();
    }
  }

  AggiornaRuoliUtente() {

    if (this.utenteDaAggiungere.listaRuoliId.length == 0) {
      alert('inserire almeno un ruolo');
    } else {
      let uguali = true;
      for (let i = 0; i < this.listaOriginale.length; i++) {
        if (
          !this.utenteDaAggiungere.listaRuoliId.some(
            (r: any) => r == this.listaOriginale[i]
          )
        ) {
          uguali = false;
          break;
        }
      }

      if (
        this.listaOriginale.length !=
        this.utenteDaAggiungere.listaRuoliId.length ||
        !uguali
      ) {
        this.utenteService
          .ConfermaNuovoUtenteModificaRuolo(this.utenteDaAggiungere)
          .subscribe((res) => 
            //console.log(res)
            alert('Modifica ruoli avvenuta con successo!')
        );

      } else {
        alert('non sono state effettuate modifiche');
      }
    }
  }

  openCercaPersonaModal(parametri?: any) {
    console.log("openCercaPersonaModal()");
    this.utenteService.modalType = "utenza";
    //this.inserimentoContrattoService.cognomePersonaCronologiaDistacchi = cognomePersona;
    const dialogRef = this.dialog.open(DialogCercaPersonaComponent, {
      width: '75%',
      height: '80%',
    });
    this.utenteService.modalType = undefined;
    dialogRef.afterClosed().subscribe(result => {
      this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.personaId;
      this.personaSelezionata.anpeNome = this.utenteService.fieldAutoFill$.value.nome;
      this.personaSelezionata.anpeCognome = this.utenteService.fieldAutoFill$.value.cognome;
      this.personaSelezionata.anpeCodicefiscale = this.utenteService.fieldAutoFill$.value.codiceFiscale;
    });
  }

  /*
  ScegliPersonaDaAssociare() {
    const dialogRef = this.dialog.open(CercaPersonaSenzaUtenteComponent, {
      data: this.personaSelezionata,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      console.log('The dialog was closed');
      this.personaSelezionata = result;
    });
  }
  */

  clearForm() {
    console.log('clearForm()');
    if (confirm('I campi verranno resettati. Procedere?')) {
      this.personaSelezionata.anpeNome = null;
      this.personaSelezionata.anpeCognome = null;
      this.personaSelezionata.anpeCodicefiscale = null;
      //this.personaSelezionata.listaRuoli = [];
      //this.personaSelezionata.username = null;
      this.utenteDaAggiungere.username = '';
      this.personaSelezionata.anpePersonaid = -1;
    }
    else {
      // do nothing
    }
  }

  closeForm() {
    console.log('closeForm()');
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['Segreteria/gestione-ruolo-utente']);
  }

}
