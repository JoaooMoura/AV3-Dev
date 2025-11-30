import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getPecas = async (req: Request, res: Response) => {
  try {
    const pecas = await prisma.peca.findMany({
      include: {
        aeronave: true,
      },
    })
    res.json(pecas)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar peças' })
  }
}

export const getPecaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const peca = await prisma.peca.findUnique({
      where: { id: parseInt(id) },
      include: {
        aeronave: true,
      },
    })
    
    if (!peca) {
      return res.status(404).json({ error: 'Peça não encontrada' })
    }
    
    res.json(peca)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar peça' })
  }
}

export const createPeca = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, fornecedor, status, aeronaveId } = req.body
    
    const peca = await prisma.peca.create({
      data: {
        nome,
        tipo,
        fornecedor,
        status,
        aeronaveId,
      },
    })
    
    res.status(201).json(peca)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar peça' })
  }
}

export const updatePeca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { nome, tipo, fornecedor, status, aeronaveId } = req.body
    
    const peca = await prisma.peca.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        tipo,
        fornecedor,
        status,
        aeronaveId,
      },
    })
    
    res.json(peca)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar peça' })
  }
}

export const deletePeca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.peca.delete({
      where: { id: parseInt(id) },
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar peça' })
  }
}
