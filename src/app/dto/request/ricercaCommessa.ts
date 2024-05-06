export interface ricercaCommessa
{
    commessaId: number;
    commessa?: string
    tipoCommessa?: string
    societa?: string;
    clienteDiretto?: string;
    clienteFinale?: string;
    dataInizio?: Date;
    dataFine?: Date;
    note?: string;
    flagAttivo?: boolean;
}