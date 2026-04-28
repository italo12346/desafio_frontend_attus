import { Component, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
} from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { BuscaService, Pessoa } from "./busca.service";

@Component({
  selector: "app-busca",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>2.3 — Busca com Debounce</h2>

      <input
        [formControl]="campoBusca"
        placeholder="Buscar por nome ou cargo..."
        style="padding: 8px; width: 300px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"
      />

      <p *ngIf="loading" style="color: gray; margin-top: 8px;">
        ⏳ Carregando...
      </p>

      <ng-container *ngIf="resultado$ | async as pessoas">
        <p *ngIf="pessoas.length === 0 && !loading" style="color: #999;">
          Nenhum resultado encontrado.
        </p>

        <table
          *ngIf="pessoas.length > 0"
          style="margin-top: 12px; border-collapse: collapse; width: 100%;"
        >
          <thead>
            <tr style="background: #f0f0f0;">
              <th
                style="padding: 8px; text-align: left; border: 1px solid #ddd;"
              >
                #
              </th>
              <th
                style="padding: 8px; text-align: left; border: 1px solid #ddd;"
              >
                Nome
              </th>
              <th
                style="padding: 8px; text-align: left; border: 1px solid #ddd;"
              >
                Email
              </th>
              <th
                style="padding: 8px; text-align: left; border: 1px solid #ddd;"
              >
                Cargo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pessoa of pessoas">
              <td style="padding: 8px; border: 1px solid #ddd;">
                {{ pessoa.id }}
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                {{ pessoa.nome }}
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                {{ pessoa.email }}
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                {{ pessoa.cargo }}
              </td>
            </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
})
export class BuscaComponent implements OnInit {
  campoBusca = new FormControl<string>("");
  resultado$!: Observable<Pessoa[]>;
  loading = false;

  constructor(private readonly buscaService: BuscaService) {}

  ngOnInit(): void {
    this.resultado$ = this.campoBusca.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((termo) =>
        this.buscaService.buscar(termo ?? "").pipe(catchError(() => of([]))),
      ),
      tap(() => (this.loading = false)),
    );
  }
}
