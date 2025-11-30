import { Router } from 'express'
import {
  getFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
} from '../controllers/funcionario.controller.js'

const router = Router()

router.get('/', getFuncionarios)
router.get('/:id', getFuncionarioById)
router.post('/', createFuncionario)
router.put('/:id', updateFuncionario)
router.delete('/:id', deleteFuncionario)

export default router
