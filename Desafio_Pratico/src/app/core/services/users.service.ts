import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { User, UserFormData } from '../models/user.model';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Giana Sandrini',
    email: 'giana@atternatus.com.br',
    cpf: '123.456.789-00',
    phone: '(11) 99999-1234',
    phoneType: 'CELULAR',
  },
  {
    id: '2',
    name: 'Carlos Eduardo',
    email: 'carlos.eduardo@atternatus.com.br',
    cpf: '987.654.321-00',
    phone: '(51) 98888-5678',
    phoneType: 'CELULAR',
  },
  {
    id: '3',
    name: 'Ana Beatriz Silva',
    email: 'ana.beatriz@email.com',
    cpf: '111.222.333-44',
    phone: '(21) 3333-9876',
    phoneType: 'RESIDENCIAL',
  },
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([...MOCK_USERS]);
  private nextId = MOCK_USERS.length + 1;

  getUsers(): Observable<User[]> {
    return of(this.usersSubject.getValue()).pipe(delay(600));
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.usersSubject.getValue().find((u) => u.id === id);
    return of(user).pipe(delay(200));
  }

  createUser(data: UserFormData): Observable<User> {
    const newUser: User = { ...data, id: String(this.nextId++) };
    return of(null).pipe(
      delay(500),
      switchMap(() => {
        const current = this.usersSubject.getValue();
        this.usersSubject.next([...current, newUser]);
        return of(newUser);
      })
    );
  }

  updateUser(id: string, data: UserFormData): Observable<User> {
    const updated: User = { ...data, id };
    return of(null).pipe(
      delay(500),
      switchMap(() => {
        const current = this.usersSubject
          .getValue()
          .map((u) => (u.id === id ? updated : u));
        this.usersSubject.next(current);
        return of(updated);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return of(null).pipe(
      delay(300),
      switchMap(() => {
        const current = this.usersSubject
          .getValue()
          .filter((u) => u.id !== id);
        this.usersSubject.next(current);
        return of(undefined as void);
      })
    );
  }
}
