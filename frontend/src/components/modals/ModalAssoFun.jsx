import { useEffect, useState } from 'react'
import { funcionarioService } from '../../services/funcionarioService'
import { etapaService } from '../../services/etapaService'
import '../../styles/modalassofun.css'

const ModalAssoFun = ({ etapaId, onClose }) => {
    const [funcionarios, setFuncionarios] = useState([])
    const [selecionados, setSelecionados] = useState([])

    useEffect(() => {
        const carregar = async () => {
            try {
                const data = await funcionarioService.getAll()
                setFuncionarios(data)
            } catch (error) {
                console.error('Erro ao carregar funcionários:', error)
            }
        }
        carregar()
    }, [])

    const toggleFuncionario = (id) => {
        setSelecionados((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
        )
    }

    const handleSalvar = async () => {
        try {
            await etapaService.update(etapaId, { funcionarioIds: selecionados })
            onClose(true)
        } catch (error) {
            console.error('Erro ao associar funcionários:', error)
            alert('Erro ao associar funcionários')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Associar Funcionários à Etapa</h2>
                <div className="lista-funcionarios">
                    {funcionarios.map((f) => (
                        <label key={f.id} className="linha-funcionario">
                            <input
                                type="checkbox"
                                checked={selecionados.includes(f.id)}
                                onChange={() => toggleFuncionario(f.id)}
                            />
                            <span>{f.nome} - {f.nivelPermissao}</span>
                        </label>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => onClose(false)}>
                        Cancelar
                    </button>
                    <button className="btn-primary" onClick={handleSalvar}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAssoFun