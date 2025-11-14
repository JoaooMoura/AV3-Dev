import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';
import ModalCadFuncionario from '../components/modals/ModalCadFuncionario';
import '../styles/funcionarios.css';
import { MdPersonAdd, MdDelete } from 'react-icons/md';

function FuncionarioAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (err) {
      console.error('Erro ao carregar funcionários:', err);
      setError('Erro ao carregar funcionários');
    } finally {
      setLoading(false);
    }
  };

  const excluirFuncionario = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      return;
    }

    try {
      await funcionarioService.deletar(id);
      setFuncionarios(funcionarios.filter((f) => f.id !== id));
      alert('Funcionário excluído com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir funcionário:', err);
      alert('Erro ao excluir funcionário');
    }
  };

  const handleModalClose = (novoFuncionario) => {
    setShowModal(false);
    if (novoFuncionario) {
      carregarFuncionarios(); // Recarrega a lista após adicionar
    }
  };

  if (loading) {
    return (
      <div className="funcionario-container">
        <div className="loading">Carregando funcionários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="funcionario-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="funcionario-container">
      <div className="page-header">
        <h1>Gestão de Funcionários</h1>
        <button className="btn-adicionar" onClick={() => setShowModal(true)}>
          <MdPersonAdd />
          <span>Adicionar Funcionário</span>
        </button>
      </div>

      <table className="funcionario-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Usuário</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                Nenhum funcionário cadastrado
              </td>
            </tr>
          ) : (
            funcionarios.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.nome}</td>
                <td>{func.telefone}</td>
                <td>{func.usuario}</td>
                <td className={`nivel-${func.nivelPermissao?.toLowerCase()}`}>
                  {func.nivelPermissao}
                </td>
                <td>
                  <button
                    className="btn-excluir"
                    onClick={() => excluirFuncionario(func.id)}
                  >
                    <MdDelete size={18} /> Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <ModalCadFuncionario onClose={handleModalClose} />
      )}
    </div>
  );
}

function FuncionarioEngenheiro() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await funcionarioService.listar();
      const filtrados = response.data.filter(
        (f) => f.nivelPermissao === 'OPERADOR' || f.nivelPermissao === 'ENGENHEIRO'
      );
      setFuncionarios(filtrados);
    } catch (err) {
      console.error('Erro ao carregar funcionários:', err);
      setError('Erro ao carregar funcionários');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="funcionario-container">
        <div className="loading">Carregando funcionários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="funcionario-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="funcionario-container">
      <div className="page-header">
        <h1>Funcionários</h1>
      </div>

      <table className="funcionario-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Nenhum funcionário encontrado
              </td>
            </tr>
          ) : (
            funcionarios.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.nome}</td>
                <td>{func.telefone}</td>
                <td className={`nivel-${func.nivelPermissao?.toLowerCase()}`}>
                  {func.nivelPermissao}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Funcionario({ user }) {
  if (user.nivel === 'administrador') return <FuncionarioAdmin />;
  if (user.nivel === 'engenheiro') return <FuncionarioEngenheiro />;
  return <div>Você não deveria estar aqui.</div>;
}

export default Funcionario;
