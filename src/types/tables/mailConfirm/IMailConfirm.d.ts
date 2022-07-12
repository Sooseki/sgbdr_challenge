
 export interface IAccessMail {
    email: string;
    identityToken?: string;
  }
  
  export type IAccessMailCreate = Omit<IAccessMail, 'id_student'>;