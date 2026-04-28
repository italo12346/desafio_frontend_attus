import { createReducer, on } from '@ngrx/store';
import { Todo, loadTodos, loadTodosSuccess, loadTodosError, toggleTodoComplete } from './todo.actions';

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  erro: string | null;
};

export const initialState: TodoState = {
  todos: [],
  loading: false,
  erro: null,
};

export const todoReducer = createReducer(
  initialState,

  on(loadTodos, (state) => ({
    ...state,
    loading: true,
    erro: null,
  })),

  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    todos,
  })),

  on(loadTodosError, (state, { erro }) => ({
    ...state,
    loading: false,
    erro,
  })),

  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, concluido: !todo.concluido } : todo
    ),
  }))
);
