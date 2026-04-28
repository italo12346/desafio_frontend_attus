import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodos, toggleTodoComplete, Todo } from './store/todo.actions';
import { selectAllTodos, selectLoading, selectErro, selectPendingTodos } from './store/todo.selectors';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .todo-item {
      padding: 10px;
      margin-bottom: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    .todo-item.concluido {
      text-decoration: line-through;
      color: #aaa;
      background: #f9f9f9;
    }
    .todo-item.pendente {
      color: #333;
      background: #fff;
    }
  `],
  template: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>📝 3.2 — To-do com NgRx</h2>

      <p *ngIf="loading$ | async" style="color: gray;">⏳ Carregando tarefas...</p>
      <p *ngIf="erro$ | async as erro" style="color: red;">❌ {{ erro }}</p>

      <ng-container *ngIf="{ todos: todos$ | async, pendentes: pendentes$ | async } as dados">
        <p style="color: gray; font-size: 13px;">
          Pendentes: {{ dados.pendentes?.length }}
          de {{ dados.todos?.length }} tarefas
        </p>

        <ul style="list-style: none; padding: 0;">
          <li
            *ngFor="let todo of dados.todos"
            (click)="toggle(todo.id)"
            class="todo-item"
            [class.concluido]="todo.concluido"
            [class.pendente]="!todo.concluido"
          >
            {{ todo.concluido ? '✅' : '⬜' }} {{ todo.titulo }}
          </li>
        </ul>
      </ng-container>

      <button
        (click)="carregar()"
        style="margin-top: 12px; padding: 8px 16px; cursor: pointer;"
      >
        🔄 Carregar tarefas
      </button>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  private readonly store = inject(Store);

  todos$: Observable<Todo[]> = this.store.select(selectAllTodos);
  pendentes$: Observable<Todo[]> = this.store.select(selectPendingTodos);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  erro$: Observable<string | null> = this.store.select(selectErro);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.store.dispatch(loadTodos());
  }

  toggle(id: number): void {
    this.store.dispatch(toggleTodoComplete({ id }));
  }
}
