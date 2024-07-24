import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../service/quizService";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {QuizPlayerComponent} from "../quiz-player/quiz-player.component";
import {LoginComponent} from "../login/login.component";
import {QuestionComponent} from "../question/question.component";


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
    QuestionComponent,

  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit {

  categories: string[] = [];
  quizForm: FormGroup;
  questions: any[] = [];
  quizCreated: boolean = false;
  numberOfQuestions = [5,10];
  difficultyLevels: string[] = [];
  outputCategory : String = "";
  outputDifficulty : String = "";


  constructor(private formBuilder: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      numberOfQuestions: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchDifficultyLevels();
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
      const difficulty = this.quizForm.value.difficulty;
      const numberOfQuestions = this.quizForm.value.numberOfQuestions;

      this.quizCreated = false;
      this.fetchQuizQuestions(category,difficulty,numberOfQuestions);
      this.outputCategory = this.quizForm.value.category;
      this.outputDifficulty = this.quizForm.value.difficulty;
    }

  }

  fetchQuizQuestions(category: string,difficulty:string, numberOfQuestions: number): void {
    this.quizService.getQuizQuestions(category, difficulty, numberOfQuestions).subscribe(
      (questions) => {
        if (questions.length >= numberOfQuestions) {
        this.questions = questions;
        this.quizCreated = true;
        } else {
          alert(`Not enough questions found for the selected category and difficulty. Only found ${questions.length} questions.`);
        }
      },
    );
  }
  fetchDifficultyLevels():void {
    this.quizService.getDifficulty().subscribe(
      (difficultyLevel)=> {
        this.difficultyLevels = difficultyLevel;
      },
      error => {
        console.error('Failed to fetch difficulty', error)
      }
    );
  }

  startNewQuiz(): void {
    this.quizCreated = false;
    this.quizForm.reset();
    this.fetchCategories();
    this.fetchDifficultyLevels();
  }
  handleNewQuizEvent(): void {
    this.startNewQuiz();
  }

}
