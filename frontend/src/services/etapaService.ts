import api from './api'
import type { Etapa } from '../types'

export const etapaService = {
  getAll: async () => {
    const response = await api.get<Etapa[]>('/etapas')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<Etapa>(`/etapas/${id}`)
    return response.data
  },

  create: async (data: Omit<Etapa, 'id' | 'createdAt' | 'updatedAt' | 'aeronave' | 'funcionarios'> & { funcionarioIds?: number[] }) => {
    const response = await api.post<Etapa>('/etapas', data)
    return response.data
  },

  update: async (id: number, data: Partial<Etapa> & { funcionarioIds?: number[] }) => {
    const response = await api.put<Etapa>(`/etapas/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/etapas/${id}`)
  },
}
