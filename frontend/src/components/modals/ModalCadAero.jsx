import React, { useState } from 'react';
import '../../styles/modalcadaero.css';
import aeronavesMock from '../../mock/aeronaves.json';

function AeronaveModal({ onClose }) {
  const [formData, setFormData] = useState({
    codigo: '',
    modelo: '',
    tipo: 'comercial',
    capacidade: '',
    km: '',
    etapaAtual: '',
    totalEtapas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novasAeronaves =
      JSON.parse(localStorage.getItem('aeronaves')) || aeronavesMock;

    const novaAeronave = {
      codigo: formData.codigo,
      modelo: formData.modelo,
      tipo: formData.tipo,
      capacidade: Number(formData.capacidade),
      km: Number(formData.km),
      etapas: {
        atual: Number(formData.etapaAtual),
        total: Number(formData.totalEtapas),
      },
    };

    novasAeronaves.push(novaAeronave);

    localStorage.setItem('aeronaves', JSON.stringify(novasAeronaves));

    onClose(); 
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Cadastrar Nova Aeronave</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Código</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ex: ACX-999"
              required
            />
          </div>

          <div className="form-group">
            <label>Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ex: Embraer E195"
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="comercial">Comercial</option>
              <option value="militar">Militar</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Capacidade</label>
              <input
                type="number"
                name="capacidade"
                value={formData.capacidade}
                onChange={handleChange}
                placeholder="Ex: 200"
                required
              />
            </div>

            <div className="form-group">
              <label>KM</label>
              <input
                type="number"
                name="km"
                value={formData.km}
                onChange={handleChange}
                placeholder="Ex: 1200000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Etapa Atual</label>
              <input
                A type="number"
                name="etapaAtual"
                value={formData.etapaAtual}
                onChange={handleChange}
                placeholder="Ex: 1"
                required
              />
            </div>

            <div className="form-group">
              <label>Total Etapas</label>
              <input
                type="number"
                name="totalEtapas"
                value={formData.totalEtapas}
                onChange={handleChange}
                placeholder="Ex: 10"
                required
              />
            </div>
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

export default AeronaveModal;