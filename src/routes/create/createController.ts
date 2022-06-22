import { Body, Post, Route } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import {IStudentCreate } from '../../types/tables/student/IStudent';
import { join } from 'path';
import { sign } from 'jsonwebtoken';
require("dotenv").config();
const fs = require('fs');
const privateKey = fs.readFileSync(join(__dirname, "..", "..", "..",'config',"id_rsa"));

@Route("/register/:prom/:challenge")


export class CreateController {
  /**
   * Créer un nouvel utilisateur
   */
  @Post()
  public async createStudent(
    
    @Body() body: IStudentCreate
  ): Promise<any> {
    // if exist (replace ICreateResponse by any)
    const email = body.email_student;
    const refreshTokens = [];
    const accessToken = generateAccessToken(email);
    const refreshToken = sign({ sub: email }, process.env.REFRESH_TOKEN_SECRET!)
    refreshTokens.push(refreshToken)
    return {"accessToken" : accessToken}
    // else
    //return Crud.Create<IStudentCreate>(body, 'student');
  }
}

function generateAccessToken(email: any) {
  return sign({ sub: email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '24h' })
}