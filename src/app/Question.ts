export interface Question{
    questionType: string,
    roomKey: number,
    question: string,
    answers: string[],
    correctAnswer: string[],
    explanation: string,
    topicIds: number[]
}