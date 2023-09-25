export interface Room{
    title: String,
    description: String,
    public: boolean,
    
    questionsRequiredPerUser: number,
    bgColor: String,
    textColor: String,

    topics: String[],
    allowedQuestionTypes: String[],
}