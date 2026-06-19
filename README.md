# Lumé ✨

O teu painel pessoal para organizares a tua vida num só sítio: **tarefas**,
**finanças** e **treinos**. Bonito, minimalista e rápido.

> MVP local — os dados são guardados no próprio navegador (localStorage).
> Não há backend, login nem base de dados nesta primeira versão.

## Funcionalidades

- **Dashboard** — saudação, resumo do dia, números-chave e atividade recente.
- **Tarefas** — criar, editar, concluir, apagar e filtrar (todas / pendentes / concluídas).
- **Finanças** — registar receitas e despesas, ver lista e resumo mensal (saldo).
- **Treinos** — registar treinos, ver histórico e resumo semanal.

- **PWA** — instalável no iPad/telemóvel/computador e funciona offline.

## Stack

React · Vite · TypeScript · Tailwind CSS v4 · lucide-react · localStorage · PWA

## Como correr

Precisas de ter o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Depois abre o endereço que aparece no terminal (normalmente
`http://localhost:5173`) no teu browser, iPad ou telemóvel.

Para gerar a versão final (build de produção):

```bash
npm run build
npm run preview
```

> Nota: o modo PWA (service worker / offline) só fica ativo na **build de
> produção** (`npm run build` + `npm run preview`), não no `npm run dev`.
> Para instalar no iPad: abre no Safari → Partilhar → “Adicionar ao ecrã principal”.

## Estrutura de pastas

```
src/
  components/
    layout/      # sidebar, navegação mobile, cabeçalhos
    ui/          # botões, cartões, inputs, modal… (reutilizáveis)
    dashboard/   # cartões do dashboard
    tasks/       # componentes das tarefas
    finance/     # componentes das finanças
    workouts/    # componentes dos treinos
  hooks/         # hooks (localStorage, tarefas, finanças, treinos)
  lib/           # utilitários, constantes, acesso ao storage
  store/         # contexto que partilha os dados pela app
  types/         # tipos TypeScript (modelo de dados)
  data/          # dados demo iniciais
  pages/         # uma página por área
  App.tsx        # navegação e composição
  main.tsx       # ponto de entrada
```

## Próximos passos (futuro)

Login, base de dados na cloud (Supabase/Firebase), sincronização entre
dispositivos, gráficos, objetivos mensais, modo escuro e instalação como PWA.
A arquitetura já está preparada para crescer — a camada de dados está isolada
em `src/lib/storage.ts` e nos hooks, prontos a trocar o localStorage por uma API.
