# Executar TypeScript (Node 24+) — Guia Rápido

## Problema

`ts-node` falha no Node 24 com erro de _strip-only_.

## Solução

Use **tsx**.

### 1) Instalar

```bash
npm install tsx -D
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
