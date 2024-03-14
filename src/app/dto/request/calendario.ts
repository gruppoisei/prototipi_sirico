

export class CalendarioRequest {
    
    listaAttivitaPersona: AttivitaPersona[] = []
    rapportino: Rapportino = new Rapportino()
    giorniFestivi: Date[] = []
    listaGiorniLavoroMese: GiornoDiLavoro[] = []
}

export class GiornoDiLavoro{
    giornoLavorativoId?:number;
    dataNumero?:number;
    oraEntrata = "09:00";
    oraInizioPausa = "13:00";
    oraFinePausa = "14:00";
    oraUscita = "18:00";
    listaAttivitaGiorno:AttivitaGiornoCalendario[] = []
}


export class AttivitaGiornoCalendario{

    attivitaId?:number;
    nomeProgetto?:string;
    oreLavorate = 8;
    oreStraordinario = 0;
    sedeLavoro?: string;

}

export class Rapportino{
    rapportinoId?:number;
    dataRapportino?:Date;
    confermaRapportino?:boolean
    definitivoRapportino?:boolean
}

export class AttivitaPersona {
    attivitaPersonaId?:number;
    nomeProgetto?:string;
}