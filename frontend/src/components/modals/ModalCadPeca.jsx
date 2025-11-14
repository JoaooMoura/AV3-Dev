import React, { useState } from 'react';
import '../../styles/modalcadaero.css'; 

function ModalCadPeca({ onClose, codigoAeronave }) {
  const [formData, setFormData] = useState({
    nomePeca: '',
    tipo: 'nacional',
    fornecedor: '',
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
      alert("Erro: Aeronave não encontrada. Não foi possível salvar.");
      return;
    }

    const novaPeca = {
      id: `p${new Date().getTime()}`, 
      nome: formData.nomePeca,
      tipo: formData.tipo,
      fornecedor: formData.fornecedor,
      qtd: 1, 
    };

    if (!listaGeral[aeronaveIndex].pecas) {
      listaGeral[aeronaveIndex].pecas = [];
    }

    listaGeral[aeronaveIndex].pecas.push(novaPeca);

    localStorage.setItem('aeronaves', JSON.stringify(listaGeral));

    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Cadastrar Nova Peça</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Código da Aeronave</label>
            <input
              type="text"
              name="codigo"
              value={codigoAeronave}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Nome da Peça</label>
            <input
              type="text"
              name="nomePeca"
              value={formData.nomePeca}
              onChange={handleChange}
              placeholder="Ex: Turbina"
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="nacional">Nacional</option>
              <option value="importada">Importada</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fornecedor</label>
            <input
              type="text"
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleChange}
              placeholder="Ex: Rolls-Royce"
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

export default ModalCadPeca;