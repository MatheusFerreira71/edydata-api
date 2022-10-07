export default interface ICreateClientDTO {
  nome: string;
  CPF: string;
  estadoCivil: string;
  pai?: string;
  mae?: string;
  conjuge?: string;
  rg?: string;
  salario: number;
  especie: string;
  tituloEleitor?: string;
  sexo: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  complemento?: string;
  numero?: string;
  bairro?: string;
  email?: string;
  cidade?: string;
  dataNascimento?: Date;
}
