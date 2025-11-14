import React, { useState, useEffect } from 'react';
import aeronavesMock from '../mock/aeronaves.json';
import AeronaveModal from '../components/modals/ModalCadAero';
import '../styles/aeronaves.css'; 
import { MdAdd, MdDelete, MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Aeronaves({ user = {} }) {
  const [showModal, setShowModal] = useState(false);
  const [aeronaves, setAeronaves] = useState([]);
  const navigate = useNavigate();

  const canAdd = user.nivel === 'administrador' || user.nivel === 'engenheiro';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('aeronaves'));
    if (stored && Array.isArray(stored)) {
      setAeronaves(stored);
    } else {
      setAeronaves(aeronavesMock);
      localStorage.setItem('aeronaves', JSON.stringify(aeronavesMock));
    }
  }, []);

  const handleExcluir = (codigo) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta aeronave?');
    if (confirmDelete) {
      const atualizadas = aeronaves.filter((a) => a.codigo !== codigo);
      setAeronaves(atualizadas);
      localStorage.setItem('aeronaves', JSON.stringify(atualizadas));
    }
  };

  const handleDetalhes = (codigo) => {
    navigate(`/detalheAeronave/${codigo}`);
  };

  const handleModalClose = () => {
    const novas = JSON.parse(localStorage.getItem('aeronaves'));
    setAeronaves(novas);
    setShowModal(false);
  };

  return (
    <div className="aeronaves-container">
      <div className="aeronaves-header">
        <h1>Lista de Aeronaves</h1>
        {canAdd && (
          <button className="add-button" onClick={() => setShowModal(true)} title="Cadastrar Aeronave">
            <MdAdd size={24}/>
          </button>
        )}
      </div>

      <table className="aeronaves-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>KM</th>
            <th>Etapa Atual</th>
            <th>Total Etapas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aeronaves.map((aeronave, index) => (
            <tr key={index}>
              <td>{aeronave.codigo}</td>
              <td>{aeronave.modelo}</td>
              <td>{aeronave.tipo}</td>
              <td>{aeronave.capacidade}</td>
              <td>{aeronave.km.toLocaleString('pt-BR')} km</td>
              <td>{aeronave.etapas?.atual}</td>
              <td>{aeronave.etapas?.total}</td>
              
              <td className="action-buttons-cell">
                <button
                  className="btn-detalhes"
                  onClick={() => handleDetalhes(aeronave.codigo)}
                >
                  <MdVisibility size={18} /> Detalhes
                </button>
                {canAdd && (
                  <button
                    className="btn-excluir"
                    onClick={() => handleExcluir(aeronave.codigo)}
                  >
                    <MdDelete size={18} /> Excluir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AeronaveModal onClose={() => handleModalClose()} />}
    </div>
  );
}

export default Aeronaves;