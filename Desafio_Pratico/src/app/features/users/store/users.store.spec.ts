import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UsersStore } from './users.store';
import { User } from '../../../core/models/user.model';

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@test.com',
  cpf: '111.111.111-11',
  phone: '(11) 99999-9999',
  phoneType: 'CELULAR',
};

describe('UsersStore', () => {
  let store: UsersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UsersStore] });
    store = TestBed.inject(UsersStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with empty users', () => {
    expect(store.users()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should set loading state', () => {
    store.setLoading(true);
    expect(store.loading()).toBe(true);
    store.setLoading(false);
    expect(store.loading()).toBe(false);
  });

  it('should set users and clear error/loading', () => {
    store.setLoading(true);
    store.setUsers([mockUser]);
    expect(store.users()).toHaveLength(1);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should set error and clear loading', () => {
    store.setLoading(true);
    store.setError('Some error');
    expect(store.error()).toBe('Some error');
    expect(store.loading()).toBe(false);
  });

  it('should add a user', () => {
    store.setUsers([]);
    store.addUser(mockUser);
    expect(store.users()).toHaveLength(1);
    expect(store.users()[0].name).toBe('Test User');
  });

  it('should update a user', () => {
    store.setUsers([mockUser]);
    store.updateUser({ ...mockUser, name: 'Updated' });
    expect(store.users()[0].name).toBe('Updated');
  });

  it('should remove a user', () => {
    store.setUsers([mockUser]);
    store.removeUser('1');
    expect(store.users()).toHaveLength(0);
  });

  it('should filter users by name', () => {
    store.setUsers([
      mockUser,
      { ...mockUser, id: '2', name: 'Another Person', email: 'a@b.com' },
    ]);
    store.setFilter('test');
    expect(store.filteredUsers()).toHaveLength(1);
    expect(store.filteredUsers()[0].name).toBe('Test User');
  });

  it('should return all users when filter is empty', () => {
    store.setUsers([mockUser, { ...mockUser, id: '2', email: 'b@c.com' }]);
    store.setFilter('');
    expect(store.filteredUsers()).toHaveLength(2);
  });
});
