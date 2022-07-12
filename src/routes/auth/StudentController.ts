import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IStudent, IStudentCreate, IStudentUpdate } from '../../types/tables/student/IStudent';

const READ_COLUMNS = ['id_student', 'name_student', 'first_name_student', 'email_student'];

/**
 * Un étudiant  de la plateforme.s
 */
@Route("/auth/student")
// @Security('jwt')
export class StudentController {

  /**
   * Récupérer une page d'étudiant s.
   */
  @Get()
  public async getStudents(
    /** La page (zéro-index) à récupérer */
    @Query() page?: number,    
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: number,    
  ): Promise<IIndexResponse<IStudent>> {    
    return Crud.Index<IStudent>({ page, limit }, 'student', READ_COLUMNS);
  }

  /**
   * Créer un nouvel étudiant 
   */
  @Post()
  public async createStudent(
    @Body() body: IStudentCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IStudentCreate>(body, 'student');
  }

  /**
   * Récupérer une étudiant  avec le ID passé dans le URL
   */
  @Get('{id_student}')
  public async readStudent(
    @Path() id_student: number
  ): Promise<IStudent> {
    return Crud.Read<IStudent>('student', 'id_student', id_student, READ_COLUMNS);
  }

  /**
   * Mettre à jour un étudiant  avec le ID passé dans le URL
   */
  @Put('{id_student}')
  public async updateStudent(
    @Path() id_student: number,
    @Body() body: IStudentUpdate
  ): Promise<IUpdateResponse> {
    return Crud.Update<IStudentUpdate>(body, 'student', 'id_student', id_student);
  }
  
  /**
   * Supprimer un étudiant 
   */
  @Delete('{id_student}')
  public async deleteStudent(
    @Path() id_student: number,
  ): Promise<IUpdateResponse> {
    return Crud.Delete('student', 'id_student', id_student);
  }

}