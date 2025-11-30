import api from './api'
import type { Peca } from '../types'

export const pecaService = {
  getAll: async () => {
    const response = await api.get<Peca[]>('/pecas')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<Peca>(`/pecas/${id}`)
    return response.data
  },

  create: async (data: Omit<Peca, 'id' | 'createdAt' | 'updatedAt' | 'aeronave'>) => {
    const response = await api.post<Peca>('/pecas', data)
    return response.data
  },

  update: async (id: number, data: Partial<Peca>) => {
    const response = await api.put<Peca>(`/pecas/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/pecas/${id}`)
  },
}
