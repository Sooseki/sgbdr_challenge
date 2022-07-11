import { Connection } from "mysql2/promise";

export class Requests {

  protected static connection: Connection;

  static async getRequest(query: string, connection: Connection) {
    return await connection.query(query);
  }

  static async getRequests(queries: string[], connection: Connection) {
    return await Promise.all(queries.map(async (query: string) => {
      return await connection.query(query);
    }));
  }
}