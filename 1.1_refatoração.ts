interface IProduto {
  id: number;
  descricao: string;
  quantidadeEstoque: number;
}

class Produto implements IProduto {
  constructor(
    public readonly id: number,
    public readonly descricao: string,
    public quantidadeEstoque: number,
  ) {}
}

class Verdureira {
  private readonly produtos: IProduto[];

  constructor() {
    this.produtos = [
      new Produto(1, "Maçã", 20),
      new Produto(2, "Laranja", 0),
      new Produto(3, "Limão", 20),
    ];
  }

  private encontrarProduto(produtoId: number): IProduto {
    const produto = this.produtos.find((p) => p.id === produtoId);
    if (!produto) {
      throw new Error(`Produto com id ${produtoId} não encontrado.`);
    }
    return produto;
  }

  getDescricaoProduto(produtoId: number): string {
    const { id, descricao, quantidadeEstoque } =
      this.encontrarProduto(produtoId);
    return `${id} - ${descricao} (${quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    return this.encontrarProduto(produtoId).quantidadeEstoque > 0;
  }
}

const verdureira = new Verdureira();

console.log(verdureira.getDescricaoProduto(1));
console.log(verdureira.getDescricaoProduto(2));
console.log(verdureira.getDescricaoProduto(3));

console.log(verdureira.hasEstoqueProduto(1));
console.log(verdureira.hasEstoqueProduto(2));
console.log(verdureira.hasEstoqueProduto(3));
