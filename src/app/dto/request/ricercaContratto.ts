export interface ricercaContratto {
  AnpeNome: string
  AnpeCognome: string
  AnpeCodicefiscale: string
  AnpePersonaid: number | null
  AnsoSocietaid: string | null
  CodiDatainiziocontratto: string
  CodiDatafinecontratto: string
  codiFkCotctipocontrattoid: number | null
  CoccCcnlid: number
  ColiLivelloid: number | null
  AnruRuoloid: string | null
  CodiRalcompenso: number | null
  CodiMonteore: number | null
  CodiSmartworking: boolean | null
  costopresuntomese: number | null // lo includiamo, ma non lo passiamo
  costopresuntogiorno: number | null // lo includiamo, ma non lo passiamo
  CodsValoredistacco: number | null // percentuale
  ansoSocietaDistaccoid: number | null
  CodsDatainiziodistacco: string
  CodsDatafinedistacco: string
  CodiNote: string | null
  CodiSysuser: string
  CodiFlagAttiva: number | null
  CodsFlagAttiva: number | null // uncheck
  CodsClienteId: number | null

  // altro
  // Proprietà relative alla tabella CODI_CONTRATTOPERS
  CodiContrattopersid: number | null

  // Proprietà relative alla tabella CODS_DISTACCO
  //public int? CodsDistaccoid { get; set; }

  // Altre proprietà relative alle tabelle chiamate
  TipoContratto: string | null
  DescrizioneCCNL: string | null
  LivelloContratto: string | null
  SocietaDistacco: string
  SocietaPersona: string
}
