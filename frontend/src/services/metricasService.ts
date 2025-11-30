import api from './api'

interface MetricaRequisicao {
  id: number
  metodo: string
  rota: string
  latenciaMs: number
  tempoProcessamentoMs: number
  tempoRespostaMs: number
  timestamp: string
  statusCode: number
}

interface MetricasAgregadas {
  totalRequisicoes: number
  latenciaMedia: number
  tempoProcessamentoMedio: number
  tempoRespostaMedio: number
}

export const metricasService = {
  getAll: async () => {
    const response = await api.get<MetricaRequisicao[]>('/metricas')
    return response.data
  },

  getAgregadas: async () => {
    const response = await api.get<MetricasAgregadas>('/metricas/agregadas')
    return response.data
  },
}
