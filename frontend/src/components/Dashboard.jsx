import React, { useMemo } from 'react';
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
import aeronavesData from '../mock/aeronaves.json';
import '../styles/dashboard.css';

function Dashboard({ user }) {
  const aeronaves = Array.isArray(aeronavesData)
    ? aeronavesData
    : JSON.parse(aeronavesData || '[]');

  const chartData = useMemo(
    () =>
      aeronaves.map((a) => ({
        name: a.modelo,
        etapasAtuais: Number(a.etapas?.atual || 0),
        etapasTotais: Number(a.etapas?.total || 0),
      })),
    [aeronaves]
  );

  const totalAeronaves = aeronaves.length;
  const etapasConcluidas = aeronaves.reduce(
    (sum, a) => sum + Number(a.etapas?.atual || 0),
    0
  );

  const values = chartData.map((item) => item.etapasAtuais);
  const minEtapas = Math.min(...values);
  const maxEtapas = Math.max(...values);

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

  return (
    <div className="dashboard-container">
      <h1>Seja Bem-Vindo, {user?.nome || 'Colaborador'}</h1>

      <div className="main-content">
        <div className="chart-section">
          <h2>Aeronaves</h2>
          <div className="chart-wrapper">
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
