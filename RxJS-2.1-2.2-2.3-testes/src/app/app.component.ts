import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { forkJoin, Subscription, of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { BuscaComponent } from "./2.3/busca.component";
import { CarrinhoComponent } from "./3.1/carrinho.component";

// ==============================
// 2.1 — Types e Service
// ==============================
type Pessoa = {
  id: number;
  nome: string;
};

@Injectable()
class PessoaService {
  buscarPorId(id: number): Observable<Pessoa> {
    return of({ id, nome: "João" }).pipe(delay(500));
  }

  buscarQuantidadeFamiliares(id: number): Observable<number> {
    return of(3).pipe(delay(300));
  }
}

// ==============================
// 2.1 — Change Detection OnPush
// ==============================
@Component({
  selector: "app-onpush",
  standalone: true,
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>2.1 — Change Detection OnPush</h2>
      <h3>{{ texto }}</h3>
    </div>
  `,
})
export class OnPushComponent implements OnInit, OnDestroy {
  texto: string = "";
  contador = 0;
  subscriptionBuscarPessoa?: Subscription;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService
      .buscarPorId(1)
      .subscribe((pessoa) => {
        this.texto = `Nome: ${pessoa.nome}`;
        this.cdr.markForCheck();
      });

    setInterval(() => this.contador++, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptionBuscarPessoa?.unsubscribe();
  }
}

// ==============================
// 2.2 — forkJoin
// ==============================
@Component({
  selector: "app-forkjoin",
  standalone: true,
  providers: [PessoaService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>2.2 — forkJoin sem subscribe aninhado</h2>
      <h3>{{ texto }}</h3>
    </div>
  `,
})
export class ForkJoinComponent implements OnInit, OnDestroy {
  texto: string = "";
  subscricao?: Subscription;

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    const pessoaId = 1;

    this.subscricao = forkJoin({
      pessoa: this.pessoaService.buscarPorId(pessoaId),
      qtd: this.pessoaService.buscarQuantidadeFamiliares(pessoaId),
    }).subscribe(({ pessoa, qtd }: { pessoa: Pessoa; qtd: number }) => {
      this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
    });
  }

  ngOnDestroy(): void {
    this.subscricao?.unsubscribe();
  }
}

// ==============================
// App Root
// ==============================
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, OnPushComponent, ForkJoinComponent, BuscaComponent, CarrinhoComponent],
  template: `
    <div style="max-width: 600px; margin: 40px auto;">
      <h1 style="font-family: sans-serif;">Desafio Frontend — Attus</h1>
      <hr />
      <app-onpush />
      <hr />
      <app-forkjoin />
      <hr />
      <app-busca />
      <hr/>>
      <app-carrinho />
    </div>
  `,
})
export class AppComponent {}
