export type Question = {
    id: number;
    text: string;
};

export type Answer = {
    studentName: string;
    questionId: number;
    response: string;
};
