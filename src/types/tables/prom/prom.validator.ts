import Ajv, { JSONSchemaType } from 'ajv';
import { IPromCreate, IPromUpdate } from './IProm';


const PromCreateSchema : JSONSchemaType<IPromCreate> = {
  type: "object",
  properties: {
    label_prom: { type: 'string', nullable: true },
    year_prom: { type: 'number', nullable: true },
  },
  additionalProperties: false,
};


const PromUpdateSchema : JSONSchemaType<IPromUpdate> = {
  type: "object",
  properties: {
    label_prom: { type: 'string', nullable: true },
    year_prom: { type: 'number', nullable: true },
  },  
  additionalProperties: false,
};

const ajv = new Ajv();
export const PromCreateValidator = ajv.compile(PromCreateSchema);
export const PromUpdateValidator = ajv.compile(PromUpdateSchema);