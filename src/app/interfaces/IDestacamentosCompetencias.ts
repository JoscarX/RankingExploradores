export interface IDestacamentosCompetencias{
    destacamentoId: number
    competenciaId: number
    competencia: any
    destacamento: Destacamento
}

export interface Destacamento {
    destacamentoId: number
    nombre: string
    numero: string
    oro: number
    plata: any
    bronce: any
    total: any
  }

  export interface ISetDestacamentoCompetencias{
    destacamentoId: number
    competenciaId: number
  }