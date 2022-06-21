import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IUser, IUserCreate, IUserUpdate } from '../../types/tables/user/IUser';

@Route("/auth/:prom/:challenge")


export class CreateController {
  /**
   * Créer un nouvel utilisateur
   */
  @Post()
  public async createUser(
    @Body() body: IUserCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IUserCreate>(body, 'user');
  }
}