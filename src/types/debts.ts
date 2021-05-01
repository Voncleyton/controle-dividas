export default interface IDebt {
  _id: string;
  motivo: string;
  valor: number;
  idUsuario: number;
  criado: Date;
}