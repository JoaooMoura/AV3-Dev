import { useState } from 'react'
import { metricasService } from '../../services/metricasService'
import '../../styles/modalcadetapa.css'

const ModalGeraRelatorio = ({ onClose }) => {
    const [metricas, setMetricas] = useState(null)

    const handleGerar = async () => {
        try {
            const dados = await metricasService.getAgregadas()
            setMetricas(dados)
        } catch (error) {
            console.error('Erro ao carregar métricas:', error)
            alert('Erro ao carregar métricas')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Relatório de Métricas</h2>
                <button className="btn-primary" onClick={handleGerar}>
                    Carregar métricas
                </button>

                {metricas && (
                    <div className="metricas-relatorio">
                        <p>Total de requisições: {metricas.totalRequisicoes}</p>
                        <p>Latência média (ms): {metricas.latenciaMedia.toFixed(2)}</p>
                        <p>Tempo processamento médio (ms): {metricas.tempoProcessamentoMedio.toFixed(2)}</p>
                        <p>Tempo resposta médio (ms): {metricas.tempoRespostaMedio.toFixed(2)}</p>
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => onClose(false)}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalGeraRelatorio