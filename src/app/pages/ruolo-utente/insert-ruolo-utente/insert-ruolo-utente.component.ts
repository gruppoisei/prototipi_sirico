import { Component, Input, OnDestroy } from '@angular/core';
import { NuovoUtenteRequest } from '../../../dto/request/nuovoUtenteRuolo';
import { InsertUtenteService } from '../../../service/insert-utente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCercaPersonaComponent } from '../../dialog-cerca-persona/dialog-cerca-persona.component';
import { Router } from '@angular/router';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-insert-ruolo-utente',
  templateUrl: './insert-ruolo-utente.component.html',
  styleUrl: './insert-ruolo-utente.component.scss',
})
export class InsertRuoloUtenteComponent implements OnDestroy {
  AddRuolo() {
    throw new Error('Method not implemented.');
  }

  utenteId: any = null
  listaRuoliDisponibili: any[] = [];
  listaRuoliAssegnati: any[] = [];
  listaOriginale: any[] = []
  AllRuoli: any[] = [];

  esitoInserimento: number = 0;
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
    public dialog: MatDialog,
    public menuDinamicoService: MenuDinamicoService
  ) {
    this.utenteId = utenteService.utenteId;
    console.log('this.personaSelezionata.username:');
    console.log(this.personaSelezionata.username);
    utenteService.GetAllRuoli().subscribe((res) => {
      res.forEach((ruolo: any) => {
        let newRuolo = {
          idRuolo: ruolo.syruIdruolosys,
          nomeRuolo: ruolo.syruDescruolosys,
        };
        this.AllRuoli.push(newRuolo);
        this.AllRuoli.sort((a, b) => a.nomeRuolo.toLocaleUpperCase() > b.nomeRuolo.toLocaleUpperCase() ? 1 : -1);
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
    } else {
      this.listaRuoliDisponibili = this.AllRuoli;
    }

    this.menuDinamicoService.getPermissionFlag();
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
    this.listaRuoliDisponibili.sort((a, b) => a.nomeRuolo.toLocaleUpperCase() > b.nomeRuolo.toLocaleUpperCase() ? 1 : -1);
    this.listaRuoliAssegnati = this.listaRuoliAssegnati.filter(
      (ruolo: any) => ruolo.idRuolo != ruoloId
    );
  }

  InserisciNuovoUtente() {
    if (this.personaSelezionata.anpePersonaid == -1) {
      alert('Selezionare persona a cui associare utente');
    }
    else if (this.utenteDaAggiungere.username == undefined || this.utenteDaAggiungere.username.length < 8) {
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
        .subscribe((res) => {
          console.log('res: ');
          console.log(res);
         alert(res.message);
         if (res.message == "Inserimento ruolo avvenuto con successo!") {
          this.resetForm();
         }
        });
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
          .subscribe((res) => {
            alert('Modifica ruoli avvenuta con successo!');
          });
      } else {
        alert('Non sono state effettuate modifiche');
      }
    }
  }

  openCercaPersonaModal(parametri?: any) {
    console.log("openCercaPersonaModal()");
    this.utenteService.modalType = "utenza";
    const dialogRef = this.dialog.open(DialogCercaPersonaComponent, {
      disableClose: true,
      width: '75%',
      height: '80%',
    },
    );
    this.utenteService.modalType = undefined;
    dialogRef.afterClosed().subscribe(result => {
      this.personaSelezionata.anpePersonaid = this.utenteService.fieldAutoFill$.value.personaId;
      this.personaSelezionata.anpeNome = this.utenteService.fieldAutoFill$.value.nome;
      this.personaSelezionata.anpeCognome = this.utenteService.fieldAutoFill$.value.cognome;
      this.personaSelezionata.anpeCodicefiscale = this.utenteService.fieldAutoFill$.value.codiceFiscale;
    });
  }

  clearForm() {
    console.log('clearForm()');
    if (confirm('Tutti i dati verranno resettati, griglia inclusa. Procedere?')) {
      this.resetForm();
    }
    else {
      // do nothing
    }
  }

  resetForm() {
    this.personaSelezionata.anpeNome = null;
    this.personaSelezionata.anpeCognome = null;
    this.personaSelezionata.anpeCodicefiscale = null;
    this.utenteDaAggiungere.username = '';
    this.personaSelezionata.anpePersonaid = -1;
    this.resetListaRuoliAssegnati();
  }

  resetListaRuoliAssegnati() {
    for (let i = 0; i < this.listaRuoliAssegnati.length; i++) {
      this.listaRuoliDisponibili.push(this.listaRuoliAssegnati[i]);
    }
    this.listaRuoliDisponibili.sort((a, b) => a.nomeRuolo.toLocaleUpperCase() > b.nomeRuolo.toLocaleUpperCase() ? 1 : -1);
    this.listaRuoliAssegnati = [];
  }

  closeForm() {
    console.log('closeForm()');
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['Segreteria/gestione-ruolo-utente']);
  }
}
