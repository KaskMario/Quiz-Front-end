import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {QuizService} from "../../service/quizService";
import {NgForOf, NgIf} from "@angular/common";
import {CreateQuizComponent} from "../create-quiz/create-quiz.component";
import {AuthService} from "../../service/authService";
import {Router} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsService } from '../../service/stats.service';
import { QuizResult } from '../../models/quizResult';
import { SavequizComponent } from '../savequiz/savequiz.component';

@Component({
  selector: 'quiz-player',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SavequizComponent
    
  ],
  templateUrl: './quiz-player.component.html',
  styleUrl: './quiz-player.component.css'
})
export class QuizPlayerComponent implements OnInit{
  @Input() questions: any[] = [];
  @Input() formValues: any;
  @Input() isReplayMode: boolean = false;
  @Output() newQuiz = new EventEmitter<void>();
  @Output() closePlayer = new EventEmitter<void>();

  title: string = '"Practice makes perfect."';
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  selectedOption: string = '';
  correctAnswer: string = '';
  options: string[] = [];
  isOptionSelected: boolean = false;
  correctAnswersCount: number = 0;
  showResults: boolean = false;
  isSubmitPressed: boolean = false;
  isResultSumbmitted : boolean = false;
  loggedInUsername : String = "";
  savedQuestions : string = "";
  submittedQuizId! : number;
  isSavePressed : boolean = false;
  isQuizVisible : boolean = true;
  isQuizSaved : boolean = false;

 



  constructor(private quizService: QuizService,
              private authService: AuthService,
              private statsService : StatsService,
              private router: Router,
               ) {}

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.loadCurrentQuestion();
    }
    this.correctAnswersCount=0;
    this.showResults = false;
    this.isResultSumbmitted = false;
    this.isQuizVisible = true;
    this.isSavePressed = false;
    console.log(this.isReplayMode);
    console.log(this.isQuizSaved)
  }

  onOptionSelected(option: string): void {
    if(!this.isOptionSelected) {
    this.selectedOption = option;
    this.isOptionSelected = true;
      if (this.isAnswerCorrect()) {
        this.correctAnswersCount++;
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1 && !this.isSubmitPressed && this.isOptionSelected) {
      this.currentQuestionIndex++;
      this.loadCurrentQuestion();
      this.showResults = false;
    }
  }

  submitQuiz(): void {
    this.showResults = true;
    this.isSubmitPressed = true;
    if(!this.isResultSumbmitted) {
      this.submitResults();
       this.isResultSumbmitted = true;}
}
  
fetchRightAnswer(questionId: number): void {
    this.quizService.getRightAnswer(questionId).subscribe(
      (answer) => {
        this.correctAnswer = answer;
      },
    );
  }
  isAnswerCorrect(): boolean {
    return this.selectedOption === this.correctAnswer;
  }
  loadCurrentQuestion(): void {
    this.isOptionSelected=false;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.options = this.currentQuestion.options;
    this.fetchRightAnswer(this.currentQuestion.id);
    this.selectedOption = '';
  }
  triggerStartNewQuiz(): void {
    this.newQuiz.emit();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('Log out successful!');
  }

submitResults(){
  const newResult : QuizResult = {category : this.formValues.category, difficulty : this.formValues.difficulty, 
    length : this.questions.length, correctAnswers : this.correctAnswersCount}
  this.authService.getLoggedInUsername().subscribe(username => {this.loggedInUsername = username;});
  this.statsService.logResults(newResult, this.loggedInUsername).subscribe(
    (response) => {
      console.log('Results logged');
      this.submittedQuizId = response.id;
          },
    (error) => {
      alert(`Error logging results: ${error}`);
    }
  );
}

saveQuiz() {
  const quizQuestions : string[]= [];
  for (let i = 0; i < this.questions.length; i++) {
    quizQuestions[i] = this.questions[i].id;
    }
  console.log(quizQuestions.join('x'));
  this.savedQuestions = quizQuestions.join('x');
  this.isSavePressed = true;
  this.isQuizVisible = false;
  console.log(this.submittedQuizId)
  console.log(this.isQuizSaved)
}

onCloseSave(){
  this.isSavePressed = false;
  this.isQuizVisible = true;
}

closeReplay(){
  this.closePlayer.emit();
  }

  onQuizSaved(isSaved : boolean){
    this.isQuizSaved = isSaved;
  }


}

