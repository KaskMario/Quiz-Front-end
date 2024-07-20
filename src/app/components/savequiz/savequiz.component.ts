import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../service/quizService';
import { AuthService } from '../../service/authService';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { SavedQuiz } from '../../models/savedQuiz';



@Component({
  selector: 'app-savequiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './savequiz.component.html',
  styleUrl: './savequiz.component.css'
})



export class SavequizComponent implements OnInit{
  @Input() savedQuestions : string = "";
  @Input() submittedQuizId! : number;
  @Input() isQuizSaved! : boolean;
  @Output() closeIt = new EventEmitter<void>();
  @Output() isSaved = new EventEmitter<boolean>();

  description : string ="";
  loggedInUsername : string ="";
  user !: User;
  savedQuizz : SavedQuiz;
 


  constructor(private quizService: QuizService,
              private authService : AuthService,
              private usersService : UsersService,
  ) {
    this.savedQuizz = {
      questions: this.savedQuestions,
      description: this.description,
      
    };}

    ngOnInit(): void {
      this.getUsername(); 
      this.getUser(this.loggedInUsername); 
    }

    getUsername() : void{
      this.authService.getLoggedInUsername().subscribe(
        (loggedInUsername : string) => {this.loggedInUsername = loggedInUsername;})}
    
    getUser(username : string) : void {
      
      this.usersService.getUserByUsername(username).subscribe(
        (user : User) => {this.user = user; },
        (error) => {
          alert(`Error fetching user: ${error}`);
        })
      }


saveQuiz(){
  if(this.isQuizSaved){
    console.log(this.isQuizSaved);
    alert("Your quiz is already saved.")
  }else{
  this.savedQuizz.questions = this.savedQuestions;
  this.savedQuizz.description = this.description;
  
    console.log(this.savedQuizz.description, this.user.id);
  this.quizService.saveQuiz(this.savedQuizz, this.submittedQuizId, this.user.id ).subscribe(
    (response) => {
            alert('You have saved your quiz.');
            this.isQuizSaved = true;
            this.isSaved.emit(this.isQuizSaved);
            this.closeSave();
    });
  }
}

closeSave() {
  this.closeIt.emit();}













}
