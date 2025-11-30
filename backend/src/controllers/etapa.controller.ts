import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getEtapas = async (req: Request, res: Response) => {
  try {
    const etapas = await prisma.etapa.findMany({
      include: {
        aeronave: true,
        funcionarios: true,
      },
    })
    res.json(etapas)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar etapas' })
  }
}

export const getEtapaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const etapa = await prisma.etapa.findUnique({
      where: { id: parseInt(id) },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    })
    
    if (!etapa) {
      return res.status(404).json({ error: 'Etapa não encontrada' })
    }
    
    res.json(etapa)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar etapa' })
  }
}

export const createEtapa = async (req: Request, res: Response) => {
  try {
    const { nome, prazo, status, aeronaveId, funcionarioIds } = req.body
    
    const etapa = await prisma.etapa.create({
      data: {
        nome,
        prazo: new Date(prazo),
        status,
        aeronaveId,
        funcionarios: funcionarioIds ? {
          connect: funcionarioIds.map((id: number) => ({ id })),
        } : undefined,
      },
      include: {
        funcionarios: true,
      },
    })
    
    res.status(201).json(etapa)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar etapa' })
  }
}

export const updateEtapa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { nome, prazo, status, aeronaveId, funcionarioIds } = req.body
    
    const etapa = await prisma.etapa.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        prazo: prazo ? new Date(prazo) : undefined,
        status,
        aeronaveId,
        funcionarios: funcionarioIds ? {
          set: funcionarioIds.map((id: number) => ({ id })),
        } : undefined,
      },
      include: {
        funcionarios: true,
      },
    })
    
    res.json(etapa)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar etapa' })
  }
}

export const deleteEtapa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.etapa.delete({
      where: { id: parseInt(id) },
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar etapa' })
  }
}
