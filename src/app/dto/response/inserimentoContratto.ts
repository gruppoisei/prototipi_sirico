export interface inserimentoContratto {
  codiContrattopersid: number | null; 
  anpeNome: string;
  anpeCognome: string;
  anpeCodicefiscale: string;
  anpePersonaid: number | null;
  anpePartitaiva: string | null;
  ansoSocietaid: string | null;
  societaPersona: string | null;
  codiDatainiziocontratto: string;
  codiDatafinecontratto: string | null;
  cotctipocontrattoid: number | null;
  tipoContratto: string | null;
  coccCcnlid: number;
  descrizioneCCNL: string | null;
  coliLivelloid: number | null;
  livelloContratto: string | null;
  codiRalcompenso: number | null;
  codiMonteore: number | null;
  codiSmartworking: boolean | null;
  codsValoredistacco: number | null;     // percentuale
  codsDatainiziodistacco: string | null;
  codsDatafinedistacco: string | null;
  codiNote: string | null;
  codiSysuser: string;
  codiFlagAttiva: number | null;
  codsFlagAttiva: number | null;                 // uncheck
  codsClienteId: number | null;  
  societaDistacco: string | null;  
  codiFkCossVisitamedica: Date | null;
  durataValiditaVisitaMedica: number | null;
  codiFkCossCorsosicurezza1: Date | null;
  durataValiditaCorsoSicurezza1: number | null;
  codiFkCossCorsosicurezza2: Date | null;
  durataValiditaCorsoSicurezza2: number | null;
  codiFkComlIdmotivazione: number | null;
}

