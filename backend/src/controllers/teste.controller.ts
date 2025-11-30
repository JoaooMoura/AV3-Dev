import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getTestes = async (req: Request, res: Response) => {
  try {
    const testes = await prisma.teste.findMany({
      include: {
        aeronave: true,
      },
    })
    res.json(testes)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar testes' })
  }
}

export const getTesteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const teste = await prisma.teste.findUnique({
      where: { id: parseInt(id) },
      include: {
        aeronave: true,
      },
    })
    
    if (!teste) {
      return res.status(404).json({ error: 'Teste não encontrado' })
    }
    
    res.json(teste)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar teste' })
  }
}

export const createTeste = async (req: Request, res: Response) => {
  try {
    const { tipo, resultado, aeronaveId } = req.body
    
    const teste = await prisma.teste.create({
      data: {
        tipo,
        resultado,
        aeronaveId,
      },
    })
    
    res.status(201).json(teste)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar teste' })
  }
}

export const updateTeste = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { tipo, resultado, aeronaveId } = req.body
    
    const teste = await prisma.teste.update({
      where: { id: parseInt(id) },
      data: {
        tipo,
        resultado,
        aeronaveId,
      },
    })
    
    res.json(teste)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar teste' })
  }
}

export const deleteTeste = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.teste.delete({
      where: { id: parseInt(id) },
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar teste' })
  }
}
