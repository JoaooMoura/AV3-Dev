import React, { useState } from 'react';
import { funcionarioService } from '../../services/api';
import '../../styles/modalcadfuncionario.css';

function ModalCadFuncionario({ onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    usuario: '',
    senha: '',
    nivelPermissao: 'OPERADOR',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      
      const novoFuncionario = {
        nome: formData.nome,
        telefone: formData.telefone,
        endereco: formData.endereco,
        usuario: formData.usuario,
        senha: formData.senha,
        nivelPermissao: formData.nivelPermissao,
      };

      await funcionarioService.criar(novoFuncionario);
      
      alert('Funcionário cadastrado com sucesso!');
      onClose(true); // Passa true para indicar que houve sucesso
    } catch (err) {
      console.error('Erro ao cadastrar funcionário:', err);
      setError(err.response?.data?.error || 'Erro ao cadastrar funcionário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => !loading && onClose()}></div>

      <div className="modal-drawer">
        <h2>Cadastro de Funcionário</h2>

        {error && <div className="error-message">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: João Silva"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              placeholder="Ex: (11) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              name="endereco"
              placeholder="Ex: Rua das Flores, 123"
              value={formData.endereco}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Usuário</label>
            <input
              type="text"
              name="usuario"
              placeholder="Ex: joaosilva"
              value={formData.usuario}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite uma senha (mínimo 6 caracteres)"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Nível de Permissão</label>
            <select
              name="nivelPermissao"
              value={formData.nivelPermissao}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="OPERADOR">Operador</option>
              <option value="ENGENHEIRO">Engenheiro</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={() => onClose()} 
              className="btn-cancel"
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalCadFuncionario;