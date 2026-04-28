import {
  Component,
  Injectable,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { forkJoin, Subscription, of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

type Pessoa = {
  id: number;
  nome: string;
};

@Injectable()
class PessoaService {
  buscarPorId(id: number): Observable<Pessoa> {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }

  buscarQuantidadeFamiliares(id: number): Observable<number> {
    return of(3).pipe(delay(300));
  }
}

@Component({
  selector: 'app-root',
  providers: [PessoaService],
  template: `<h1>{{ texto }}</h1>`,
})
export class AppComponent implements OnInit, OnDestroy {
  texto: string = '';
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
