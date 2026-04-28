import { createAction, props } from '@ngrx/store';

export type Todo = {
  id: number;
  titulo: string;
  concluido: boolean;
};

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosError = createAction(
  '[Todo] Load Todos Error',
  props<{ erro: string }>()
);

export const toggleTodoComplete = createAction(
  '[Todo] Toggle Complete',
  props<{ id: number }>()
);
