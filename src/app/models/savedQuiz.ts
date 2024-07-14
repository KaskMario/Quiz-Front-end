import { User } from "./user";
import { QuizResult } from "./quizResult";

export interface SavedQuiz {
    id? : number,
    questions : string,
    description : string,
    quizResult?: QuizResult;
    user?: User;
   
  }