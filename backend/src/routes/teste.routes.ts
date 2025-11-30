import { Router } from 'express'
import {
  getTestes,
  getTesteById,
  createTeste,
  updateTeste,
  deleteTeste,
} from '../controllers/teste.controller.js'

const router = Router()

router.get('/', getTestes)
router.get('/:id', getTesteById)
router.post('/', createTeste)
router.put('/:id', updateTeste)
router.delete('/:id', deleteTeste)

export default router
