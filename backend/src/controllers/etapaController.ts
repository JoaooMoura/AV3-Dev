import { Request, Response } from 'express';
import { EtapaService } from '../services/etapaService';

const etapaService = new EtapaService();

export class EtapaController {
  async criar(req: Request, res: Response) {
    try {
      const etapa = await etapaService.criar(req.body);
      res.status(201).json(etapa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const etapas = await etapaService.listar();
      res.json(etapas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const etapa = await etapaService.buscarPorId(Number(req.params.id));
      res.json(etapa);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const etapa = await etapaService.atualizar(
        Number(req.params.id),
        req.body
      );
      res.json(etapa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await etapaService.deletar(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async associarFuncionario(req: Request, res: Response) {
    try {
      const etapa = await etapaService.associarFuncionario(
        Number(req.params.etapaId),
        Number(req.params.funcionarioId)
      );
      res.json(etapa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async desassociarFuncionario(req: Request, res: Response) {
    try {
      const etapa = await etapaService.desassociarFuncionario(
        Number(req.params.etapaId),
        Number(req.params.funcionarioId)
      );
      res.json(etapa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarPorAeronave(req: Request, res: Response) {
    try {
      const etapas = await etapaService.listarPorAeronave(
        Number(req.params.aeronaveId)
      );
      res.json(etapas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarPorStatus(req: Request, res: Response) {
    try {
      const status = req.params.status.toUpperCase() as 
        'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA';
      const etapas = await etapaService.listarPorStatus(status);
      res.json(etapas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
