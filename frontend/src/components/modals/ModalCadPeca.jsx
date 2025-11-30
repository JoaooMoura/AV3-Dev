import { useState } from 'react'
import { pecaService } from '../../services/pecaService'
import '../../styles/modalcadaero.css'

const ModalCadPeca = ({ aeronaveId, onClose }) => {
    const [form, setForm] = useState({
        nome: '',
        tipo: 'NACIONAL',
        fornecedor: '',
        status: 'PRODUCAO',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await pecaService.create({
                nome: form.nome,
                tipo: form.tipo,
                fornecedor: form.fornecedor,
                status: form.status,
                aeronaveId,
            })
            onClose(true)
        } catch (error) {
            console.error('Erro ao cadastrar peça:', error)
            alert('Erro ao cadastrar peça')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Cadastrar Peça</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Nome
                        <input name="nome" value={form.nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Tipo
                        <select name="tipo" value={form.tipo} onChange={handleChange}>
                            <option value="NACIONAL">Nacional</option>
                            <option value="IMPORTADA">Importada</option>
                        </select>
                    </label>
                    <label>
                        Fornecedor
                        <input name="fornecedor" value={form.fornecedor} onChange={handleChange} required />
                    </label>
                    <label>
                        Status
                        <select name="status" value={form.status} onChange={handleChange}>
                            <option value="PRODUCAO">Produção</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="PRONTA">Pronta</option>
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

export default ModalCadPeca