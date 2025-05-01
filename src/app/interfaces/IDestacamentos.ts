export interface IdestacaementoPagination{
    data:Idestacamento[]
    page: number
    limit:number
    total:number
}

export interface Idestacamento{
    destacamentoId: number
    nombre: string
    numero: string
    oro: number
    plata: number
    bronce: number
    total: number
}