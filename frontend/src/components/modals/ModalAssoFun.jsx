import React, { useState, useEffect } from 'react';
import '../../styles/modalassofun.css'; 
import funcionariosMock from '../../mock/funcionarios.json'

function ModalAssocFuncionario({ codigoAeronave, onClose }) {
  const [formData, setFormData] = useState({
    nomeEtapa: '',
    funcionarioNome: '', 
  });

  const [etapas, setEtapas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const listaGeral = JSON.parse(localStorage.getItem('aeronaves')) || [];
    const aeronave = listaGeral.find((a) => String(a.codigo) === String(codigoAeronave));
    if (aeronave?.etapas?.lista) {
      setEtapas(aeronave.etapas.lista);
    }
    
    setFuncionarios(funcionariosMock || []);

  }, [codigoAeronave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const listaGeral = JSON.parse(localStorage.getItem('aeronaves')) || [];
    const aeronaveIndex = listaGeral.findIndex(
      (a) => String(a.codigo) === String(codigoAeronave)
    );

    if (aeronaveIndex !== -1) {
      const novasEtapas = listaGeral[aeronaveIndex].etapas.lista.map((etapa) => {
        if (etapa.nome === formData.nomeEtapa) {
          return { ...etapa, funcionario: formData.funcionarioNome };
        }
        return etapa;
      });

      listaGeral[aeronaveIndex].etapas.lista = novasEtapas;
      localStorage.setItem('aeronaves', JSON.stringify(listaGeral));
    }

    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-drawer">
        <h2>Associar Funcionário à Etapa</h2>

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
            <label>Nome da Etapa</label>
            <select
              name="nomeEtapa"
              value={formData.nomeEtapa}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma etapa</option>
              {etapas.filter(e => e.status !== 'concluida').map((etapa, index) => (
                <option key={index} value={etapa.nome}>
                  {etapa.nome} (Status: {etapa.status})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Funcionário</label>
            <select
              name="funcionarioNome"
              value={formData.funcionarioNome}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um funcionário</option>
              {funcionarios.filter(f => f.nivel !== 'administrador').map((func) => (
                <option key={func.id} value={func.nome}>
                  {func.nome} ({func.nivel})
                </option>
              ))}
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

export default ModalAssocFuncionario;