import { Connection } from "mysql2/promise";

export class Requests {

  protected static connection: Connection;

  static async getRequest(query: string, connection: Connection) {
    return await connection.query(query);
  }

  static async getRequests(queries: string[], connection: Connection) {
    // let data: any[] = [];

    // console.log(queries);

    // queries.map(async (query: string) => {
    //   console.log(query);
    //   let temp = await connection.query(query);
    //   console.log(temp);
    //   data.push(temp);
    // })
    return await Promise.all(queries.map(async (query: string) => {
      return await connection.query(query);
    }));
  }
}