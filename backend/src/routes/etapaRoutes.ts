import { Router } from 'express';
import { EtapaController } from '../controllers/etapaController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const etapaController = new EtapaController();

router.post('/', authMiddleware, etapaController.criar);
router.get('/', authMiddleware, etapaController.listar);
router.get('/:id', authMiddleware, etapaController.buscarPorId);
router.get('/aeronave/:aeronaveId', authMiddleware, etapaController.listarPorAeronave);
router.get('/status/:status', authMiddleware, etapaController.listarPorStatus);
router.put('/:id', authMiddleware, etapaController.atualizar);
router.delete('/:id', authMiddleware, etapaController.deletar);
router.post('/:etapaId/funcionarios/:funcionarioId', authMiddleware, etapaController.associarFuncionario);
router.delete('/:etapaId/funcionarios/:funcionarioId', authMiddleware, etapaController.desassociarFuncionario);

export default router;
