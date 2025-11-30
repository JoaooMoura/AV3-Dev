import { useState, useEffect } from 'react'
import { aeronaveService } from '../services/aeronaveService'
import type { Aeronave } from '../types'

export const useAeronaves = () => {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAeronaves = async () => {
    try {
      setLoading(true)
      const data = await aeronaveService.getAll()
      setAeronaves(data)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar aeronaves')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAeronaves()
  }, [])

  return { aeronaves, loading, error, refetch: fetchAeronaves }
}
