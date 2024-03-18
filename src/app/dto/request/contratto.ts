export interface Contratto {
    AnpeNome: string | null;
    AnpeCognome: string | null;
    AnpeCodicefiscale: string | null;
    AnpePersonaid: number | null;
    AnsoSocietaid: string | null;
    CodiDatainiziocontratto: string | null;
    CodiDatafinecontratto: string | null;
    codiFkCotctipocontrattoid: number | null;
    CoccCcnlid: number;
    ColiLivelloid: number | null;
    AnruRuoloid: string | null;
    CodiRalcompenso: number | null;
    CodiMonteore: number | null;
    CodiSmartworking: boolean | null;
    costopresuntoannuo: number | null;     // lo includiamo, ma non lo passiamo
    costopresuntogiorno: number | null;    // lo includiamo, ma non lo passiamo
    CodsValoredistacco: number | null;     // percentuale
    ansoSocietaDistaccoid: number | null;
    CodsDatainiziodistacco: string | null;
    CodsDatafinedistacco: string | null;
    CodiNote: string | null;
    CodiSysuser: string;
    CodiFlagAttiva: number | null;
    CodsFlagAttiva: number;
    CodsClienteId: number | null;
  }