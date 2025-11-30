import api from './api'
import type { Teste } from '../types'

export const testeService = {
  getAll: async () => {
    const response = await api.get<Teste[]>('/testes')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<Teste>(`/testes/${id}`)
    return response.data
  },

  create: async (data: Omit<Teste, 'id' | 'createdAt' | 'updatedAt' | 'aeronave'>) => {
    const response = await api.post<Teste>('/testes', data)
    return response.data
  },

  update: async (id: number, data: Partial<Teste>) => {
    const response = await api.put<Teste>(`/testes/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/testes/${id}`)
  },
}
