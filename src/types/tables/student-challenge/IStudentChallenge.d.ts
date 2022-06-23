

/**
 * Un utilisateur de la plateforme.
 */
 export interface IStudentChallenge {
    id_student?: number;
    id_challenge?: number;
    mark_student_challenge ?: number;
  }
  
  export type IStudentChallengeCreate = IStudentChallenge;
//   export type IStudentUpdate = Partial<IStudentCreate>;
//   export type IStudentRO = Readonly<IStudent>;