# Desafio Frontend Attus — Questões 2.1, 2.2 e 2.3

## Como rodar

### Pré-requisitos
- Node.js 18+
- Angular CLI

### Instalação

```bash
npm install -g @angular/cli
npm install
ng serve
```

Acesse: http://localhost:4200

---

## O que cada questão demonstra

### 2.1 — Change Detection OnPush
- Componente com `ChangeDetectionStrategy.OnPush`
- Uso de `ChangeDetectorRef.markForCheck()` para forçar re-render após subscribe assíncrono

### 2.2 — forkJoin sem subscribe aninhado
- Duas requisições independentes disparadas em paralelo com `forkJoin`
- Subscription armazenada e cancelada no `ngOnDestroy`

### 2.3 — Busca com Debounce
- Campo de busca com `debounceTime(500)`
- `distinctUntilChanged()` para evitar requisições desnecessárias
- `switchMap` para cancelar requisição anterior (evita race condition)
- Indicador de loading com `tap`
- `async pipe` no template para gerenciar subscription automaticamente
