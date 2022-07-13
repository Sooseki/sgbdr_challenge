import { Connection, RowDataPacket } from "mysql2/promise";
import { rejections } from "winston";
import { Question } from "./question";
import { IStudentChallenge } from '../types/tables/student-challenge/IStudentChallenge';
import { ListBucketIntelligentTieringConfigurationsCommand } from "@aws-sdk/client-s3";

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

  static async checkRequests(challenge: Question[], connection: Connection) {
    let points = 0;
    for (const question of challenge) {

      const result = await connection.query<any[] & RowDataPacket[]>(question.query);
      const value = result[0][0][question.check_value];

      if(question.answer !== value) {
        return [question, points];
      }

      points += question.points;
    }

    return [true, 20];
  }
}