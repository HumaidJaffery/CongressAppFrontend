export interface Room{
    title: String,
    description: String,
    isPublic: boolean,
    
    questionsRequiredPerUser: number,
    bgColor: String,
    textColor: String,

    topics: String[],
    allowedQuestionTypes: String[],
}