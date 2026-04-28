// ===============================
// Tipos
// ===============================
type PaginaParams = {
  pagina: number; // página atual (1-based)
  tamanho: number; // quantidade por página
};

type Pagina<T> = {
  itens: T[];
  total: number;
  pagina: number;
  tamanho: number;
  totalPaginas: number;
};

// ===============================
// Função genérica
// ===============================
function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams,
): Pagina<T> {
  const { pagina, tamanho } = params;

  const page = Math.max(1, pagina);
  const size = Math.max(1, tamanho);

  const filtrados = data.filter(filterFn);
  const total = filtrados.length;

  const inicio = (page - 1) * size;
  const fim = inicio + size;

  const itens = filtrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(total / size);

  return {
    itens,
    total,
    pagina: page,
    tamanho: size,
    totalPaginas,
  };
}

// ===============================
// Exemplo concreto (Usuários)
// ===============================
type Usuario = {
  id: number;
  nome: string;
  email: string;
};

const usuarios: Usuario[] = [
  { id: 1, nome: "Ana", email: "ana@email.com" },
  { id: 2, nome: "Bruno", email: "bruno@email.com" },
  { id: 3, nome: "Carlos", email: "carlos@email.com" },
  { id: 4, nome: "Amanda", email: "amanda@email.com" },
  { id: 5, nome: "Beatriz", email: "bia@email.com" },
];

// ===============================
// Execução
// ===============================
const resultado = filtrarEPaginar<Usuario>(
  usuarios,
  (u) => u.nome.toLowerCase().includes("a"),
  { pagina: 1, tamanho: 2 },
);

console.log("Resultado:");
console.log(resultado);
