# Lumé — a tua vida, com clareza

Painel pessoal simples e bonito para organizares **tarefas**, **finanças** e **treinos** — tudo num só sítio.

MVP local: funciona 100% no navegador e guarda os dados no teu dispositivo (localStorage). Sem backend, sem login, sem base de dados.

## ✨ Funcionalidades

- **Dashboard** com saudação, data e resumo do dia/semana/mês
- **Tarefas** — criar, editar, concluir, apagar e filtrar (todas / pendentes / concluídas)
- **Finanças** — registar receitas e despesas + resumo mensal (receitas, despesas, saldo)
- **Treinos** — registar treinos + histórico e resumo semanal
- **Definições** — repor dados de exemplo ou apagar tudo
- Design responsivo (telemóvel, iPad e computador), com sidebar no ecrã grande e navegação inferior no telemóvel

## 🧱 Stack

React · Vite · TypeScript · Tailwind CSS · lucide-react · localStorage

## 📁 Estrutura

```
src/
  components/
    layout/      → sidebar, navegação inferior, estrutura geral
    ui/          → componentes reutilizáveis (botões, cartões, campos, modal...)
    dashboard/   → página inicial
    tasks/       → área de tarefas
    finance/     → área financeira
    workouts/    → área de treinos
    settings/    → definições
  hooks/         → lógica de dados (useTasks, useFinance, useWorkouts, useLocalStorage)
  store/         → contexto que partilha o estado entre páginas
  lib/           → utilitários, constantes e camada de armazenamento
  types/         → tipos TypeScript
  data/          → dados demo iniciais
  App.tsx
  main.tsx
```

## 🚀 Como correr a app

Precisas de ter o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

**1. Instalar as dependências**

```bash
npm install
```

**2. Iniciar o servidor de desenvolvimento**

```bash
npm run dev
```

**3. Abrir no browser**

O terminal mostra um endereço, normalmente:

```
http://localhost:5173
```

Abre esse endereço no navegador. 🎉

> Na primeira abertura, a app carrega alguns dados de exemplo para não estar vazia. Podes repô-los ou apagá-los em **Definições**.

## 🔮 Próximos passos (futuro)

A estrutura já está preparada para evoluir:

- Login e autenticação
- Base de dados na cloud (Supabase / Firebase) e sincronização entre dispositivos
- Gráficos financeiros e estatísticas de treino
- Objetivos mensais
- Exportação para PDF / Excel
- Modo escuro
- Instalação como app no iPad (PWA)
