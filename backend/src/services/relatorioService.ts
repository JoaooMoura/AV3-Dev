import prisma from '../config/database';
import { DashboardStats } from '../types';

export class RelatorioService {
  async gerarDashboard(): Promise<DashboardStats> {
    const [
      totalAeronaves,
      totalFuncionarios,
      etapasPendentes,
      etapasAndamento,
      etapasConcluidas,
      testesAprovados,
      testesReprovados,
    ] = await Promise.all([
      prisma.aeronave.count(),
      prisma.funcionario.count(),
      prisma.etapa.count({ where: { status: 'PENDENTE' } }),
      prisma.etapa.count({ where: { status: 'ANDAMENTO' } }),
      prisma.etapa.count({ where: { status: 'CONCLUIDA' } }),
      prisma.teste.count({ where: { resultado: 'APROVADO' } }),
      prisma.teste.count({ where: { resultado: 'REPROVADO' } }),
    ]);

    return {
      totalAeronaves,
      totalFuncionarios,
      etapasPendentes,
      etapasAndamento,
      etapasConcluidas,
      testesAprovados,
      testesReprovados,
    };
  }

  async gerarRelatorioCompleto() {
    const aeronaves = await prisma.aeronave.findMany({
      include: {
        pecas: true,
        etapas: {
          include: {
            funcionarios: true,
          },
        },
        testes: true,
      },
    });

    const relatorio = aeronaves.map((aeronave) => {
      const totalEtapas = aeronave.etapas.length;
      const etapasConcluidas = aeronave.etapas.filter(
        (e) => e.status === 'CONCLUIDA'
      ).length;
      const percentualConclusao = totalEtapas > 0 
        ? (etapasConcluidas / totalEtapas) * 100 
        : 0;

      return {
        codigo: aeronave.codigo,
        modelo: aeronave.modelo,
        tipo: aeronave.tipo,
        totalPecas: aeronave.pecas.length,
        totalEtapas,
        etapasConcluidas,
        percentualConclusao: percentualConclusao.toFixed(2),
        totalTestes: aeronave.testes.length,
        testesAprovados: aeronave.testes.filter(
          (t) => t.resultado === 'APROVADO'
        ).length,
      };
    });

    return relatorio;
  }
}
