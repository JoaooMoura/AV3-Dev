import React, { useState } from 'react';
import '../../styles/modalcadetapa.css'; 

function ModalCadEtapa({ onClose, codigoAeronave }) {
  const [formData, setFormData] = useState({
    nomeEtapa: '',
    prazo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const listaGeral = JSON.parse(localStorage.getItem('aeronaves')) || [];
    
    const aeronaveIndex = listaGeral.findIndex(a => String(a.codigo) === String(codigoAeronave));

    if (aeronaveIndex === -1) {
      
      return;
    }

    const novaEtapa = {
      id: new Date().getTime(),
      nome: formData.nomeEtapa,
      prazo: formData.prazo,
      status: 'pendente', 
      funcionario: '-', 
    };
    listaGeral[aeronaveIndex].etapas.lista.push(novaEtapa);
    listaGeral[aeronaveIndex].etapas.total = listaGeral[aeronaveIndex].etapas.lista.length;
    localStorage.setItem('aeronaves', JSON.stringify(listaGeral));

    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Cadastrar Nova Etapa</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da Etapa</label>
            <input
              type="text"
              name="nomeEtapa"
              value={formData.nomeEtapa}
              onChange={handleChange}
              placeholder="Ex: Montagem das asas"
              required
            />
          </div>

          <div className="form-group">
            <label>Prazo</label>
            <input
              type="date"
              name="prazo"
              value={formData.prazo}
              onChange={handleChange}
              required
            />
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

export default ModalCadEtapa;