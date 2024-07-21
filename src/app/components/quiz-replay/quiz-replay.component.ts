import { Component, OnInit } from '@angular/core';
import { SavedQuiz } from '../../models/savedQuiz';
import { QuizService } from '../../service/quizService';
import { AuthService } from '../../service/authService';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { QuizPlayerComponent } from '../quiz-player/quiz-player.component';
import { ErrorService } from '../../service/errorService';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-quiz-replay',
  standalone: true,
  imports: [NgFor, NgIf, QuizPlayerComponent, DatePipe],
  templateUrl: './quiz-replay.component.html',
  styleUrl: './quiz-replay.component.css'
})
export class QuizReplayComponent implements OnInit{

  savedQuizzes : SavedQuiz[] = [];
  loggedInUsername : string = "";
  user !: User ;
  selectedQuizId : number = 0;
  quizQuestions : string = "";
  questions : any[] = [];
  questionsNotNull :boolean = false;
  noSavedQuiz : boolean = false;
  isPlayerHidden : boolean = true;
  isSavedQuizzesVisible : boolean = true;
  isReplayMode : boolean = true;
  selectedQuiz : SavedQuiz | undefined;
  savedQuestions : string = "";
  


  
  constructor(private quizService: QuizService, 
              private authService : AuthService,
              private usersService : UsersService,
              private errorService : ErrorService
    ) {}


ngOnInit(): void {
  this.getUsernameAndUser();
}



getUsernameAndUser() : void{
  this.authService.getLoggedInUsername().subscribe(
    (loggedInUsername : string) => {this.loggedInUsername = loggedInUsername;
      this.getUser(this.loggedInUsername);
    })}

getUser(username : string) : void {
  
  this.usersService.getUserByUsername(username).subscribe(
    (user : User) => {this.user = user;
      console.log(this.user.id);
      this.getAllSaved(this.user.id)
     },
    (error) => {
      alert(`Error fetching user: ${error}`);
    })
  }

  getAllSaved(userId : number){
   console.log(userId);
  this.quizService.getAllSaved(userId).subscribe(
    (savedQuizzes : SavedQuiz[]) => {this.savedQuizzes = savedQuizzes;
      if(this.savedQuizzes.length === 0){
        this.noSavedQuiz = true;
      }
      console.log(this.noSavedQuiz)
      },)
  }

  replay(){
    this.selectedQuiz = this.savedQuizzes.find(quiz => quiz.id === this.selectedQuizId);
    console.log(this.selectedQuizId);
    console.log(this.selectedQuiz);
    if (this.selectedQuiz){
        const quizQuestions: number[] = this.selectedQuiz.questions.map(question => question.id);
        console.log(quizQuestions);
        this.savedQuestions = quizQuestions.join('x');
        
        console.log(this.savedQuestions)
        
        this.fetchQuizQuestions(this.savedQuestions);
        this.isPlayerHidden = false;
    this.isSavedQuizzesVisible = false;

    } else {console.error("Selected quiz not found.");}
    }

  
    showButtons(quizId: number): boolean {
    return this.selectedQuizId === quizId;  
    }

  handleClick(quizId: number) {
       this.selectedQuizId = quizId;     
   }

   fetchQuizQuestions(quizQuestions: string): void {
    this.quizService.getSavedQuestions(quizQuestions).subscribe(
      (questions : any) => {this.questions = questions;
        if(questions.length > 0){
          this.questionsNotNull = true;
          console.log(this.questionsNotNull)
        }
      });
  }

onCloseReplay(){
  this.isPlayerHidden = true;
  this.isSavedQuizzesVisible = false;
  console.log(this.isSavedQuizzesVisible)
}

deleteSavedQuiz() {
  if (this.selectedQuizId) {
    if (confirm('Are you sure you want to delete this saved quiz?')) {
      this.quizService.deleteSavedQuiz(this.selectedQuizId).subscribe(
        response => {
          alert(response.message || 'Quiz deleted.');
          this.getAllSaved(this.user.id);
                    
        },
        (error: HttpErrorResponse) => {
          this.errorService.handleError(error, "quiz");
        }
      );
    }
  } 
}
  


}