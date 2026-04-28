import { describe, it, expect } from 'vitest';
import { FormControl } from '@angular/forms';
import { cpfValidator, phoneValidator } from './custom-validators';

describe('cpfValidator', () => {
  const validate = (value: string) =>
    cpfValidator()(new FormControl(value));

  it('should return null for empty value', () => {
    expect(validate('')).toBeNull();
  });

  it('should return cpfInvalid for wrong length', () => {
    expect(validate('123.456')).toEqual({ cpfInvalid: true });
  });

  it('should return cpfInvalid for all same digits', () => {
    expect(validate('111.111.111-11')).toEqual({ cpfInvalid: true });
  });

  it('should return cpfInvalid for invalid CPF', () => {
    expect(validate('123.456.789-00')).toEqual({ cpfInvalid: true });
  });

  it('should return null for a valid CPF', () => {
    // Valid CPF: 529.982.247-25
    expect(validate('529.982.247-25')).toBeNull();
  });
});

describe('phoneValidator', () => {
  const validate = (value: string) =>
    phoneValidator()(new FormControl(value));

  it('should return null for empty value', () => {
    expect(validate('')).toBeNull();
  });

  it('should return phoneInvalid for too short', () => {
    expect(validate('123')).toEqual({ phoneInvalid: true });
  });

  it('should return null for valid 10-digit phone', () => {
    expect(validate('(51) 3333-9999')).toBeNull();
  });

  it('should return null for valid 11-digit phone', () => {
    expect(validate('(51) 99999-9999')).toBeNull();
  });

  it('should return phoneInvalid for too long', () => {
    expect(validate('123456789012345')).toEqual({ phoneInvalid: true });
  });
});
