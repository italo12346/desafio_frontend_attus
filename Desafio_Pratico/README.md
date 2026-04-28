# Desafio Frontend — Listagem de Usuários

Aplicação Angular 17+ com listagem e gerenciamento de usuários, desenvolvida como resposta ao desafio técnico.

## Stack utilizada

- **Angular 17+** com componentes standalone
- **Angular Material** para componentes de UI (Dialog, botões, inputs)
- **Signals** para gerenciamento de estado reativo (substituindo NgRx)
- **RxJS** com operadores: `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`, `tap`
- **Vitest** para testes unitários com cobertura >60%

## Funcionalidades

- ✅ Listagem de usuários com nome, e-mail e botão de editar
- ✅ Filtro por nome com debounce de 300ms
- ✅ Estado de loading durante carregamento
- ✅ Mensagem de erro com botão de retry em caso de falha
- ✅ Modal de criação de novo usuário (botão FAB vermelho)
- ✅ Modal de edição com preenchimento automático
- ✅ Formulário reativo com validação por campo
- ✅ Botão salvar desabilitado enquanto o formulário for inválido
- ✅ Validação de e-mail, CPF e telefone com formatação automática
- ✅ Subscriptions gerenciadas com `takeUntilDestroyed`
- ✅ Dados mockados via serviço com `BehaviorSubject`

## Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd users-app

# Instale as dependências
npm install
```

## Executar localmente

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

## Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

## Build de produção

```bash
npm run build
```

## Estrutura do projeto

```
src/
└── app/
    ├── core/
    │   ├── models/
    │   │   └── user.model.ts          # Interfaces e tipos
    │   └── services/
    │       ├── users.service.ts       # Serviço com dados mockados
    │       └── users.service.spec.ts  # Testes do serviço
    ├── features/
    │   └── users/
    │       ├── components/
    │       │   ├── user-list/         # Tela principal de listagem
    │       │   └── user-modal/        # Modal de criação/edição
    │       └── store/
    │           ├── users.store.ts     # Estado com Angular Signals
    │           └── users.store.spec.ts
    └── shared/
        └── validators/
            ├── custom-validators.ts   # Validadores de CPF e telefone
            └── custom-validators.spec.ts
```

## Operadores RxJS utilizados (além de map e tap)

1. **`debounceTime(300)`** — atrasa a emissão do filtro de busca
2. **`distinctUntilChanged()`** — evita emissões duplicadas no filtro
3. **`switchMap`** — usado no serviço para substituir a observable interna ao criar/editar
4. **`catchError`** — captura erros no carregamento e nas operações de escrita

## Diferenciais implementados

- Validação de formato de CPF (algoritmo completo) e telefone
- Formatação automática de CPF e telefone ao digitar
- Estado global reativo com Angular Signals (alternativa moderna ao NgRx)
- Design fiel ao protótipo fornecido
