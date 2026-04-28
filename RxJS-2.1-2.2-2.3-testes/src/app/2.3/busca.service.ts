import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export type Pessoa = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
};

const MOCK_PESSOAS: Pessoa[] = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com",
    cargo: "Desenvolvedora Frontend",
  },
  {
    id: 2,
    nome: "Bruno Souza",
    email: "bruno@email.com",
    cargo: "Desenvolvedor Backend",
  },
  {
    id: 3,
    nome: "Carlos Mendes",
    email: "carlos@email.com",
    cargo: "Designer UX",
  },
  {
    id: 4,
    nome: "Amanda Costa",
    email: "amanda@email.com",
    cargo: "Product Manager",
  },
  { id: 5, nome: "Beatriz Lima", email: "bia@email.com", cargo: "QA Engineer" },
  {
    id: 6,
    nome: "Diego Ferreira",
    email: "diego@email.com",
    cargo: "DevOps Engineer",
  },
  {
    id: 7,
    nome: "Fernanda Rocha",
    email: "fernanda@email.com",
    cargo: "Desenvolvedora Mobile",
  },
  {
    id: 8,
    nome: "Gabriel Nunes",
    email: "gabriel@email.com",
    cargo: "Arquiteto de Software",
  },
];

@Injectable({ providedIn: "root" })
export class BuscaService {
  buscar(termo: string): Observable<Pessoa[]> {
    if (!termo.trim()) return of([]).pipe(delay(300));

    const resultado = MOCK_PESSOAS.filter(
      (p) =>
        p.nome.toLowerCase().includes(termo.toLowerCase()) ||
        p.cargo.toLowerCase().includes(termo.toLowerCase()),
    );

    return of(resultado).pipe(delay(600));
  }
}
