import { useState } from 'react'
import { etapaService } from '../../services/etapaService'
import '../../styles/modalcadetapa.css'

const ModalCadEtapa = ({ aeronaveId, onClose }) => {
    const [form, setForm] = useState({
        nome: '',
        prazo: '',
        status: 'PENDENTE',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await etapaService.create({
                nome: form.nome,
                prazo: form.prazo,
                status: form.status,
                aeronaveId,
            })
            onClose(true)
        } catch (error) {
            console.error('Erro ao cadastrar etapa:', error)
            alert('Erro ao cadastrar etapa')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Cadastrar Etapa</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Nome
                        <input name="nome" value={form.nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Prazo
                        <input type="date" name="prazo" value={form.prazo} onChange={handleChange} required />
                    </label>
                    <label>
                        Status
                        <select name="status" value={form.status} onChange={handleChange}>
                            <option value="PENDENTE">Pendente</option>
                            <option value="ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>
                    </label>
                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={() => onClose(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalCadEtapa