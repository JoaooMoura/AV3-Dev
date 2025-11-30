import { useState } from 'react'
import { aeronaveService } from '../../services/aeronaveService'
import '../../styles/modalcadaero.css'

const ModalCadAero = ({ onClose }) => {
    const [form, setForm] = useState({
        codigo: '',
        modelo: '',
        tipo: 'COMERCIAL',
        capacidade: '',
        alcance: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await aeronaveService.create({
                codigo: form.codigo,
                modelo: form.modelo,
                tipo: form.tipo,
                capacidade: Number(form.capacidade),
                alcance: Number(form.alcance),
            })
            onClose(true)
        } catch (error) {
            console.error('Erro ao cadastrar aeronave:', error)
            alert('Erro ao cadastrar aeronave')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Cadastrar Aeronave</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Código
                        <input name="codigo" value={form.codigo} onChange={handleChange} required />
                    </label>
                    <label>
                        Modelo
                        <input name="modelo" value={form.modelo} onChange={handleChange} required />
                    </label>
                    <label>
                        Tipo
                        <select name="tipo" value={form.tipo} onChange={handleChange}>
                            <option value="COMERCIAL">Comercial</option>
                            <option value="MILITAR">Militar</option>
                        </select>
                    </label>
                    <label>
                        Capacidade
                        <input type="number" name="capacidade" value={form.capacidade} onChange={handleChange} required />
                    </label>
                    <label>
                        Alcance (km)
                        <input type="number" name="alcance" value={form.alcance} onChange={handleChange} step="0.1" required />
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

export default ModalCadAero