import { Router } from 'express'
import {
  getAeronaves,
  getAeronaveById,
  createAeronave,
  updateAeronave,
  deleteAeronave,
} from '../controllers/aeronave.controller.js'

const router = Router()

router.get('/', getAeronaves)
router.get('/:id', getAeronaveById)
router.post('/', createAeronave)
router.put('/:id', updateAeronave)
router.delete('/:id', deleteAeronave)

export default router
