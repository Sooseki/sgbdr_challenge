

/**
 * Un utilisateur de la plateforme.
 */
export interface IStudent {
  /** ID Unique */
  id_student?: number;
  /** Nom de famille */
  name_student?: string;
  /** Prénom */
  first_name_student?: string;
  /** Adress e-mail, ceci doit être unique est sera utilisé comme identifiant pour l'utilisateur */
  email_student: string;
}

export type IStudentCreate = Omit<IStudent, 'student'>;
export type IStudentUpdate = Partial<IStudentCreate>;
export type IStudentRO = Readonly<IStudent>;