import { Component, OnDestroy } from '@angular/core';
import { AmministrazioneRuoloService } from '../../../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provass',
  templateUrl: './provass.component.html',
  styleUrl: './provass.component.scss',
})
export class ProvassComponent implements OnDestroy {
  ruoloId: any = null;
  nuovaFunzione = 0;
  listaFunzioniDisponibili: Funzione[] = [];
  listaOriginale: Funzione[] = [];
  AllFunzioni: Funzione[] = [];
  listaMenuPadre: Funzione[] = [];
  ruoloDaAggiungere: Ruolo = { nomeRuolo: '', listaFunzioni: <any>[] };

  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService,
    private router: Router
  ) {
    this.ruoloId = this.amministrazioneRuolo.ruoloId;
    this.Start();
  }
  async Start() {
    this.AllFunzioni = await firstValueFrom(
      this.amministrazioneRuolo.getFunzioni()
    );

    if (this.ruoloId != null) {
      this.ruoloDaAggiungere = await firstValueFrom(
        this.amministrazioneRuolo.GetAllInfoFunzioneRuoloById(this.ruoloId)
      );
      this.ruoloDaAggiungere.ruoloId = this.ruoloId;
      this.ruoloDaAggiungere.listaFunzioni;
      this.listaOriginale = this.ruoloDaAggiungere.listaFunzioni;
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

  AggiornaCampo(
    funzioneId: number,
    tipoCampo: number,
    parametroExstra?: number | string
  ) {
    this.ruoloDaAggiungere.listaFunzioni =
      this.ruoloDaAggiungere.listaFunzioni.map((funzione: Funzione) => {
        if (funzione.funzioneId == funzioneId) {
          switch (tipoCampo) {
            case FlagFunzione.voceMenu:
              funzione = this.AggiornaListaMenu(funzione);
              break;
            case FlagFunzione.lettura:
              funzione.flagLettura = !funzione.flagLettura;

              break;
            case FlagFunzione.creazione:
              funzione.flagCreazione = !funzione.flagCreazione;

              break;
            case FlagFunzione.modifica:
              funzione.flagModifica = !funzione.flagModifica;
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
  }

  AggiornaListaMenu(funzione: Funzione) {
    funzione.flagVoceMenu = !funzione.flagVoceMenu;
    if (funzione.flagVoceMenu) {
      funzione.indiceMenu = 0
      funzione.menuPadre = 0
      this.listaMenuPadre.push(this.ruoloDaAggiungere.listaFunzioni.find((funzione:Funzione) => funzione.funzioneId == funzione.funzioneId)!)
    }
    else {
      this.listaMenuPadre = this.listaMenuPadre.filter(funzioneP => funzioneP.funzioneId != funzione.funzioneId)
      this.ruoloDaAggiungere.listaFunzioni.map((funzioneP: Funzione) => {
        if (funzioneP.funzioneId == funzione.funzioneId) funzione.menuPadre = 0
      })
    }
    return funzione;
  }

  async InserisciNuovoRuolo(){
    console.log(this.ruoloDaAggiungere)
    let res = await firstValueFrom(this.amministrazioneRuolo.InserisciAggiornaRuolo(this.ruoloDaAggiungere))
    console.log("aaaaaaaa")
    console.log(res)
    this.router.navigate(["/Segreteria/gestione-ruolo-funzione"])
  }

  async AggiornaFunzioniRuolo() {
    let same = true;
    if (
      this.ruoloDaAggiungere.listaFunzioni.length == this.listaOriginale.length
    ) {
      same = false;
    } else {
      for (var i = 0; i < this.listaOriginale.length; i++) {
        let findFunzione = this.ruoloDaAggiungere.listaFunzioni.find(
          (funz) => funz.funzioneId == this.listaOriginale[i].funzioneId
        );
        if (findFunzione == undefined) {
          same = false;
        }

        if (
          JSON.stringify(findFunzione) != JSON.stringify(this.listaOriginale[i])
        ) {
          same = false;
        }
        if (same == false) {
          break;
        }
      }
    }
    if (same) alert('nessuna modifica riscontrata');
    else {
      let res = await firstValueFrom(
        this.amministrazioneRuolo.InserisciAggiornaRuolo(this.ruoloDaAggiungere)
      );
      console.log(res);
      this.router.navigate(['/Segreteria/gestione-ruolo-funzione']);
    }
  }

  cancellaLista() {
    if (this.ruoloId == null) {
      this.listaMenuPadre = [];
      this.ruoloDaAggiungere.listaFunzioni = [];
    }
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
  menuPadre: number | null;
}
export enum FlagFunzione {
  voceMenu,
  lettura,
  creazione,
  modifica,
  cancellazione,
  ordinamentoMenu,
  MenuPadre,
}
