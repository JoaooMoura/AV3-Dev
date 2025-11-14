import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aeronaveRoutes from './routes/aeronaveRoutes';
import funcionarioRoutes from './routes/funcionarioRoutes';
import pecaRoutes from './routes/pecaRoutes';
import etapaRoutes from './routes/etapaRoutes';
import testeRoutes from './routes/testeRoutes';
import authRoutes from './routes/authRoutes';
import relatorioRoutes from './routes/relatorioRoutes';
import { performanceMiddleware } from './middleware/performanceMiddleware';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(performanceMiddleware);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API AeroCode - Sistema de Gestão de Aeronaves',
    version: '1.0.0',
    status: 'online'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/aeronaves', aeronaveRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/pecas', pecaRoutes);
app.use('/api/etapas', etapaRoutes);
app.use('/api/testes', testeRoutes);
app.use('/api/relatorios', relatorioRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('==========================================');
  console.log('  🚀 Servidor AeroCode Iniciado');
  console.log('==========================================');
  console.log(`  📡 Porta: ${PORT}`);
  console.log(`  🌐 URL: http://localhost:${PORT}`);
  console.log(`  📚 API: http://localhost:${PORT}/api`);
  console.log('==========================================');
});

export default app;
