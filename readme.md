# Executar TypeScript (Node 24+) — Guia Rápido

## Problema

`ts-node` falha no Node 24 com erro de _strip-only_.

## Solução

Use **tsx**.

### 1) Instalar

```bash
npm install tsx -D
npm install @angular/core rxjs
```

### 2) Rodar

```bash
npx tsx 1.1_refatoração.ts
npx tsx 1.2_Generics_e_tipos_utilitários.ts
```

## Dica

Se der erro de caminho, use `./`:

```bash
npx tsx ./"1.1_refatoração.ts"
```

## 2. Rodar o projeto Angular (RxJS-2.1-2.2-2.3)

```bash
cd RxJS-2.1-2.2-2.3-testes/
npm install
npm start
```

> Se `ng` não for reconhecido:
>
> ```bash
> npx ng serve
> ```

Acesse em: [http://localhost:4200](http://localhost:4200)

## 3. Rodar o projeto Angular (Desafio Prático 4.x)

```bash
cd desafio-pratico
npm install
npm start
```

> Se `ng` não for reconhecido:
>
> ```bash
> npx ng serve
> ```

Acesse em: [http://localhost:4200](http://localhost:4200)
