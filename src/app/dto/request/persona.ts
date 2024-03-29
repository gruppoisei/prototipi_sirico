export interface Persona {
  personaId: number | null
  nome: string
  cognome: string
  dataNascita: string
  luogoNascita: number | null
  provinciaNascita: number | null
  indirizzoResidenza: string
  numeroCivicoResidenza: string
  capResidenza: string
  indirizzoDomicilio: string
  numeroCivicoDomicilio: string
  capDomicilio: string
  codiceFiscale: string
  societaId: number
  emailAziendale: string
}
