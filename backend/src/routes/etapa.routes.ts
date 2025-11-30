import { Router } from 'express'
import {
  getEtapas,
  getEtapaById,
  createEtapa,
  updateEtapa,
  deleteEtapa,
} from '../controllers/etapa.controller.js'

const router = Router()

router.get('/', getEtapas)
router.get('/:id', getEtapaById)
router.post('/', createEtapa)
router.put('/:id', updateEtapa)
router.delete('/:id', deleteEtapa)

export default router
