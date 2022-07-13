
// Définition d'un structure IProm
// A noter, le ? veut dire que le champ est optionnel

export interface IProm {
  id_prom : number;
  label_prom?: string;
  year_prom?: number;
}

export type IPromCreate = Omit<IProm, 'id_prom'>;
export type IPromUpdate = Partial<IPromCreate>;
export type IPromRO = Readonly<IProm>;