export enum TipoAeronave {
  COMERCIAL = 'COMERCIAL',
  MILITAR = 'MILITAR',
}

export enum TipoPeca {
  NACIONAL = 'NACIONAL',
  IMPORTADA = 'IMPORTADA',
}

export enum StatusPeca {
  PRODUCAO = 'PRODUCAO',
  TRANSPORTE = 'TRANSPORTE',
  PRONTA = 'PRONTA',
}

export enum StatusEtapa {
  PENDENTE = 'PENDENTE',
  ANDAMENTO = 'ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
}

export enum NivelPermissao {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ENGENHEIRO = 'ENGENHEIRO',
  OPERADOR = 'OPERADOR',
}

export enum TipoTeste {
  ELETRICO = 'ELETRICO',
  HIDRAULICO = 'HIDRAULICO',
  AERODINAMICO = 'AERODINAMICO',
}

export enum ResultadoTeste {
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
}

export interface Funcionario {
  id: number
  nome: string
  telefone: string
  endereco: string
  usuario: string
  senha: string
  nivelPermissao: NivelPermissao
  etapas?: Etapa[]
  createdAt: string
  updatedAt: string
}

export interface Aeronave {
  id: number
  codigo: string
  modelo: string
  tipo: TipoAeronave
  capacidade: number
  alcance: number
  pecas?: Peca[]
  etapas?: Etapa[]
  testes?: Teste[]
  createdAt: string
  updatedAt: string
}

export interface Peca {
  id: number
  nome: string
  tipo: TipoPeca
  fornecedor: string
  status: StatusPeca
  aeronaveId: number
  aeronave?: Aeronave
  createdAt: string
  updatedAt: string
}

export interface Teste {
  id: number
  tipo: TipoTeste
  resultado: ResultadoTeste
  aeronaveId: number
  aeronave?: Aeronave
  createdAt: string
  updatedAt: string
}

export interface Etapa {
  id: number
  nome: string
  prazo: string
  status: StatusEtapa
  aeronaveId: number
  aeronave?: Aeronave
  funcionarios?: Funcionario[]
  createdAt: string
  updatedAt: string
}
