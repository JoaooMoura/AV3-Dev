import React, { useState } from 'react';
import '../../styles/modalcadaero.css'; 

function ModalRegistraTeste({ onClose, codigoAeronave }) {
  const [formData, setFormData] = useState({
    tipoTeste: 'eletrico', 
    resultado: 'aprovado', 
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
      alert("Erro: Aeronave não encontrada. Não foi possível salvar o teste.");
      return;
    }

    const novoTeste = {
      id: `t${new Date().getTime()}`, 
      tipo: formData.tipoTeste,
      resultado: formData.resultado,
      data: new Date().toLocaleDateString('pt-BR'), 
    };

    if (!listaGeral[aeronaveIndex].testes) {
      listaGeral[aeronaveIndex].testes = [];
    }
    listaGeral[aeronaveIndex].testes.push(novoTeste);
    localStorage.setItem('aeronaves', JSON.stringify(listaGeral));
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Registrar Novo Teste</h2>

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
            <label>Tipo de Teste</label>
            <select name="tipoTeste" value={formData.tipoTeste} onChange={handleChange}>
              <option value="eletrico">Elétrico</option>
              <option value="hidraulico">Hidráulico</option>
              <option value="aerodinamico">Aerodinâmico</option>
            </select>
          </div>

          <div className="form-group">
            <label>Resultado</label>
            <select name="resultado" value={formData.resultado} onChange={handleChange}>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
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

export default ModalRegistraTeste;