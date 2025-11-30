import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getAeronaves = async (req: Request, res: Response) => {
  try {
    const aeronaves = await prisma.aeronave.findMany({
      include: {
        pecas: true,
        etapas: {
          include: {
            funcionarios: true,
          },
        },
        testes: true,
      },
    })
    res.json(aeronaves)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aeronaves' })
  }
}

export const getAeronaveById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: parseInt(id) },
      include: {
        pecas: true,
        etapas: {
          include: {
            funcionarios: true,
          },
        },
        testes: true,
      },
    })
    
    if (!aeronave) {
      return res.status(404).json({ error: 'Aeronave não encontrada' })
    }
    
    res.json(aeronave)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aeronave' })
  }
}

export const createAeronave = async (req: Request, res: Response) => {
  try {
    const { codigo, modelo, tipo, capacidade, alcance } = req.body
    
    const aeronave = await prisma.aeronave.create({
      data: {
        codigo,
        modelo,
        tipo,
        capacidade,
        alcance,
      },
    })
    
    res.status(201).json(aeronave)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aeronave' })
  }
}

export const updateAeronave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { codigo, modelo, tipo, capacidade, alcance } = req.body
    
    const aeronave = await prisma.aeronave.update({
      where: { id: parseInt(id) },
      data: {
        codigo,
        modelo,
        tipo,
        capacidade,
        alcance,
      },
    })
    
    res.json(aeronave)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aeronave' })
  }
}

export const deleteAeronave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.aeronave.delete({
      where: { id: parseInt(id) },
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aeronave' })
  }
}
