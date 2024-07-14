import { Component, OnInit } from '@angular/core';
import { SavedQuiz } from '../../models/savedQuiz';
import { QuizService } from '../../service/quizService';
import { AuthService } from '../../service/authService';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { QuizPlayerComponent } from '../quiz-player/quiz-player.component';


@Component({
  selector: 'app-quiz-replay',
  standalone: true,
  imports: [NgFor, NgIf, QuizPlayerComponent],
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
  


  
  constructor(private quizService: QuizService, 
              private authService : AuthService,
              private usersService : UsersService,
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

  replay(quizQuestions : string){
    this.fetchQuizQuestions(quizQuestions);
    this.isPlayerHidden = false;
    this.isSavedQuizzesVisible = false;
    console.log(this.questions)
  }

  deleteSelected(quizId : number){

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
    if (confirm('Are you sure you want to delete this question?')) {
      this.quizService.deleteSavedQuiz(this.selectedQuizId).subscribe(
        response => {
          alert(response.message || 'Question deleted successfully');
          this.getAllSaved(this.user.id);
                    
        },
        error => {
          if (error.status === 404) {
            alert('Quiz not found');
          } else {
            alert(error.message || 'Failed to delete saved quiz');
          }
        }
      );
    }
  } else {
    alert('No quiz selected');
  }
}
  


}
