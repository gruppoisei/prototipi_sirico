export interface InfoPersona {
  listaSedeLavoroPersona: SedePersona[]
  listaAttivitaProgettoPersona: ProgettoPersona[]
}

export interface SedePersona {
  sedeLavodoPersonaId: number
  nomeSedeLavoro: string
}

export interface ProgettoPersona {
  attivitaProgettoPersonaId: number
  nomeProgetto: string
}
