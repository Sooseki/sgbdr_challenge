import { Body, Post, Route } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import {IStudentCreate } from '../../types/tables/student/IStudent';


@Route("/register/:prom/:challenge")


export class CreateController {
  /**
   * Créer un nouvel utilisateur
   */
  @Post()
  public async createStudent(
    
    @Body() body: IStudentCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IStudentCreate>(body, 'student');
  }
}