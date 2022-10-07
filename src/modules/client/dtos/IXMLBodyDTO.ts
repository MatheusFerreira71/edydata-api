interface Client {
  Nome: string;
  CPF: string;
  EstadoCivil: string;
  Pai: string | null;
  Mae: string | null;
  Conjuge: string | null;
  RG: string | null;
  Salario: string;
  Especie: string;
  TitulodeEleitor: string | null;
  Sexo: string;
  Celular: string | null;
  CEP: string | null;
  Endereco: string | null;
  Complemento: string | null;
  N: string | null;
  Bairro: string | null;
  Email: string | null;
  Cidade: string | null;
  Datadenascimento: string | null;
}

export default interface IXMLBodyDTO {
  registros: {
    item: Client[];
  };
}
