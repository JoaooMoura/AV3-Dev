import React, { useState } from 'react';
import funcionariosMock from '../mock/funcionarios.json';
import ModalCadFuncionario from '../components/modals/ModalCadFuncionario';
import '../styles/funcionarios.css';
import { MdPersonAdd, MdDelete } from 'react-icons/md';

function FuncionarioAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState(funcionariosMock);

  const excluirFuncionario = (id) => {
    const atualizado = funcionarios.filter((f) => f.id !== id);
    setFuncionarios(atualizado);
    console.log('Mock atualizado:', atualizado);

  };

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
          {funcionarios.map((func) => (
            <tr key={func.id}>
              <td>{func.id}</td>
              <td>{func.nome}</td>
              <td>{func.telefone}</td>
              <td>{func.usuario}</td>
              <td className={`nivel-${func.nivel}`}>{func.nivel}</td>
              <td>
                <button
                  className="btn-excluir"
                  onClick={() => excluirFuncionario(func.id)}
                >
                  <MdDelete size={18} /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <ModalCadFuncionario onClose={() => setShowModal(false)} />}
    </div>
  );
}

function FuncionarioEngenheiro() {
  const funcionariosFiltrados = funcionariosMock.filter(
    (f) => f.nivel === 'operador' || f.nivel === 'engenheiro'
  );

  return (
    <div className="funcionario-container">
      <div className="page-header">
        <h1>Funcionarios</h1>
      </div>


      <table className="funcionario-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionariosFiltrados.map((func) => (
            <tr key={func.id}>
              <td>{func.id}</td>
              <td>{func.nome}</td>
              <td>{func.telefone}</td>
            </tr>
          ))}
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