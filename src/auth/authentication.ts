import { Request } from 'express';
import { ApiError } from '../classes/Errors/ApiError';
import { ErrorCode } from '../classes/Errors/ErrorCode';
import {readFileSync} from 'fs';

const  decode = require('jsonwebtoken');
const jwt = require ("jsonwebtoken");
const privateKey = readFileSync('./config/id_rsa');
console.log(privateKey);

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<boolean> {

  if (securityName === 'jwt') {
    if (!request.headers.authorization) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/missing-header', 'Missing authorization header');
    }
    
    // Check if jwt is valid
    // const idToken = request.headers.authorization;
    // return new Promise<boolean>((resolve, reject) => {
    //   jwt.verify(idToken, publicKey, (error)=> {
    //     if(error){
    //        reject(new ApiError(ErrorCode.Unauthorized, "auth/jwt","Erreur d'indentification"))
    //     }else{
    //         req.userToken = decoded
    //         resolve(true);
    //     }
    //   })
    // })

   
  }

  return true;
}
