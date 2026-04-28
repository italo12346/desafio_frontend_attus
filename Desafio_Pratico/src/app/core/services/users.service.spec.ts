import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { firstValueFrom } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UsersService] });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial mock users', async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  it('should create a new user', async () => {
    const before = await firstValueFrom(service.getUsers());
    const newUser = await firstValueFrom(
      service.createUser({
        name: 'Test User',
        email: 'test@test.com',
        cpf: '111.111.111-11',
        phone: '(51) 98888-0000',
        phoneType: 'CELULAR',
      })
    );
    expect(newUser.name).toBe('Test User');
    expect(newUser.id).toBeTruthy();

    const after = await firstValueFrom(service.getUsers());
    expect(after.length).toBe(before.length + 1);
  });

  it('should update an existing user', async () => {
    const users = await firstValueFrom(service.getUsers());
    const target = users[0];
    const updated = await firstValueFrom(
      service.updateUser(target.id, { ...target, name: 'Updated Name' })
    );
    expect(updated.name).toBe('Updated Name');
    expect(updated.id).toBe(target.id);
  });

  it('should delete a user', async () => {
    const before = await firstValueFrom(service.getUsers());
    await firstValueFrom(service.deleteUser(before[0].id));
    const after = await firstValueFrom(service.getUsers());
    expect(after.length).toBe(before.length - 1);
    expect(after.find((u) => u.id === before[0].id)).toBeUndefined();
  });

  it('should get user by id', async () => {
    const users = await firstValueFrom(service.getUsers());
    const target = users[0];
    const found = await firstValueFrom(service.getUserById(target.id));
    expect(found).toBeDefined();
    expect(found!.id).toBe(target.id);
  });

  it('should return undefined for nonexistent id', async () => {
    const found = await firstValueFrom(service.getUserById('nonexistent-id'));
    expect(found).toBeUndefined();
  });
});
