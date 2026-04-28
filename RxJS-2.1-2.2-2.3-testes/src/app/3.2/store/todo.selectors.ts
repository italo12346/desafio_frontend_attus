import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./todo.reducer";
import { Todo } from "./todo.actions";

export const selectTodoState = createFeatureSelector<TodoState>("todos");

export const selectAllTodos = createSelector(
  selectTodoState,
  (state): Todo[] => state.todos,
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos): Todo[] => todos.filter((todo) => !todo.concluido),
);

export const selectLoading = createSelector(
  selectTodoState,
  (state): boolean => state.loading,
);

export const selectErro = createSelector(
  selectTodoState,
  (state): string | null => state.erro,
);
