import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.replace(/\D/g, '') ?? '';
    if (!value) return null;
    if (value.length !== 11) return { cpfInvalid: true };
    if (/^(\d)\1+$/.test(value)) return { cpfInvalid: true };

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value[9])) return { cpfInvalid: true };

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(value[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value[10])) return { cpfInvalid: true };

    return null;
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.replace(/\D/g, '') ?? '';
    if (!value) return null;
    if (value.length < 10 || value.length > 11) return { phoneInvalid: true };
    return null;
  };
}
