import api from './api'
import type { Aeronave } from '../types'

export const aeronaveService = {
  getAll: async () => {
    const response = await api.get<Aeronave[]>('/aeronaves')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<Aeronave>(`/aeronaves/${id}`)
    return response.data
  },

  create: async (data: Omit<Aeronave, 'id' | 'createdAt' | 'updatedAt' | 'pecas' | 'etapas' | 'testes'>) => {
    const response = await api.post<Aeronave>('/aeronaves', data)
    return response.data
  },

  update: async (id: number, data: Partial<Aeronave>) => {
    const response = await api.put<Aeronave>(`/aeronaves/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/aeronaves/${id}`)
  },
}
