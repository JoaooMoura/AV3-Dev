import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export const getFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: {
        etapas: true,
      },
    })
    res.json(funcionarios)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários' })
  }
}

export const getFuncionarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const funcionario = await prisma.funcionario.findUnique({
      where: { id: parseInt(id) },
      include: {
        etapas: true,
      },
    })
    
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' })
    }
    
    res.json(funcionario)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionário' })
  }
}

export const createFuncionario = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, endereco, usuario, senha, nivelPermissao } = req.body
    
    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        telefone,
        endereco,
        usuario,
        senha,
        nivelPermissao,
      },
    })
    
    res.status(201).json(funcionario)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar funcionário' })
  }
}

export const updateFuncionario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { nome, telefone, endereco, usuario, senha, nivelPermissao } = req.body
    
    const funcionario = await prisma.funcionario.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        telefone,
        endereco,
        usuario,
        senha,
        nivelPermissao,
      },
    })
    
    res.json(funcionario)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar funcionário' })
  }
}

export const deleteFuncionario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.funcionario.delete({
      where: { id: parseInt(id) },
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar funcionário' })
  }
}
