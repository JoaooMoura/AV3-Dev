import { useState } from 'react'
import { testeService } from '../../services/testeService'
import '../../styles/modalcadetapa.css'

const ModalRegistraTeste = ({ aeronaveId, onClose }) => {
    const [form, setForm] = useState({
        tipo: 'ELETRICO',
        resultado: 'APROVADO',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await testeService.create({
                tipo: form.tipo,
                resultado: form.resultado,
                aeronaveId,
            })
            onClose(true)
        } catch (error) {
            console.error('Erro ao registrar teste:', error)
            alert('Erro ao registrar teste')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Registrar Teste</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Tipo de Teste
                        <select name="tipo" value={form.tipo} onChange={handleChange}>
                            <option value="ELETRICO">Elétrico</option>
                            <option value="HIDRAULICO">Hidráulico</option>
                            <option value="AERODINAMICO">Aerodinâmico</option>
                        </select>
                    </label>
                    <label>
                        Resultado
                        <select name="resultado" value={form.resultado} onChange={handleChange} >
                            <option value="APROVADO">Aprovado</option>
                            <option value="REPROVADO">Reprovado</option>
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

export default ModalRegistraTeste