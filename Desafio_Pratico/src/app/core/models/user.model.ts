export type PhoneType = 'CELULAR' | 'RESIDENCIAL' | 'COMERCIAL';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}

export interface UserFormData {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}
