import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aeronaveService } from '../services/aeronaveService';
import ModalCadAero from './modals/ModalCadAero';
import '../styles/aeronaves.css';

const Aeronaves = () => {
    const [aeronaves, setAeronaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModalCad, setShowModalCad] = useState(false);
    const navigate = useNavigate();

    const carregarAeronaves = async () => {
        try {
            setLoading(true);
            const data = await aeronaveService.getAll();
            setAeronaves(data);
        } catch (error) {
            console.error('Erro ao carregar aeronaves:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarAeronaves();
    }, []);

    const handleNovaAeronave = () => {
        setShowModalCad(true);
    };

    const handleVerDetalhes = (id) => {
        navigate(`/aeronave/${id}`)
    }
    const handleCloseModal = (atualizar) => {
        setShowModalCad(false);
        if (atualizar) {
            carregarAeronaves();
        }
    };

    if (loading) {
        return <div className="aeronaves-container"><h1>Carregando...</h1></div>;
    }

    return (
        <div className="aeronaves-container">
            <div className="aeronaves-header">
                <h1>Aeronaves</h1>
                <button className="btn-primary" onClick={handleNovaAeronave}>
                    Nova Aeronave
                </button>
            </div>
            {aeronaves.length === 0 ? (
                <p>Nenhuma aeronave cadastrada.</p>
            ) : (
                <table className="aeronaves-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Capacidade</th>
                            <th>Alcance (km)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aeronaves.map((aeronave) => (
                            <tr key={aeronave.id}>
                                <td>{aeronave.codigo}</td>
                                <td>{aeronave.modelo}</td>
                                <td>{aeronave.tipo}</td>
                                <td>{aeronave.capacidade}</td>
                                <td>{aeronave.alcance}</td>
                                <td>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => handleVerDetalhes(aeronave.id)}
                                    >
                                        Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModalCad && (
                <ModalCadAero onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Aeronaves;