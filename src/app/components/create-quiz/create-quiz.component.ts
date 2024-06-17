import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../models/quiz";
import {QuizService} from "../../service/quizService";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryService} from "../../service/categoryService";


@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,

  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit{

  quizForm: FormGroup;
  categories: string[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {
    this.quizForm = this.formBuilder.group({
      category: '',
      numberOfQuestions: '',
      title: ''
    });
  }

  ngOnInit(): void {
    this.loadCategories();

  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Failed to fetch categories', error);
      }
    );
  }
  onSubmit(): void {
    const { category, numberOfQuestions, title } = this.quizForm.value;

    if (category && numberOfQuestions && title) {
      this.quizService.createQuiz(category, +numberOfQuestions, title).subscribe(
        (response) => {
          console.log('Quiz created successfully:', response);
        },
        (error) => {
          console.error('Failed to create quiz:', error);
        }
      );
    } else {
      console.error('All fields are required');
    }
  }

}
