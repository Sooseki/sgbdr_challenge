import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IChallenge, IChallengeCreate, IChallengeUpdate } from '../../types/tables/challenge/IChallenge';
import { Challenge } from '../../challenge/Challenge';

const READ_COLUMNS = ['id_challenge', 'label_challenge'];

/**
 * Un challenge.
 */
@Route("/challenge")
// @Security('jwt')
export class ChallengeController {

  /**
   * Récupérer la page montrant tous les challenges
   */
  @Get()
  public async getChallenges(
    /** La page (zéro-index) à récupérer */
    @Query() page?: number,    
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: number,    
  ): Promise<IIndexResponse<IChallenge>> {    
    return Crud.Index<IChallenge>({ page, limit }, 'challenge', READ_COLUMNS);
  }

  /**
   * Créer un nouvel utilisateur
   */
  @Post()
  public async createChallenge(
    @Body() body: IChallengeCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IChallengeCreate>(body, 'challenge');
  }

  /**
   * Récupérer une utilisateur avec le ID passé dans le URL
   */
  @Get('{id_challenge}')
  public async readChallenge(
    @Path() id_challenge: number
  ): Promise<any> {
    // const idChallenge = Crud.Read<IChallenge>('challenge', 'id_challenge', id_challenge, READ_COLUMNS);
    

    return Challenge.init(id_challenge); 
  }

  /**
   * Mettre à jour un utilisateur avec le ID passé dans le URL
   */
  @Put('{id_challenge}')
  public async updateChallenge(
    @Path() id_challenge: number,
    @Body() body: IChallengeUpdate
  ): Promise<IUpdateResponse> {
    return Crud.Update<IChallengeUpdate>(body, 'challenge', 'id_challenge', id_challenge);
  }
  
  /**
   * Supprimer un utilisateur
   */
  @Delete('{id_challenge}')
  public async deleteChallenge(
    @Path() id_challenge: number,
  ): Promise<IUpdateResponse> {
    return Crud.Delete('challenge', 'id_challenge', id_challenge);
  }

}