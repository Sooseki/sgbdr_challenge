

/**
 * Un utilisateur de la plateforme.
 */
export interface IStudentChallenge {
  name_student?: string;
  email_student?: string;
  id_student?: number;
  id_challenge?: number;
  mark_student_challenge?: number;
}

export type IStudentChallengeCreate = Omit<IStudentChallenge, 'id_student'>;
//   export type IStudentUpdate = Partial<IStudentCreate>;
//   export type IStudentRO = Readonly<IStudent>;