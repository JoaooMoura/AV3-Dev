import { Router } from 'express'
import { getMetricas, getMetricasAgregadas } from '../controllers/metricas.controller.js'

const router = Router()

router.get('/', getMetricas)
router.get('/agregadas', getMetricasAgregadas)

export default router
