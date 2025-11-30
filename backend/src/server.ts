import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { metricsMiddleware } from './middlewares/metrics.middleware.js'
import aeronaveRoutes from './routes/aeronave.routes.js'
import funcionarioRoutes from './routes/funcionario.routes.js'
import pecaRoutes from './routes/peca.routes.js'
import etapaRoutes from './routes/etapa.routes.js'
import testeRoutes from './routes/teste.routes.js'
import metricasRoutes from './routes/metricas.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(metricsMiddleware)

app.use('/api/aeronaves', aeronaveRoutes)
app.use('/api/funcionarios', funcionarioRoutes)
app.use('/api/pecas', pecaRoutes)
app.use('/api/etapas', etapaRoutes)
app.use('/api/testes', testeRoutes)
app.use('/api/metricas', metricasRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`📋 Endpoints disponíveis:`)
  console.log(`   - GET/POST    /api/aeronaves`)
  console.log(`   - GET/POST    /api/funcionarios`)
  console.log(`   - GET/POST    /api/pecas`)
  console.log(`   - GET/POST    /api/etapas`)
  console.log(`   - GET/POST    /api/testes`)
  console.log(`   - GET         /api/metricas`)
})
