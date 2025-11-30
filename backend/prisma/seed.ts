import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Funcionários
  const senhaFunc1 = await bcrypt.hash('123456', 10)
  const senhaFunc2 = await bcrypt.hash('123456', 10)
  const senhaFunc3 = await bcrypt.hash('123456', 10)

  await prisma.funcionario.upsert({
    where: { usuario: 'joao.silva' },
    update: {},
    create: {
      nome: 'João Silva',
      telefone: '(11)99999-0001',
      endereco: 'Rua Aviadores, 123',
      usuario: 'joao.silva',
      senha: senhaFunc1,
      nivelPermissao: 'ADMINISTRADOR'
    }
  })

  await prisma.funcionario.upsert({
    where: { usuario: 'maria.santos' },
    update: {},
    create: {
      nome: 'Maria Santos',
      telefone: '(11)99999-0002',
      endereco: 'Av. Hangar, 456',
      usuario: 'maria.santos',
      senha: senhaFunc2,
      nivelPermissao: 'ENGENHEIRO'
    }
  })

  await prisma.funcionario.upsert({
    where: { usuario: 'pedro.oliveira' },
    update: {},
    create: {
      nome: 'Pedro Oliveira',
      telefone: '(11)99999-0003',
      endereco: 'Rua Pista, 789',
      usuario: 'pedro.oliveira',
      senha: senhaFunc3,
      nivelPermissao: 'OPERADOR'
    }
  })

  // 2. Aeronaves (CORRIGIDO - SEM ACENTOS)
  await prisma.aeronave.upsert({
    where: { codigo: 'BOE737' },
    update: {},
    create: {
      codigo: 'BOE737',
      modelo: 'BOEING 737-800',
      tipo: 'COMERCIAL',
      capacidade: 189,
      alcance: 5745
    }
  })

  await prisma.aeronave.upsert({
    where: { codigo: 'AIR320' },
    update: {},
    create: {
      codigo: 'AIR320',  // ✅ CORRIGIDO: era "código"
      modelo: 'AIRBUS A320',
      tipo: 'COMERCIAL',
      capacidade: 180,
      alcance: 6100
    }
  })

  await prisma.aeronave.upsert({
    where: { codigo: 'EMB195' },
    update: {},
    create: {
      codigo: 'EMB195',
      modelo: 'EMBRAER E195',
      tipo: 'COMERCIAL',
      capacidade: 120,
      alcance: 4078
    }
  })

  // 3. Peças (IDs assumidos - 1,2,3 das aeronaves)
  await prisma.peca.createMany({
    data: [
      { nome: 'Motor CFM56', tipo: 'NACIONAL', fornecedor: 'Embraer', status: 'PRONTA', aeronaveId: 1 },
      { nome: 'Trenó de Pouso', tipo: 'IMPORTADA', fornecedor: 'Goodrich', status: 'TRANSPORTE', aeronaveId: 2 }
    ],
    skipDuplicates: true
  })

  // 4. Etapas
  await prisma.etapa.createMany({
    data: [
      { nome: 'Montagem Fuselagem', prazo: new Date('2025-12-15'), status: 'PENDENTE', aeronaveId: 1 },
      { nome: 'Teste Motor', prazo: new Date('2025-12-10'), status: 'ANDAMENTO', aeronaveId: 2 }
    ],
    skipDuplicates: true
  })

  // 5. Testes
  await prisma.teste.createMany({
    data: [
      { tipo: 'ELETRICO', resultado: 'APROVADO', aeronaveId: 1 },
      { tipo: 'HIDRAULICO', resultado: 'REPROVADO', aeronaveId: 2 }
    ],
    skipDuplicates: true
  })

  console.log('✅ Seed COMPLETO: 3 Funcionários + 3 Aeronaves + Peças + Etapas + Testes!')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ ERRO:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
