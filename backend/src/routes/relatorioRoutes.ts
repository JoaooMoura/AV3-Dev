import { Router } from 'express';
import { RelatorioController } from '../controllers/relatorioController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const relatorioController = new RelatorioController();

router.get('/dashboard', authMiddleware, relatorioController.gerarDashboard);
router.get('/completo', authMiddleware, relatorioController.gerarRelatorioCompleto);

export default router;
