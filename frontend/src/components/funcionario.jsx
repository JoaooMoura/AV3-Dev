import { useEffect, useState } from 'react'
import { funcionarioService } from '../services/funcionarioService'
import ModalCadFuncionario from './modals/ModalCadFuncionario'
import '../styles/funcionarios.css'

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModalCad, setShowModalCad] = useState(false)

    const carregarFuncionarios = async () => {
        try {
            setLoading(true)
            const data = await funcionarioService.getAll()
            setFuncionarios(data)
        } catch (error) {
            console.error('Erro ao carregar funcionários:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarFuncionarios()
    }, [])

    const handleNovoFuncionario = () => {
        setShowModalCad(true)
    }

    const handleCloseModal = (atualizar) => {
        setShowModalCad(false)
        if (atualizar) {
            carregarFuncionarios()
        }
    }

    if (loading) {
        return (
            <div className="funcionarios-container">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className="funcionarios-container">
            <div className="funcionarios-header">
                <h1>Funcionários</h1>
                <button className="btn-primary" onClick={handleNovoFuncionario}>
                    Novo Funcionário
                </button>
            </div>

            {funcionarios.length === 0 ? (
                <p>Nenhum funcionário cadastrado.</p>
            ) : (
                <table className="funcionarios-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Usuário</th>
                            <th>Nível</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((func) => (
                            <tr key={func.id}>
                                <td>{func.nome}</td>
                                <td>{func.telefone}</td>
                                <td>{func.endereco}</td>
                                <td>{func.usuario}</td>
                                <td>{func.nivelPermissao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModalCad && <ModalCadFuncionario onClose={handleCloseModal} />}
        </div>
    )
}

export default Funcionarios