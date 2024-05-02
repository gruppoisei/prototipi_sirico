import { Component, OnDestroy } from '@angular/core';
import { AmministrazioneRuoloService } from '../../../../service/amministrazione-ruolo.service';
import { firstValueFrom } from 'rxjs';

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
  ruoloDaAggiungere: any = { nomeRuolo: '', listaFunzioni: <any>[] };

  constructor(private amministrazioneRuolo: AmministrazioneRuoloService) {
    this.ruoloId = this.amministrazioneRuolo.ruoloId;
    this.Start();
    console.log(this.ruoloDaAggiungere)
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
      this.ruoloDaAggiungere.listaFunzioni
      this.listaOriginale = this.ruoloDaAggiungere.listaFunzioni;
      this.listaFunzioniDisponibili = this.AllFunzioni.filter(
        (funzione: Funzione) =>
          !this.ruoloDaAggiungere.listaFunzioni.some(
            (f: any) => f.funzioneId == funzione.funzioneId
          )
      );
      this.ruoloDaAggiungere.listaFunzioni.map((funzione:Funzione) => {
        if(funzione.flagVoceMenu)
          {
            this.listaMenuPadre.push(funzione)
          }
      })
    } else this.listaFunzioniDisponibili = this.AllFunzioni;
  }

  AggiungiFunzione() {
    if (this.nuovaFunzione != 0) {
      this.ruoloDaAggiungere.listaFunzioni.push(
        this.AllFunzioni.find(
          (funzione) => funzione.funzioneId == this.nuovaFunzione
        )
      );
      this.listaFunzioniDisponibili = this.listaFunzioniDisponibili.filter(
        (funzione: Funzione) => funzione.funzioneId != this.nuovaFunzione
      );
    }
    this.nuovaFunzione = 0;  // azzero per evitare multiple aggiunte dello stesso ruolo
  }

  RimuoviFunzione(funzioneId: number) {
    this.ruoloDaAggiungere.listaFunzioni =
      this.ruoloDaAggiungere.listaFunzioni.filter(
        (funzione: Funzione) => funzione.funzioneId != funzioneId
      );
    this.listaFunzioniDisponibili.push(
      this.AllFunzioni.find((funzione) => funzione.funzioneId == funzioneId)!
    );
    this.listaFunzioniDisponibili.sort((a, b) => a.nomeFunzione.toLocaleUpperCase() > b.nomeFunzione.toLocaleUpperCase() ? 1 : -1);
  }

  AggiornaCampo(funzioneId: number, tipoCampo: number, parametroExstra?: number | string) {
    this.ruoloDaAggiungere.listaFunzioni =
      this.ruoloDaAggiungere.listaFunzioni.map((funzione: Funzione) => {


        if (funzione.funzioneId == funzioneId) {
          switch (tipoCampo) {
            case FlagFunzione.voceMenu:
              funzione.flagVoceMenu = !funzione.flagVoceMenu;
              // this.AggiornaListaMenu(funzioneId, funzione.flagVoceMenu)
              break;
            case FlagFunzione.lettura:
              funzione.flagLettura = !funzione.flagLettura;

              break;
            case FlagFunzione.creazione:
              funzione.flagCreazione = !funzione.flagCreazione;

              break;
            case FlagFunzione.modifica:
              funzione.flagModifica = !funzione.flagModifica
              break
            case FlagFunzione.cancellazione:
              funzione.flagCancellazione = !funzione.flagCancellazione;

              break;
            case FlagFunzione.ordinamentoMenu:
              funzione.indiceMenu = Number(parametroExstra)
              break;
            case FlagFunzione.MenuPadre:
              funzione.menuPadre = Number(parametroExstra)
              break;
            default:
              break;
          }
        }
        return funzione;
      });
  }

  AggiornaListaMenu(funzioneId: number, isMenu: boolean) {
    if (isMenu) {
      console.log("22222")
      console.log(funzioneId)
      console.log(this.ruoloDaAggiungere.listaFunzioni)
      console.log("aaaaaaa")
      console.log(this.ruoloDaAggiungere.listaFunzioni.find((funzione:Funzione) => funzione.funzioneId ==funzioneId))
      this.listaMenuPadre.push(this.ruoloDaAggiungere.listaFunzioni.find((funzione:Funzione) => funzione.funzioneId ==funzioneId)!)
    }
    else {
      this.listaMenuPadre = this.listaMenuPadre.filter(funzione => funzione.funzioneId != funzioneId)
      this.ruoloDaAggiungere.listaFunzioni.map((funzione: Funzione) => {
        if (funzione.funzioneId == funzioneId) funzione.menuPadre = null
      })
    }
  }

  Prova()
  {
    console.log(this.ruoloDaAggiungere.listaFunzioni)
  }
  ngOnDestroy(): void {
    this.amministrazioneRuolo.ruoloId = undefined;
  }
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
