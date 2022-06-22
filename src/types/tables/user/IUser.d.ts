

/**
 * Un utilisateur de la plateforme.
 */
export interface IUser {
  /** ID Unique */
  id_student?: number;
  /** Nom de famille */
  name_student?: string;
  /** Prénom */
  first_name_student?: string;
  /** Adress e-mail, ceci doit être unique est sera utilisé comme identifiant pour l'utilisateur */
  email_student: string;
}

export type IUserCreate = Omit<IUser, 'student'>;
export type IUserUpdate = Partial<IUserCreate>;
export type IUserRO = Readonly<IUser>;