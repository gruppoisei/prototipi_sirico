export interface Contratto {
    AnpeNome: string | null;
    AnpeCognome: string | null;
    AnpeCodicefiscale: string | null;
    AnpePersonaid: number;
    AnsoSocietaid: string | null;
    CodiDatainiziocontratto: string | null;
    CodiDatafinecontratto: string | null;
    CotcTipocontrattoid: number | null;
    CoccCcnlid: number;
    ColiLivelloid: number | null;
    AnruRuoloid: string | null;
    CodiRalcompenso: number | null;
    CodiMonteore: number | null;
    smartworking: boolean | null;
    costopresuntoannuo: number | null;     // lo includiamo, ma non lo passiamo
    costopresuntogiorno: number | null;    // lo includiamo, ma non lo passiamo
    CodsValoredistacco: number | null;     // percentuale
    AnsoSocietaDistaccoid: number | null;
    CodsDatainiziodistacco: string | null;
    CodsDatafinedistacco: string | null;
    CodiNote: string | null;
    CosiSysuser: string;
  }