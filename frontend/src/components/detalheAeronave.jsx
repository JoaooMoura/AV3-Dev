import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/aeronaves.css'; 
import { MdAdd, MdPerson, MdCheck, MdSkipNext, MdPlayArrow } from 'react-icons/md';
import ModalCadEtapa from '../components/modals/modalCadEtapa';
import ModalAssocFuncionario from '../components/modals/ModalAssoFun';
import ModalCadPeca from '../components/modals/ModalCadPeca';
import ModalRegistraTeste from '../components/modals/ModalRegistraTeste';
import ModalGeraRelatorio from '../components/modals/ModalGeraRelatorio'; 

function DetalheAeronave({ user = {} }) {
  const { codigo } = useParams();
  const [aeronave, setAeronave] = useState(null);
  
  const [etapas, setEtapas] = useState([]);
  const [temEmAndamento, setTemEmAndamento] = useState(false);
  
  const [showEtapaModal, setShowEtapaModal] = useState(false);
  const [showAssocModal, setShowAssocModal] = useState(false);
  const [showPecaModal, setShowPecaModal] = useState(false);
  const [showTesteModal, setShowTesteModal] = useState(false);
  const [showRelatorioModal, setShowRelatorioModal] = useState(false); 

  useEffect(() => {
    carregarDados();
  }, [codigo]); 

  const carregarDados = () => {
    const listaGeral = JSON.parse(localStorage.getItem('aeronaves')) || [];
    const encontrada = listaGeral.find((a) => String(a.codigo) === String(codigo));
    
    if (encontrada) {
      setAeronave(encontrada);
      setEtapas(encontrada.etapas.lista || []); 
      setTemEmAndamento(encontrada.etapas.lista.some(e => e.status === 'em-andamento'));
    }
  };

  const salvarMudancas = (novasEtapas) => {
    const listaGeral = JSON.parse(localStorage.getItem('aeronaves')) || [];
    const aeronaveIndex = listaGeral.findIndex(a => String(a.codigo) === String(codigo));
    if (aeronaveIndex !== -1) {
      listaGeral[aeronaveIndex].etapas.lista = novasEtapas;
      const atualIndex = novasEtapas.findIndex(e => e.status === 'em-andamento');
      let contagemConcluidas = novasEtapas.filter(e => e.status === 'concluida').length;
      listaGeral[aeronaveIndex].etapas.atual = (atualIndex !== -1) ? atualIndex + 1 : contagemConcluidas;
      listaGeral[aeronaveIndex].etapas.total = novasEtapas.length;
      localStorage.setItem('aeronaves', JSON.stringify(listaGeral));
      carregarDados();
    }
  };
  const handleIniciar = (index) => {
    const novasEtapas = [...etapas];
    novasEtapas[index].status = 'em-andamento';
    salvarMudancas(novasEtapas);
  };
  const handleConcluir = (index) => {
    const novasEtapas = [...etapas];
    novasEtapas[index].status = 'concluida';
    salvarMudancas(novasEtapas);
  };
  
  const handleModalEtapaClose = () => { setShowEtapaModal(false); carregarDados(); };
  const handleModalAssocClose = () => { setShowAssocModal(false); carregarDados(); };
  const handleModalPecaClose = () => { setShowPecaModal(false); carregarDados(); };
  const handleModalTesteClose = () => { setShowTesteModal(false); };
  const handleModalRelatorioClose = () => { setShowRelatorioModal(false); }; 

  if (!aeronave) return <p>Carregando...</p>;

  const isOperador = user.nivel === 'operador';
  const canManage = user.nivel === 'administrador' || user.nivel === 'engenheiro';
  const primeiraPendenteIndex = etapas.findIndex(e => e.status === 'pendente');

  return (
    <div className="detalhe-container">
      <div className="detalhe-header">
        <span className="aeronave-nome">Nome Aeronave: {aeronave.modelo}</span>
      </div>
      
      <div className="detalhe-content">
        {canManage && (
          <div className="coluna pecas">
            <div className="coluna-header">Peças</div>
            <div className="coluna-body">
              {aeronave.pecas && aeronave.pecas.length > 0 ? (
                aeronave.pecas.map((peca, i) => (
                  <div key={i} className="lista-item">
                    <span>{peca.nome} ({peca.tipo})</span>
                    <span>Fornec: {peca.fornecedor}</span>
                  </div>
                ))
              ) : (
                <p>Nenhuma peça cadastrada</p>
              )}
            </div>
            <button className="btn-circular" onClick={() => setShowPecaModal(true)}>
              <MdAdd size={22} />
            </button>
          </div>
        )}

        <div className="coluna etapas">
          <div className="coluna-header">Etapas</div>
          <div className="coluna-body">
            {etapas.map((etapa, index) => (
              <div
                key={index}
                className={`etapa-item ${
                  etapa.status === 'concluida' ? 'etapa-concluida' : 
                  etapa.status === 'em-andamento' ? 'etapa-atual' : ''
                }`}
              >
                <div className="etapa-info">
                  <span>{etapa.nome}</span>
                  <span>Status: {etapa.status}</span>
                  <span>Funcionário: {etapa.funcionario || '-'}</span>
                </div>
                
                <div className="etapa-acoes">
                  {etapa.status === 'em-andamento' && (
                    <button className="btn-concluir" onClick={() => handleConcluir(index)}>
                      <MdCheck size={16} /> Concluir
                    </button>
                  )}
                  {etapa.status === 'pendente' && !temEmAndamento && index === primeiraPendenteIndex && (
                    <button className="btn-iniciar" onClick={() => handleIniciar(index)}>
                      <MdPlayArrow size={16} /> Iniciar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {canManage && (
            <div className="botoes-etapas">
              <button className="btn-circular" title="Associar Funcionário" onClick={() => setShowAssocModal(true)}>
                <MdPerson size={20} />
              </button>
              <button className="btn-circular" title="Adicionar Etapa" onClick={() => setShowEtapaModal(true)}>
                <MdAdd size={22} />
              </button>
            </div>
          )}
        </div>

        <div className="coluna lateral">
           <div className="contador">
            <h4>Etapas</h4>
            <p>{etapas.filter(e => e.status === 'concluida').length} / {etapas.length}</p>
          </div>
          {canManage && (
            <>
              <button className="btn-acao" onClick={() => setShowRelatorioModal(true)}>
                Gerar Relatório
              </button>
              <button className="btn-acao" onClick={() => setShowTesteModal(true)}>
                Realizar Teste
              </button>
            </>
          )}
        </div>
      </div>

      {showEtapaModal && (
        <ModalCadEtapa 
          onClose={handleModalEtapaClose} 
          codigoAeronave={codigo}
        />
      )}
      {showAssocModal && (
        <ModalAssocFuncionario 
          onClose={handleModalAssocClose} 
          codigoAeronave={codigo} 
        />
      )}
      {showPecaModal && (
        <ModalCadPeca
          onClose={handleModalPecaClose}
          codigoAeronave={codigo}
        />
      )}
      {showTesteModal && (
        <ModalRegistraTeste
          onClose={handleModalTesteClose}
          codigoAeronave={codigo}
        />
      )}
      {showRelatorioModal && (
        <ModalGeraRelatorio
          onClose={handleModalRelatorioClose}
          codigoAeronave={codigo}
        />
      )}
    </div>
  );
}

export default DetalheAeronave;