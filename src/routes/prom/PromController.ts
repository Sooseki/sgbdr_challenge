import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../../classes/Crud';
import { ICreateResponse } from '../../types/api/ICreateResponse';
import { IIndexResponse } from '../../types/api/IIndexQuery';
import { IUpdateResponse } from '../../types/api/IUpdateResponse';
import { IProm, IPromCreate, IPromUpdate } from '../../types/tables/prom/IProm';

const READ_COLUMNS = ['id_prom', 'label_prom', 'year_prom'];

/**
 * Un promotion de la plateforme.s
 */
@Route("/prom/create")
@Security('jwt')
export class PromController {

  /**
   * Récupérer une page d'promotions.
   */
  @Get()
  public async getProms(
    /** La page (zéro-index) à récupérer */
    @Query() page?: number,    
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: number,    
  ): Promise<IIndexResponse<IProm>> {    
    return Crud.Index<IProm>({ page, limit }, 'prom', READ_COLUMNS);
  }

  /**
   * Créer un nouvel promotion
   */
  @Post()
  public async createProm(
    @Body() body: IPromCreate
  ): Promise<ICreateResponse> {
    return Crud.Create<IPromCreate>(body, 'prom');
  }

  /**
   * Récupérer une promotion avec le ID passé dans le URL
   */
  @Get('{id_Prom}')
  public async readProm(
    @Path() id_Prom: number
  ): Promise<IProm> {
    return Crud.Read<IProm>('prom', 'id_Prom', id_Prom, READ_COLUMNS);
  }

  /**
   * Mettre à jour un promotion avec le ID passé dans le URL
   */
  @Put('{id_Prom}')
  public async updateProm(
    @Path() id_Prom: number,
    @Body() body: IPromUpdate
  ): Promise<IUpdateResponse> {
    return Crud.Update<IPromUpdate>(body, 'prom', 'id_Prom', id_Prom);
  }
  
  /**
   * Supprimer un promotion
   */
  @Delete('{id_Prom}')
  public async deleteProm(
    @Path() id_Prom: number,
  ): Promise<IUpdateResponse> {
    return Crud.Delete('prom', 'id_Prom', id_Prom);
  }

}