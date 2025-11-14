import React, { useState, useEffect } from 'react';
import { aeronaveService } from '../services/api';
import ModalCadAero from './modals/ModalCadAero';
import { useNavigate } from 'react-router-dom';

export default function Aeronaves({ user }) {
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAeronaves();
  }, []);

  const carregarAeronaves = async () => {
    try {
      setLoading(true);
      const response = await aeronaveService.listar();
      setAeronaves(response.data);
    } catch (err) {
      console.error('Erro ao carregar aeronaves:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarAeronave = async (dados) => {
    try {
      await aeronaveService.criar(dados);
      await carregarAeronaves();
      setModalAberto(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao criar aeronave');
    }
  };

  const handleDeletarAeronave = async (id) => {
    if (!window.confirm('Deseja realmente deletar esta aeronave?')) return;
    
    try {
      await aeronaveService.deletar(id);
      await carregarAeronaves();
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao deletar aeronave');
    }
  };

  const handleVerDetalhes = (codigo) => {
    navigate(`/detalheAeronave/${codigo}`);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="aeronaves-container">
      <div className="header">
        <h1>Gerenciamento de Aeronaves</h1>
        {(user.permissao === 'administrador' || user.permissao === 'engenheiro') && (
          <button onClick={() => setModalAberto(true)}>
            Nova Aeronave
          </button>
        )}
      </div>

      <div className="aeronaves-grid">
        {aeronaves.map((aeronave) => (
          <div key={aeronave.id} className="aeronave-card">
            <h3>{aeronave.codigo}</h3>
            <p><strong>Modelo:</strong> {aeronave.modelo}</p>
            <p><strong>Tipo:</strong> {aeronave.tipo}</p>
            <p><strong>Capacidade:</strong> {aeronave.capacidade}</p>
            <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
            
            <div className="card-actions">
              <button onClick={() => handleVerDetalhes(aeronave.codigo)}>
                Ver Detalhes
              </button>
              {user.permissao === 'administrador' && (
                <button 
                  className="btn-delete"
                  onClick={() => handleDeletarAeronave(aeronave.id)}
                >
                  Deletar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalAberto && (
        <ModalCadAero
          onClose={() => setModalAberto(false)}
          onSubmit={handleCriarAeronave}
        />
      )}
    </div>
  );
}