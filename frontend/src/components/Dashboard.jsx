import { useState, useEffect } from 'react';
import { aeronaveService } from '../services/aeronaveService';
import { funcionarioService } from '../services/funcionarioService';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalAeronaves: 0,
        totalFuncionarios: 0,
        aeronavesComerciais: 0,
        aeronavesMilitares: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aeronaves, funcionarios] = await Promise.all([
                    aeronaveService.getAll(),
                    funcionarioService.getAll(),
                ]);

                const comerciais = aeronaves.filter(a => a.tipo === 'COMERCIAL').length;
                const militares = aeronaves.filter(a => a.tipo === 'MILITAR').length;

                setStats({
                    totalAeronaves: aeronaves.length,
                    totalFuncionarios: funcionarios.length,
                    aeronavesComerciais: comerciais,
                    aeronavesMilitares: militares,
                });
            } catch (error) {
                console.error('Erro ao carregar dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total de Aeronaves</h3>
                    <p>{stats.totalAeronaves}</p>
                </div>
                <div className="card">
                    <h3>Total de Funcionários</h3>
                    <p>{stats.totalFuncionarios}</p>
                </div>
                <div className="card">
                    <h3>Aeronaves Comerciais</h3>
                    <p>{stats.aeronavesComerciais}</p>
                </div>
                <div className="card">
                    <h3>Aeronaves Militares</h3>
                    <p>{stats.aeronavesMilitares}</p>
                </div>
            </div>
            <div className="dashboard-section">
                <h2>Bem-vindo ao Sistema Aerocode</h2>
                <p>
                    Sistema de gestão de produção de aeronaves desenvolvido para as maiores
                    fabricantes do mundo.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;