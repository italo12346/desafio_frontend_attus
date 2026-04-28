import {
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type Item = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>🛒 3.1 — Carrinho com Signals</h2>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Produto</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Qtd</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Preço</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Subtotal</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (item of itens(); track item.id) {
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">{{ item.nome }}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">{{ item.quantidade }}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">R$ {{ item.preco.toFixed(2) }}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                <button (click)="adicionarItem(item.id)">+</button>
                <button (click)="removerItem(item.id)" style="margin-left: 4px;">-</button>
              </td>
            </tr>
          }
        </tbody>
      </table>

      <h3 style="margin-top: 16px;">Total: R$ {{ total().toFixed(2) }}</h3>
      <p style="color: gray; font-size: 12px;">Total emitido para o pai: R$ {{ total().toFixed(2) }}</p>
    </div>
  `,
})
export class CarrinhoComponent {
  totalMudou = output<number>();

  itens = signal<Item[]>([
    { id: 1, nome: 'Maçã', preco: 3.5, quantidade: 1 },
    { id: 2, nome: 'Laranja', preco: 2.0, quantidade: 2 },
    { id: 3, nome: 'Limão', preco: 1.5, quantidade: 3 },
  ]);

  total = computed(() =>
    this.itens().reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  );

  constructor() {
    effect(() => {
      this.totalMudou.emit(this.total());
    });
  }

  adicionarItem(id: number): void {
    this.itens.update((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }

  removerItem(id: number): void {
    this.itens.update((lista) =>
      lista
        .map((item) =>
          item.id === id && item.quantidade > 0
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }
}
