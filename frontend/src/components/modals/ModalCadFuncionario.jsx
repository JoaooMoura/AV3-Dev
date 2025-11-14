import React, { useState } from 'react';
import '../../styles/modalcadfuncionario.css';
import funcionarios from '../../mock/funcionarios.json';

function ModalCadFuncionario({ onClose }) {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    telefone: '',
    endereco: '',
    usuario: '',
    senha: '',
    nivel: 'operador',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoFuncionario = {
      id: formData.id,
      nome: formData.nome,
      telefone: formData.telefone,
      usuario: formData.usuario,
      senha: formData.senha,
      endereco: formData.endereco,
      nivel: formData.nivel,
    };

    funcionarios.push(novoFuncionario);

    console.log('Mock atualizado:', funcionarios);

    onClose();
  };
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Cadastro de Funcionário</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                name="id"
                placeholder="Ex: 01"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: João Silva"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
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
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite uma senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nível de Permissão</label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
            >
              <option value="operador">Operador</option>
              <option value="engenheiro">Engenheiro</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalCadFuncionario;
