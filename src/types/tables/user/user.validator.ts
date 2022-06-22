import Ajv, { JSONSchemaType } from 'ajv';
import { IUserCreate, IUserUpdate } from './IUser';



const UserCreateSchema : JSONSchemaType<IUserCreate> = {
  type: "object",
  properties: {
    name_student: { type: 'string', nullable: true },
    first_name_student: { type: 'string', nullable: true},
    email_student: { type: 'string' },  
  },
  required: ["email_student"],
  additionalProperties: false,
};


const UserUpdateSchema : JSONSchemaType<IUserUpdate> = {
  type: "object",
  properties: {
    name_student: { type: 'string', nullable: true },
    first_name_student: { type: 'string', nullable: true },
    email_student: { type: 'string', nullable: true },  
  },  
  additionalProperties: false,
};

const ajv = new Ajv();
export const UserCreateValidator = ajv.compile(UserCreateSchema);
export const UserUpdateValidator = ajv.compile(UserUpdateSchema);