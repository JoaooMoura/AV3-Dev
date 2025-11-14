import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { aeronaveService, relatorioService } from '../services/api';
import '../styles/dashboard.css';

function Dashboard({ user }) {
  const [aeronaves, setAeronaves] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [aeronavesResponse, statsResponse] = await Promise.all([
        aeronaveService.listar(),
        relatorioService.dashboard(),
      ]);
      
      setAeronaves(aeronavesResponse.data);
      setStats(statsResponse.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    if (!aeronaves || aeronaves.length === 0) return [];
    
    return aeronaves.map((a) => ({
      name: a.modelo,
      etapasAtuais: a.etapas?.filter(e => e.status === 'CONCLUIDA').length || 0,
      etapasTotais: a.etapas?.length || 0,
    }));
  }, [aeronaves]);

  const totalAeronaves = aeronaves.length;
  const etapasConcluidas = stats?.etapasConcluidas || 0;

  const values = chartData.map((item) => item.etapasAtuais);
  const minEtapas = Math.min(...values) || 0;
  const maxEtapas = Math.max(...values) || 0;

  const getBarColor = (value) => {
    const minLightness = 80;
    const maxLightness = 50;
    const HUE = 24;
    const SATURATION = 100;

    if (maxEtapas === minEtapas) {
      return `hsl(${HUE}, ${SATURATION}%, 50%)`;
    }

    const percent = (value - minEtapas) / (maxEtapas - minEtapas);
    const lightness = minLightness - percent * (minLightness - maxLightness);
    return `hsl(${HUE}, ${SATURATION}%, ${lightness}%)`;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Carregando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Seja Bem-Vindo, {user?.nome || 'Colaborador'}</h1>

      <div className="main-content">
        <div className="chart-section">
          <h2>Aeronaves</h2>
          <div className="chart-wrapper">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={450}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="name" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip
                    wrapperStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #FF6600',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }}
                    labelStyle={{
                      color: '#333',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                    }}
                    formatter={(value) => [`${value}`, 'Etapas concluídas']}
                  />
                  <Bar dataKey="etapasAtuais">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.etapasAtuais)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">Nenhuma aeronave cadastrada</div>
            )}
          </div>
        </div>

        <div className="indicators-section">
          <div className="card">
            <span className="indicator-value">{etapasConcluidas}</span>
            <span className="indicator-label">Etapas concluídas</span>
          </div>

          <div className="card">
            <span className="indicator-value">{totalAeronaves}</span>
            <span className="indicator-label">Total Aeronaves</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
