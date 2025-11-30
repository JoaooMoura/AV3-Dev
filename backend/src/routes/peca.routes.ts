import { Router } from 'express'
import {
  getPecas,
  getPecaById,
  createPeca,
  updatePeca,
  deletePeca,
} from '../controllers/peca.controller.js'

const router = Router()

router.get('/', getPecas)
router.get('/:id', getPecaById)
router.post('/', createPeca)
router.put('/:id', updatePeca)
router.delete('/:id', deletePeca)

export default router
