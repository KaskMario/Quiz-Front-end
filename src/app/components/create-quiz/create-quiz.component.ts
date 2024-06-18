import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../service/quizService";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {QuizPlayerComponent} from "../quiz-player/quiz-player.component";


@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    QuizPlayerComponent,

  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit{

  categories: string[] = [];
  quizForm: FormGroup;
  questions: any[] = [];
  quizCreated: boolean = false; // Flag to control visibility of QuizPlayerComponent

  constructor(private formBuilder: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      category: ['', Validators.required],
      numberOfQuestions: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.quizService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Failed to fetch categories', error);
      }
    );
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const category = this.quizForm.value.category;
      const numberOfQuestions = this.quizForm.value.numberOfQuestions;
      console.log('Submitting:', { category, numberOfQuestions });
      this.fetchQuizQuestions(category, numberOfQuestions);
    }
  }

  fetchQuizQuestions(category: string, numberOfQuestions: number): void {
    console.log('Fetching Questions:', { category, numberOfQuestions });
    this.quizService.getQuizQuestions(category, numberOfQuestions).subscribe(
      (questions) => {
        this.questions = questions;
        console.log('Quiz Questions:', this.questions);
        this.quizCreated = true; // Set flag to true to show QuizPlayerComponent
      },
      (error) => {
        console.error('Failed to fetch quiz questions', error);
      }
    );
  }
}
