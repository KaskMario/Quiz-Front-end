import { User } from "./user";
import { QuizResult } from "./quizResult";
import { Question } from "./question";

export interface SavedQuiz {
    id? : number,
    description : string,
    quizResult?: QuizResult;
    user?: User;
    questions : Question[],
   
  }