import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

  ngOnInit(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  onOptionSelected(option: string): void {
    this.selectedOption = option;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedOption = ''; // Reset selected option
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedOption = ''; // Reset selected option
    }
  }

  submitQuiz(): void {
    // Handle quiz submission logic
    console.log('Quiz submitted');
  }

}

