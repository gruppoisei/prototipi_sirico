export interface inserimentoContratto {
  CodiContrattopersid: number | null; 
  AnpeNome: string;
  AnpeCognome: string;
  AnpeCodicefiscale: string;
  AnpePersonaid: number | null;
  AnpePartitaiva: string | null;
  AnsoSocietaid: string | null;
  SocietaPersona: string | null;
  CodiDatainiziocontratto: string;
  CodiDatafinecontratto: string | null;
  Cotctipocontrattoid: number | null;
  TipoContratto: string | null;
  CoccCcnlid: number;
  DescrizioneCCNL: string | null;
  ColiLivelloid: number | null;
  LivelloContratto: string | null;
  CodiRalcompenso: number | null;
  CodiMonteore: number | null;
  CodiSmartworking: boolean | null;
  CodsValoredistacco: number | null;     // percentuale
  
  //QUALCOSA DI STRANO:
  //ansoSocietaDistaccoid: number | null;
  
  CodsDatainiziodistacco: string;
  CodsDatafinedistacco: string | null;
  CodiNote: string | null;
  CodiSysuser: string;
  CodiFlagAttiva: number | null;
  CodsFlagAttiva: number | null;                 // uncheck
  CodsClienteId: number | null;  
  SocietaDistacco: string | null;  
  CodiFkCossVisitamedica: Date | null;
  durataValiditaVisitaMedica: number | null;
  CodiFkCossCorsosicurezza1: Date | null;
  durataValiditaCorsoSicurezza1: number | null;
  CodiFkCossCorsosicurezza2: Date | null;
  durataValiditaCorsoSicurezza2: number | null;
  CodiFkComlIdmotivazione: number | null;
}

