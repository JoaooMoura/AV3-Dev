import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getMetricas = async (req: Request, res: Response) => {
  try {
    const metricas = await prisma.metricaRequisicao.findMany({
      orderBy: { timestamp: 'desc' },
      take: 1000,
    })
    res.json(metricas)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar métricas' })
  }
}

export const getMetricasAgregadas = async (req: Request, res: Response) => {
  try {
    const metricas = await prisma.metricaRequisicao.findMany()
    
    const totalRequisicoes = metricas.length
    
    if (totalRequisicoes === 0) {
      return res.json({
        totalRequisicoes: 0,
        latenciaMedia: 0,
        tempoProcessamentoMedio: 0,
        tempoRespostaMedio: 0,
      })
    }
    
    const latenciaMedia = metricas.reduce((acc, m) => acc + m.latenciaMs, 0) / totalRequisicoes
    const tempoProcessamentoMedio = metricas.reduce((acc, m) => acc + m.tempoProcessamentoMs, 0) / totalRequisicoes
    const tempoRespostaMedio = metricas.reduce((acc, m) => acc + m.tempoRespostaMs, 0) / totalRequisicoes
    
    res.json({
      totalRequisicoes,
      latenciaMedia,
      tempoProcessamentoMedio,
      tempoRespostaMedio,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular métricas agregadas' })
  }
}
