import prisma from '../config/database';
import { CreateEtapaDto, UpdateEtapaDto } from '../types';

export class EtapaService {
  async criar(data: CreateEtapaDto) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: data.aeronaveId },
    });

    if (!aeronave) {
      throw new Error('Aeronave não encontrada.');
    }

    return await prisma.etapa.create({
      data: {
        nome: data.nome,
        prazo: new Date(data.prazo),
        aeronaveId: data.aeronaveId,
      },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async listar() {
    return await prisma.etapa.findMany({
      include: {
        aeronave: true,
        funcionarios: true,
      },
      orderBy: {
        prazo: 'asc',
      },
    });
  }

  async buscarPorId(id: number) {
    const etapa = await prisma.etapa.findUnique({
      where: { id },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });

    if (!etapa) {
      throw new Error('Etapa não encontrada.');
    }

    return etapa;
  }

  async atualizar(id: number, data: UpdateEtapaDto) {
    await this.buscarPorId(id);

    const updateData: any = { ...data };
    if (data.prazo) {
      updateData.prazo = new Date(data.prazo);
    }

    return await prisma.etapa.update({
      where: { id },
      data: updateData,
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async deletar(id: number) {
    await this.buscarPorId(id);

    return await prisma.etapa.delete({
      where: { id },
    });
  }

  async associarFuncionario(etapaId: number, funcionarioId: number) {
    const etapa = await this.buscarPorId(etapaId);
    
    const funcionario = await prisma.funcionario.findUnique({
      where: { id: funcionarioId },
    });

    if (!funcionario) {
      throw new Error('Funcionário não encontrado.');
    }

    return await prisma.etapa.update({
      where: { id: etapaId },
      data: {
        funcionarios: {
          connect: { id: funcionarioId },
        },
      },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async desassociarFuncionario(etapaId: number, funcionarioId: number) {
    await this.buscarPorId(etapaId);

    return await prisma.etapa.update({
      where: { id: etapaId },
      data: {
        funcionarios: {
          disconnect: { id: funcionarioId },
        },
      },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async listarPorAeronave(aeronaveId: number) {
    return await prisma.etapa.findMany({
      where: { aeronaveId },
      include: {
        aeronave: true,
        funcionarios: true,
      },
      orderBy: {
        prazo: 'asc',
      },
    });
  }

  async listarPorStatus(status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA') {
    return await prisma.etapa.findMany({
      where: { status },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }
}
