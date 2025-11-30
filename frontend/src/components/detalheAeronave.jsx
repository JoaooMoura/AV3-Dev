import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { aeronaveService } from '../services/aeronaveService';
import '../styles/aeronaves.css';

const DetalheAeronave = () => {
    const { id } = useParams();
    const [aeronave, setAeronave] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregar = async () => {
            try {
                setLoading(true);
                const data = await aeronaveService.getById(Number(id));
                setAeronave(data);
            } catch (error) {
                console.error('Erro ao carregar aeronave:', error);
            } finally {
                setLoading(false);
            }
        };

        carregar();
    }, [id]);

    if (loading) return <div className="aeronaves-container"><h1>Carregando...</h1></div>;
    if (!aeronave) return <div className="aeronaves-container"><h1>Aeronave não encontrada</h1></div>;

    return (
        <div className="aeronaves-container">
            <h1>Detalhe da Aeronave</h1>
            <p><strong>Código:</strong> {aeronave.codigo}</p>
            <p><strong>Modelo:</strong> {aeronave.modelo}</p>
            <p><strong>Tipo:</strong> {aeronave.tipo}</p>
            <p><strong>Capacidade:</strong> {aeronave.capacidade}</p>
            <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
        </div>
    );
};

export default DetalheAeronave;