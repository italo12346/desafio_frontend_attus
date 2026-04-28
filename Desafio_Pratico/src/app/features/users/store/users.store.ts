import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../../core/models/user.model';

export type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
  filterQuery: string;
};

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private state = signal<UsersState>({
    users: [],
    loading: false,
    error: null,
    filterQuery: '',
  });

  // Selectors
  readonly users = computed(() => this.state().users);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly filterQuery = computed(() => this.state().filterQuery);

  readonly filteredUsers = computed(() => {
    const q = this.state().filterQuery.toLowerCase().trim();
    if (!q) return this.state().users;
    return this.state().users.filter((u) =>
      u.name.toLowerCase().includes(q)
    );
  });

  // Updaters
  setLoading(loading: boolean) {
    this.state.update((s) => ({ ...s, loading }));
  }

  setUsers(users: User[]) {
    this.state.update((s) => ({ ...s, users, loading: false, error: null }));
  }

  setError(error: string) {
    this.state.update((s) => ({ ...s, error, loading: false }));
  }

  setFilter(filterQuery: string) {
    this.state.update((s) => ({ ...s, filterQuery }));
  }

  addUser(user: User) {
    this.state.update((s) => ({ ...s, users: [...s.users, user] }));
  }

  updateUser(updated: User) {
    this.state.update((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === updated.id ? updated : u)),
    }));
  }

  removeUser(id: string) {
    this.state.update((s) => ({
      ...s,
      users: s.users.filter((u) => u.id !== id),
    }));
  }
}
