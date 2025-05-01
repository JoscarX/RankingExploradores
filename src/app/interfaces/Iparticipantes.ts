import { Idestacamento } from "./IDestacamentos"

export interface Iparticipantes{
    participanteID: number
    nombreCompleto: string
    puntosArquero: number
    destacamentoID: number
    competenciaID: number
}

export interface IparticipantesCompetenciaPaginationParameters{
    page: number
    limit: number
    search: string
    competenciaID: number
}

export interface IparticipantesPagination{
    data:Iparticipantes[]
    total:number
    page:number
    limit:number
}

export interface IparticipantesCompetenciaPagination{
    data: IparticipantesDestacamento[]
    total:number
    page:number
    limit:number
}

export interface IparticipantesDestacamento{
    participanteID: number
    nombreCompleto: string
    puntosArquero: number
    destacamentoID: number
    competenciaID: number
    destacamento: any
}
