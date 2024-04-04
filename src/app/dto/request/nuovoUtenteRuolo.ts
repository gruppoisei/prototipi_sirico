
// export class NuovoUtenteRequest
// {
   
//     syurIdutenteruolo? = 0
//     syurFkSyutIdutente? = 0
//     syurFkSyruIdruolosys = 0
//     syurSysuser = "Romolo"
//     syurFlagattivo = 0
//     syutFkAnpePersonaid = 0
//     syutUserName? = ""

// }

export class NuovoUtenteRequest{
    userId?:number
    personaId?:number
    username?:string
    statoAbilitazioneId?:number
    dataAbilitazione?:Date
    datadisabilitazione?:Date
    sysuser:string = ""
    listaRuoliId:number[] =[]
}


