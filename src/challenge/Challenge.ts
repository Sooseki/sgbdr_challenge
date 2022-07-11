import { Question } from './question';

export class Challenge {
  static retrieveQueries(challenge: Question[]) {
    let queries: (string | any[])[] = [];
    let n = 0;

    challenge.map((question: Question) => {
      queries[n] = [question.query, question.check];
      n++;
      console.log('---------------------------------------')
      console.log(queries);
    })

    return queries;
  }
}