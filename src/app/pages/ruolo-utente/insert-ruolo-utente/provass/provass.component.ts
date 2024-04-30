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
  nuovaFunzione = 0
  listaFunzioniDisponibili: Funzione[] = [];
  listaOriginale: Funzione[] = [];
  AllFunzioni: Funzione[] = [];

  ruoloDaAggiungere = { nomeRuolo: '', ruoloId: '', listaFunzioni: <any>[] };

  constructor(private amministrazioneRuolo: AmministrazioneRuoloService) {
    this.ruoloId = this.amministrazioneRuolo.ruoloId;
    this.Save();
  }
  async Save() {
    this.AllFunzioni = await firstValueFrom(this.amministrazioneRuolo.getFunzioni())
    
    if (this.ruoloId != null) {
      this.ruoloDaAggiungere = await firstValueFrom(this.amministrazioneRuolo.GetAllInfoFunzioneRuoloById(this.ruoloId))
      this.ruoloDaAggiungere.ruoloId = this.ruoloId
      
      this.listaOriginale = this.ruoloDaAggiungere.listaFunzioni
      this.listaFunzioniDisponibili = this.AllFunzioni.filter(
        (funzione: Funzione) =>
          !this.ruoloDaAggiungere.listaFunzioni.some(
            (f: any) => f.funzioneId == funzione.funzioneId
          )
      );
    } else this.listaFunzioniDisponibili = this.AllFunzioni;

  }

  AggiungiFunzione()
  {
    if(this.nuovaFunzione != 0 )
      {
        this.ruoloDaAggiungere.listaFunzioni.push(this.AllFunzioni.find(funzione => funzione.funzioneId == this.nuovaFunzione))
        this.listaFunzioniDisponibili = this.listaFunzioniDisponibili.filter(
          (funzione:Funzione) => funzione.funzioneId != this.nuovaFunzione
        )
        
      }
  }

  RimuoviFunzione(funzioneId:number)
  {
    this.ruoloDaAggiungere.listaFunzioni = this.ruoloDaAggiungere.listaFunzioni.filter((funzione:Funzione) => funzione.funzioneId != funzioneId)
    this.listaFunzioniDisponibili.push(this.AllFunzioni.find((funzione) => funzione.funzioneId == funzioneId)!)

  }

  AggiornaCampo(funzioneId:number,tipoCampo:number){
    let funz:Funzione = this.ruoloDaAggiungere.listaFunzioni.find((funzione:Funzione) => funzione.funzioneId == funzioneId)
    if(tipoCampo == FlagFunzione.cancellazione){}
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
export enum FlagFunzione{
  voceMenu,
  lettura,
  creazione,
  modifica,
  cancellazione,
  ordinamentoMenu,
  menuPadre,

}