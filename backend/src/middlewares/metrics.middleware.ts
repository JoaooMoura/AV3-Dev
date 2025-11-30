import { Request, Response, NextFunction } from 'express'
import { prisma } from '../utils/prisma.js'

declare global {
  namespace Express {
    interface Request {
      startTime?: number
      clientTimestamp?: number
    }
  }
}

export const metricsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestReceived = Date.now()
  req.startTime = requestReceived

  const clientTimestamp = req.headers['x-client-timestamp']
  if (clientTimestamp && typeof clientTimestamp === 'string') {
    req.clientTimestamp = parseInt(clientTimestamp, 10)
  }

  const originalSend = res.send.bind(res)

  res.send = function (body: any): Response {
    const requestEnd = Date.now()
    
    const tempoProcessamentoMs = requestEnd - requestReceived
    const latenciaMs = req.clientTimestamp 
      ? requestReceived - req.clientTimestamp 
      : 0
    const tempoRespostaMs = req.clientTimestamp
      ? requestEnd - req.clientTimestamp
      : tempoProcessamentoMs

    prisma.metricaRequisicao.create({
      data: {
        metodo: req.method,
        rota: req.path,
        latenciaMs,
        tempoProcessamentoMs,
        tempoRespostaMs,
        statusCode: res.statusCode,
      },
    }).catch(err => console.error('Erro ao salvar métrica:', err))

    return originalSend(body)
  }

  next()
}
