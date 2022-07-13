import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IStudentChallenge, IStudentChallengeConnect, IStudentChallengeCreate } from '../../types/tables/student-challenge/IStudentChallenge';
import { Connexion } from '../../challenge/connexion';

const TEST = [
  'student_challenge.id_student', 
  'student_challenge.id_challenge', 
  'student_challenge.mark_student_challenge', 
  'name_student', 
  'database_password',
  'database_login',
  'challenge_user_login_student_challenge',
  'port_student_instance_student_challenge',
  'ip_student_instance_student_challenge'
];
const JOIN_COLUMNS = [['id_challenge', 'id_challenge'], ['id_challenge', 'id_challenge'], ['id_student', 'id_student']];
const JOIN_TABLES = [['challenge', 'student_challenge'], ['challenge_prom', 'challenge'], ['student', 'student_challenge']];

/**
 * Un étudiant  de la plateforme.s
 */
@Route("/admin/student")
export class StudentChallengeController {

  /**
   * Récupérer une page d'étudiant s.
   */
  @Get()
  public async getStudentsChallenge(
    /** La page (zéro-index) à récupérer */
    @Query() page?: number,
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: number,
  ): Promise<IIndexResponse<IStudentChallenge>> {
    return Crud.Index<IStudentChallenge>({ page, limit }, 'student_challenge', TEST, JOIN_TABLES, JOIN_COLUMNS);
  }

  /**
   * Créer un nouvel étudiant
   */
  @Post()
  public async createStudentChallenge(
    @Body() body: any
  ): Promise<ICreateResponse> {
    return Crud.Create<IStudentChallengeCreate>(body, 'student_challenge');
  }

  /**
   * Récupérer un étudiant  avec le ID passé dans le URL
   */
  @Get('{id_student_challenge}')
  public async readStudent(
    @Path() id_student_challenge: number,
  ): Promise<any> {
    const bddRequest = await Crud.Read<IStudentChallengeConnect>('student_challenge', 'id_student_challenge', id_student_challenge, TEST, JOIN_TABLES ,JOIN_COLUMNS);
    const testRequest = new Connexion(
      bddRequest.ip_student_instance_student_challenge,
      bddRequest.challenge_user_login_student_challenge,
      bddRequest.database_login,
      bddRequest.database_password,
    );
    const testResult = await testRequest.connect();
    return [bddRequest, testResult];
  }

  /**
   * Mettre à jour un étudiant  avec le ID passé dans le URL
   */
  // @Put('{id_student}')
  // public async updateStudent(
  //   @Path() id_student: number,
  //   @Body() body: IStudentChallengeUpdate
  // ): Promise<IUpdateResponse> {
  //   return Crud.Update<IStudentChallengeUpdate>(body, 'student_challenge', 'id_student', id_student);
  // }

  // /**
  //  * Supprimer un étudiant 
  //  */
  // @Delete('{id_student}')
  // public async deleteStudent(
  //   @Path() id_student: number,
  // ): Promise<IUpdateResponse> {
  //   return Crud.Delete('student_challenge', 'id_student', id_student);
  // }

}