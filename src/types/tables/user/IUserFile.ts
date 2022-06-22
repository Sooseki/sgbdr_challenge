export interface IUserFile {
  fileId: number;
  id_student: number;
  storageKey: string;
  filename?: string;
  mimeType?: string;
}

export type IUserFileCreate = Omit<IUserFile, 'fileId'>;
export type IUserFileUpdate = Partial<IUserFileCreate>;
export type IUserFileRO = Readonly<IUserFile>;