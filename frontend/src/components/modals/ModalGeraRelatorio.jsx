import React, { useState } from 'react';
import '../../styles/modalcadaero.css'; 

function ModalGeraRelatorio({ onClose, codigoAeronave }) {
  const [nomeCliente, setNomeCliente] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Gerando relatório para:', codigoAeronave, 'Cliente:', nomeCliente);
    
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-drawer">
        <h2>Gerar Relatório</h2>

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
            <label>Nome do Cliente</label>
            <input
              type="text"
              name="nomeCliente"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              placeholder="Ex: Companhia Aérea Global"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Gerar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalGeraRelatorio;