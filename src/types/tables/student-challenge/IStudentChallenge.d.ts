

/**
 * Un utilisateur de la plateforme.
 */
 export interface IStudentChallenge {
    id_student?: number;
    id_challenge?: number;
    mark_student_challenge ?: number;
    name_student ?: string;
    
  }
  
  export type IStudentChallengeCreate = Omit<IStudentChallenge, 'id_student'>;
//   export type IStudentUpdate = Partial<IStudentCreate>;
//   export type IStudentRO = Readonly<IStudent>;