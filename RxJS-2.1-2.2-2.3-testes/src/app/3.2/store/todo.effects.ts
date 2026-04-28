import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadTodos, loadTodosSuccess, loadTodosError, Todo } from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.http.get<Todo[]>('https://api.ficticia.com/todos').pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((err) =>
            of(loadTodosError({ erro: err.message ?? 'Erro ao carregar tarefas.' }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
