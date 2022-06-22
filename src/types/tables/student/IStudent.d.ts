

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

<<<<<<< HEAD
  id_prom?: number;
=======
  id_prom: number ;
>>>>>>> 2235ffb9a4630e35d33a7ffba7f1e50407455051
}

export type IStudentCreate = Omit<IStudent, 'student'>;
export type IStudentUpdate = Partial<IStudentCreate>;
export type IStudentRO = Readonly<IStudent>;