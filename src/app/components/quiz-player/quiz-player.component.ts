import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from "../../service/quizService";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'quiz-player',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './quiz-player.component.html',
  styleUrl: './quiz-player.component.css'
})
export class QuizPlayerComponent implements OnInit{
  @Input() questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  selectedOption: string = '';
  correctAnswer: string = '';
  options: string[] = [];
  isOptionSelected: boolean = false;
  correctAnswersCount: number = 0;
  showResults: boolean = false;
  isSubmitPressed: boolean = false;



  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.loadCurrentQuestion();
    }
    this.correctAnswersCount=0;
    this.showResults = false;
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
    if (this.currentQuestionIndex < this.questions.length - 1 && !this.isSubmitPressed) {
      this.currentQuestionIndex++;
      this.loadCurrentQuestion();
      this.showResults = false;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0 && !this.isSubmitPressed) {
      this.currentQuestionIndex--;
      this.loadCurrentQuestion();
      this.showResults = false;
    }
  }

  submitQuiz(): void {
    this.showResults = true;
    this.isSubmitPressed = true;
  }
  fetchRightAnswer(questionId: number): void {
    this.quizService.getRightAnswer(questionId).subscribe(
      (answer) => {
        this.correctAnswer = answer;
      },
      (error) => {
        console.error('Failed to fetch right answer', error);
      }
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


}

