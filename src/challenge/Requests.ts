import { Connection } from "mysql2/promise";
import { Question } from "./question";

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

  static async checkRequests(challenge: [], connection: Connection) {
    console.log(challenge);
    return await Promise.all(challenge.map(async (question: Question) => {
      const test1 = await connection.query(question.query);
      console.log(test1[0]);
      // if(test1[0] == question.answer)
      return true;
    }));
  }
}