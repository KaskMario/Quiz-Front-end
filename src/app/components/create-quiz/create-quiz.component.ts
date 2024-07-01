import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../service/quizService";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {QuizPlayerComponent} from "../quiz-player/quiz-player.component";
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    QuizPlayerComponent,
    LoginComponent,

  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit {

  categories: string[] = [];
  quizForm: FormGroup;
  questions: any[] = [];
  quizCreated: boolean = false;


  constructor(private formBuilder: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      category: ['', Validators.required],
      numberOfQuestions: ['', [Validators.required, Validators.min(1)]]
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
      this.quizCreated = false;
      this.fetchQuizQuestions(category, numberOfQuestions);
      this.quizForm.reset()

    }

  }

  fetchQuizQuestions(category: string, numberOfQuestions: number): void {
    this.quizService.getQuizQuestions(category, numberOfQuestions).subscribe(
      (questions) => {
        this.questions = questions;
        this.quizCreated = true;
      },
    );
  }

}
