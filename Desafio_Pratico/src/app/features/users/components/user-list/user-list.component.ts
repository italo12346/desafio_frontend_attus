import {
  Component,
  OnInit,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, catchError, of, tap } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { UsersStore } from '../../store/users.store';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    UserModalComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchControl = new FormControl('');

  modalOpen = signal(false);
  selectedUser = signal<User | undefined>(undefined);

  private usersService = inject(UsersService);
  private usersStore = inject(UsersStore);
  private destroyRef = inject(DestroyRef);

  readonly users = this.usersStore.filteredUsers;
  readonly loading = this.usersStore.loading;
  readonly error = this.usersStore.error;

  ngOnInit() {
    this.loadUsers();
    this.setupSearch();
  }

  private loadUsers() {
    this.usersStore.setLoading(true);
    this.usersService
      .getUsers()
      .pipe(
        tap((users) => this.usersStore.setUsers(users)),
        catchError(() => {
          this.usersStore.setError('Erro ao carregar usuários. Tente novamente.');
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) => this.usersStore.setFilter(query ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  openAddModal() {
    this.selectedUser.set(undefined);
    this.modalOpen.set(true);
  }

  openEditModal(user: User) {
    this.selectedUser.set(user);
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.selectedUser.set(undefined);
  }

  onModalSaved() {
    this.closeModal();
  }

  onOverlayClick(event: MouseEvent) {
    this.closeModal();
  }

  retryLoad() {
    this.loadUsers();
  }

  trackById(_index: number, user: User): string {
    return user.id;
  }
}
