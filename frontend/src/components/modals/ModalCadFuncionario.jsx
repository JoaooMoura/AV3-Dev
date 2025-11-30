import { useState } from 'react'
import { funcionarioService } from '../../services/funcionarioService'
import '../../styles/modalcadfuncionario.css'

const ModalCadFuncionario = ({ onClose }) => {
    const [form, setForm] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        usuario: '',
        senha: '',
        nivelPermissao: 'ENGENHEIRO',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await funcionarioService.create({
                nome: form.nome,
                telefone: form.telefone,
                endereco: form.endereco,
                usuario: form.usuario,
                senha: form.senha,
                nivelPermissao: form.nivelPermissao,
            })
            onClose(true)
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error)
            alert('Erro ao cadastrar funcionário')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Cadastrar Funcionário</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Nome
                        <input name="nome" value={form.nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Telefone
                        <input name="telefone" value={form.telefone} onChange={handleChange} required />
                    </label>
                    <label>
                        Endereço
                        <input name="endereco" value={form.endereco} onChange={handleChange} required />
                    </label>
                    <label>
                        Usuário
                        <input name="usuario" value={form.usuario} onChange={handleChange} required />
                    </label>
                    <label>
                        Senha
                        <input type="password" name="senha" value={form.senha} onChange={handleChange} required />
                    </label>
                    <label>
                        Nível de Permissão
                        <select name="nivelPermissao" value={form.nivelPermissao} onChange={handleChange} >
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="ENGENHEIRO">Engenheiro</option>
                            <option value="OPERADOR">Operador</option>
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

export default ModalCadFuncionario