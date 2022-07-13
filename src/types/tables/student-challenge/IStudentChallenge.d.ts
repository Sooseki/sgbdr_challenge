

/**
 * Un utilisateur de la plateforme.
 */
export interface IStudentChallenge {
  name_student?: string;
  first_name_student ?: string;
  email_student?: string;
  id_student?: number;
  id_challenge?: number;
  mark_student_challenge?: number;
  database_password?: string;
  database_login?: string;
  challenge_user_login_student_challenge?: string;
  port_student_instance_student_challenge?: number;
  ip_student_instance_student_challenge?: string;
}

export interface IStudentChallengeConnect {
  name_student?: string;
  first_name_student ?: string;
  email_student?: string;
  id_student?: number;
  id_challenge?: number;
  mark_student_challenge?: number;
  database_password: string;
  database_login: string;
  challenge_user_login_student_challenge: string;
  port_student_instance_student_challenge?: number;
  ip_student_instance_student_challenge: string;
}

export type IStudentChallengeCreate = Omit<IStudentChallenge, 'id_student'>;
//   export type IStudentUpdate = Partial<IStudentCreate>;
//   export type IStudentRO = Readonly<IStudent>;