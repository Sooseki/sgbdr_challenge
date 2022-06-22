import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IUser, IUserCreate, IUserUpdate } from '../../types/tables/user/IUser';

const READ_COLUMNS = ['id_student', 'name_student', 'first_name_student', 'email_student'];

/**
 * Un utilisateur de la plateforme.s
 */
@Route("/auth/user")
@Security('jwt')
export class UserController {

  /**
   * Récupérer une page d'utilisateurs.
   */
  @Get()
  public async getUsers(
    /** La page (zéro-index) à récupérer */
    @Query() page?: number,    
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: number,    
  ): Promise<IIndexResponse<IUser>> {    
    return Crud.Index<IUser>({ page, limit }, 'user', READ_COLUMNS);
  }

  /**
   * Créer un nouvel utilisateur
   */
  @Post()
  public async createUser(
    @Body() body: IUserCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IUserCreate>(body, 'user');
  }

  /**
   * Récupérer une utilisateur avec le ID passé dans le URL
   */
  @Get('{id_student}')
  public async readUser(
    @Path() id_student: number
  ): Promise<IUser> {
    return Crud.Read<IUser>('user', 'id_student', id_student, READ_COLUMNS);
  }

  /**
   * Mettre à jour un utilisateur avec le ID passé dans le URL
   */
  @Put('{id_student}')
  public async updateUser(
    @Path() id_student: number,
    @Body() body: IUserUpdate
  ): Promise<IUpdateResponse> {
    return Crud.Update<IUserUpdate>(body, 'user', 'id_student', id_student);
  }
  
  /**
   * Supprimer un utilisateur
   */
  @Delete('{id_student}')
  public async deleteUser(
    @Path() id_student: number,
  ): Promise<IUpdateResponse> {
    return Crud.Delete('user', 'id_student', id_student);
  }

}