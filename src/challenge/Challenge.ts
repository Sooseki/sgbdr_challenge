type Question = {
  id: number,
  points: number,
  clue: string | null,
  name: string,
  query: string,
  check: any[],
  error: string[]
};

export class Challenge {
  static retrieveQueries(challenge: Question[]) {
    let queries: string[] = [];

    challenge.map((question: Question) => {
      queries.push(question.query);
    })

    return queries;
  }
}