import { Request, Response } from 'express';
import { RelatorioService } from '../services/relatorioService';

const relatorioService = new RelatorioService();

export class RelatorioController {
  async gerarDashboard(req: Request, res: Response) {
    try {
      const dashboard = await relatorioService.gerarDashboard();
      res.json(dashboard);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async gerarRelatorioCompleto(req: Request, res: Response) {
    try {
      const relatorio = await relatorioService.gerarRelatorioCompleto();
      res.json(relatorio);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
