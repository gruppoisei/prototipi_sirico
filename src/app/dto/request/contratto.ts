export interface Contratto {
    AnpeNome: string | null;
    AnpeCognome: string | null;
    CodiDatainiziocontratto: string | null;
    CodiDatafinecontratto: string | null;
    CotcTipocontrattoid: number | null;
    CodiRalcompenso: number | null;
    costopresuntoannuo: number | null;     // lo includiamo, ma non lo passiamo
    costopresuntogiorno: number | null;    // lo includiamo, ma non lo passiamo
    CodsValoredistacco: number | null;     // percentuale
    CodsDatainiziodistacco: string | null;
    CodsDatafinedistacco: string | null;
    CodiNote: string | null
  }