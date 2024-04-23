export interface InserimentoContratto {
  codiContrattopersid: number | null;
  codiRalcompenso: number | null;
  codiMonteore: number | null;
  codiDatainiziocontratto: Date | null;
  codiDatafinecontratto: Date | null;
  codiSmartworking: boolean | null;
  codiNote: string | null;
  codiFlagAttiva: number;
  codsDistaccoid: number | null;
  codsValoredistacco: number | null;
  codsDatainiziodistacco: Date | null;
  codsDatafinedistacco: Date | null;
  codsFlagAttiva: number;
  nome: string | null;
  cognome: string | null;
  personaId: number | null;
  codiceFiscale: string | null;
  partitaIva: string | null;        //aggiunto
  ccnlid: number | null;
  descrizioneCCNL: string | null;
  livelloid: number | null;
  livelloContratto: string | null;
  motivid: any | null;
  motivdesc: any | null;
  tipoid: number | null;
  tipodesc: string | null;
  societaDistaccoid: number | null;
  societaPersonaid: number | null;
  societaPersona: string | null;
  clienteDistaccoid: number | null;
  clienteDistacco: any | null;
  sysuser: string;
}
