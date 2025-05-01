export interface IcompetenciaPaginada{
    data:ICompetencias[]
    total:number
    page:number
    limit:number
}

export interface ICompetencias{
    competenciasId: number | null
    nombre: string 
    descripcion: string  
    reglas: string 
    encargados: string 
    oro: string | null
    plata: string | null
    bronce: string | null
    dia: string 
    hora: string 
    division:string
}