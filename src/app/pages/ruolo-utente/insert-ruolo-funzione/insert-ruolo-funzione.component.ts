import { Component, OnDestroy } from '@angular/core';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-provass',
  templateUrl: './insert-ruolo-funzione.component.html',
  styleUrl: './insert-ruolo-funzione.component.scss',
})
export class InsertRuoloFunzioneComponent implements OnDestroy {
  ruoloId: any = null;
  ruoloNome: string = "";
  nuovaFunzione = 0;
  listaFunzioniDisponibili: Funzione[] = [];
  listaOriginale: Funzione[] = [];
  AllFunzioni: Funzione[] = [];
  // nuovoMenuPadre = 0; // 
  listaMenuPadre: Funzione[] = [];
  ruoloDaAggiungere: Ruolo = { nomeRuolo: '', listaFunzioni: <any>[] };

  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.ruoloId = this.amministrazioneRuolo.ruoloId;
    this.Start();
  }

  async Start() {
    this.AllFunzioni = await firstValueFrom(
      this.amministrazioneRuolo.getFunzioni()
    );

    if (this.ruoloId != null) {

      await this.ReimpostaLista();
      //console.log(this.ruoloDaAggiungere);
      this.ruoloNome = this.ruoloDaAggiungere.nomeRuolo;
      console.log(this.ruoloDaAggiungere)
    } else this.listaFunzioniDisponibili = this.AllFunzioni;

  }

  AggiungiFunzione() {
    if (this.nuovaFunzione != 0) {
      this.ruoloDaAggiungere.listaFunzioni.push(
        this.AllFunzioni.find(
          (funzione) => funzione.funzioneId == this.nuovaFunzione
        )!
      );
      this.listaFunzioniDisponibili = this.listaFunzioniDisponibili.filter(
        (funzione: Funzione) => funzione.funzioneId != this.nuovaFunzione
      );
    }
    this.nuovaFunzione = 0; // azzero per evitare multiple aggiunte dello stesso ruolo
  }

  RimuoviFunzione(funzioneId: number) {
    this.ruoloDaAggiungere.listaFunzioni =
      this.ruoloDaAggiungere.listaFunzioni.filter(
        (funzione: Funzione) => funzione.funzioneId != funzioneId
      );
    this.listaFunzioniDisponibili.push(
      this.AllFunzioni.find((funzione) => funzione.funzioneId == funzioneId)!
    );
    this.listaFunzioniDisponibili.sort((a, b) =>
      a.nomeFunzione.toLocaleUpperCase() > b.nomeFunzione.toLocaleUpperCase()
        ? 1
        : -1
    );
    this.listaMenuPadre = this.listaMenuPadre.filter(
      (funzione) => funzione.funzioneId != funzioneId
    );
  }

  AggiornaCampo(funzioneId: number, tipoCampo: number) {
    this.ngZone.run(() => {
        this.ruoloDaAggiungere.listaFunzioni =
            this.ruoloDaAggiungere.listaFunzioni.map((funzione: Funzione) => {
                if (funzione.funzioneId == funzioneId) {
                    switch (tipoCampo) {
                        case FlagFunzione.voceMenu:
                            funzione = this.AggiornaListaMenu(funzione);
                            break;
                        case FlagFunzione.lettura:
                            funzione.flagLettura = !funzione.flagLettura;
                            if (!funzione.flagLettura && funzione.flagModifica) {
                                funzione.flagModifica = false;
                            }
                            break;
                        case FlagFunzione.creazione:
                            funzione.flagCreazione = !funzione.flagCreazione;
                            break;
                        case FlagFunzione.modifica:
                            funzione.flagModifica = !funzione.flagModifica;
                            if (funzione.flagModifica) {
                                funzione.flagLettura = true;
                            }
                            break;
                        case FlagFunzione.cancellazione:
                            funzione.flagCancellazione = !funzione.flagCancellazione;
                            break;
                        default:
                            break;
                    }
                }
                return funzione;
            });
        this.cdr.detectChanges();
    });
}




  AggiornaIndiciMenu(id: number, valore: number) {

    this.ruoloDaAggiungere.listaFunzioni = this.ruoloDaAggiungere.listaFunzioni.map(funzione => {
      if (funzione.indiceMenu == valore && funzione.funzioneId != id) {
        for (let i = this.ruoloDaAggiungere.listaFunzioni.length; i > 0; i--) {
          if (this.ruoloDaAggiungere.listaFunzioni.find(funz => funz.indiceMenu == i) == undefined) {
            funzione.indiceMenu = i
          }
        }
      }
      return funzione
    })
  }


  AggiornaListaMenu(funzione: Funzione) {
    funzione.flagVoceMenu = !funzione.flagVoceMenu;
    if (funzione.flagVoceMenu) {
      funzione.indiceMenu = this.listaMenuPadre.length + 1
      this.AggiornaIndiciMenu(funzione.funzioneId!, funzione.indiceMenu)
      funzione.menuPadre = 0
      this.listaMenuPadre.push(this.ruoloDaAggiungere.listaFunzioni.find((funzioneP: Funzione) => funzioneP.funzioneId == funzione.funzioneId)!)
      this.listaMenuPadre.sort((a, b) => a.nomeFunzione.toLocaleUpperCase() > b.nomeFunzione.toLocaleUpperCase() ? 1 : -1);
    }
    else {
      funzione.indiceMenu = 0
      this.listaMenuPadre = this.listaMenuPadre.filter(funzioneP => funzioneP.funzioneId != funzione.funzioneId)
      this.ruoloDaAggiungere.listaFunzioni.map((funzioneP: Funzione) => {
        if (funzioneP.funzioneId == funzione.funzioneId) funzione.menuPadre = 0
        this.AggiornaIndiciMenu(funzione.funzioneId!, this.listaMenuPadre.length + 1)
      })

    }
    return funzione;
  }


  async InserisciNuovoRuolo() {
    if (this.ruoloDaAggiungere.nomeRuolo == null || this.ruoloDaAggiungere.nomeRuolo == undefined || this.ruoloDaAggiungere.nomeRuolo == "") {
      alert('Inserire un nome ruolo!');
    }
    else if (this.ruoloDaAggiungere.listaFunzioni.length == 0) {
      alert('Inserire almeno una funzione da associare al ruolo');
    }
    else {
      //console.log(this.ruoloDaAggiungere)
      let res = await firstValueFrom(this.amministrazioneRuolo.InserisciAggiornaRuolo(this.ruoloDaAggiungere));
      alert(res.message);

      if (res.message == "Ruolo salvato con successo!") {
        this.router.navigate(["/Segreteria/gestione-ruolo-funzione"]);
      }
    }
  }

  async AggiornaFunzioniRuolo() {
    if (this.ruoloDaAggiungere.nomeRuolo == "" || this.ruoloDaAggiungere.nomeRuolo == null || this.ruoloDaAggiungere.nomeRuolo == undefined) {
      alert('Inserire un nome ruolo!');
    }
    else if (this.ruoloDaAggiungere.listaFunzioni.length == 0) {
      alert('Aggiungere almeno una funzione da associare al ruolo!');
    }
    else {
      let same = true;
      if (
        this.ruoloDaAggiungere.listaFunzioni.length != this.listaOriginale.length
      ) {
        same = false;
      }
      else if (this.ruoloNome != this.ruoloDaAggiungere.nomeRuolo) {
        same = false;
      } else {
        for (var i = 0; i < this.listaOriginale.length; i++) {
          if (same == false) {
            break;
          }
          let findFunzione = this.ruoloDaAggiungere.listaFunzioni.find(
            (funz) => funz.funzioneId == this.listaOriginale[i].funzioneId
          );
          if (findFunzione == undefined) {
            same = false;
          } else {

            if (
              JSON.stringify(findFunzione) != JSON.stringify(this.listaOriginale[i])
            ) {
              same = false;
            }
          }
        }
      }

      if (same) alert('Nessuna modifica riscontrata')
      else {

        let res = await firstValueFrom(this.amministrazioneRuolo.InserisciAggiornaRuolo(this.ruoloDaAggiungere));
        //console.log('res.message:');
        //console.log(res.message);
        alert(res.message);

        if (res.message == "Ruolo salvato con successo!") {
          this.router.navigate(['/Segreteria/gestione-ruolo-funzione']);
        }
      }
    }
    //console.log(this.ruoloDaAggiungere)
  }

  /*
    SortListaFunzioni() {
      let i = 0
      this.ruoloDaAggiungere.listaFunzioni = this.ruoloDaAggiungere.listaFunzioni.sort((a, b) => {
        i = i++
        //console.log("prova " + i + "  " + a.nomeFunzione + "  " + a.indiceMenu + b.nomeFunzione + "  " + b.indiceMenu)
        if (b.indiceMenu == 0) return -1
        if (a.indiceMenu == 0) return 1
        if (a.indiceMenu < b.indiceMenu) return -1
        return 1
      })    
    }*/

  CancellaLista() {
    this.listaMenuPadre = []
    this.ruoloDaAggiungere.listaFunzioni = []
    this.listaFunzioniDisponibili = this.AllFunzioni
    this.listaMenuPadre = []
  }

  async ReimpostaLista() {
    this.ruoloDaAggiungere = await firstValueFrom(
      this.amministrazioneRuolo.GetAllInfoFunzioneRuoloById(this.ruoloId)
    );
    this.ruoloDaAggiungere.ruoloId = this.ruoloId;
    let strings = JSON.stringify(this.ruoloDaAggiungere.listaFunzioni)
    this.listaOriginale = JSON.parse(strings)


    this.listaFunzioniDisponibili = this.AllFunzioni.filter(
      (funzione: Funzione) =>
        !this.ruoloDaAggiungere.listaFunzioni.some(
          (f: any) => f.funzioneId == funzione.funzioneId
        )
    );
    this.ruoloDaAggiungere.listaFunzioni.map((funzione: Funzione) => {
      if (funzione.flagVoceMenu) {
        this.listaMenuPadre.push(funzione);
      }
    });
    //this.SortListaFunzioni()
  }

  CloseForm() {
    this.router.navigate(['/Home']);
  }

  ngOnDestroy(): void {
    this.amministrazioneRuolo.ruoloId = undefined;
  }

}

export interface Ruolo {
  ruoloId?: number;
  nomeRuolo: string;
  listaFunzioni: Funzione[];
}
export interface Funzione {
  funzioneId?: number;
  nomeFunzione: string;
  flagLettura: boolean;
  flagCancellazione: boolean;
  flagVoceMenu: boolean;
  flagModifica: boolean;
  flagCreazione: boolean;
  indiceMenu: number;
  menuPadre: number;
/*   menuPadre: number | null;
 */}
export enum FlagFunzione {
  voceMenu,
  lettura,
  creazione,
  modifica,
  cancellazione,
  ordinamentoMenu,
  MenuPadre,
}
