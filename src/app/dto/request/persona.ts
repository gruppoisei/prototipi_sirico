export interface Persona
{
    personaId : number;
    nome : string,
    cognome : string;
    datanascita : Date;
    dataVisitaMedica : Date | null;
    dataScadenzaMedica : Date | null;
    dataCorsoSicurezza : Date | null;
    societaId : number | null;
    codicefiscale : string;
    p_iva : string | null;
    paeseNascita : number | null;
    paeseDomicilio : number | null;
    paeseResidenza : number | null;
    comuneNascita : number | null;
    comuneResidenza : number | null;
    comuneDomicilio : number | null;
    toponimoResidenza : number | null;
    toponimoDomicilio : number | null;
    indirizzoResidenza : string;
    civicoResidenza : string;
    capResidenza : string;
    indirizzoDomicilio : string | null;
    civicoDomicilio : string | null;
    capDomicilio : string | null;
    telefono1 : string | null;
    telefono2 : string | null;
    emailAziendale : string;
    emailPersonale : string | null;
    sysuser : string;

}