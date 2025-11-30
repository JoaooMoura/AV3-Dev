import api from './api'
import type { Funcionario } from '../types'

export const funcionarioService = {
  getAll: async () => {
    const response = await api.get<Funcionario[]>('/funcionarios')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<Funcionario>(`/funcionarios/${id}`)
    return response.data
  },

  create: async (data: Omit<Funcionario, 'id' | 'createdAt' | 'updatedAt' | 'etapas'>) => {
    const response = await api.post<Funcionario>('/funcionarios', data)
    return response.data
  },

  update: async (id: number, data: Partial<Funcionario>) => {
    const response = await api.put<Funcionario>(`/funcionarios/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/funcionarios/${id}`)
  },
}
