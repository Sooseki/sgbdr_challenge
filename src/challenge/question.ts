export type Question = {
    id: number,
    points: number,
    clue: string | null,
    name: string,
    query: string,
    check_value: string,
    operator: string,
    answer: string,
    error: string[]
};