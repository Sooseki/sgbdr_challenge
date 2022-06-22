export interface IStudentFile {
  fileId: number;
  id_student: number;
  storageKey: string;
  filename?: string;
  mimeType?: string;
}

export type IStudentFileCreate = Omit<IStudentFile, 'fileId'>;
export type IStudentFileUpdate = Partial<IStudentFileCreate>;
export type IStudentFileRO = Readonly<IStudentFile>;