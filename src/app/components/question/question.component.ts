import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../service/questionService';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../models/question';
import { AuthService } from '../../service/authService';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: any[] = [];
  unapprovedQuestions: Question[] = [];
  uniqueCategories: string[] = [];
  addQuestionForm: FormGroup;
  selectedQuestion: any = null;
  editQuestionForm: FormGroup;
  isEditVisible: boolean = false;
  isDeleted: boolean = false;
  isAddPressed: boolean = false;
  questionSelected: boolean = false;
  selectedCategory: string = '';
  userRole: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.addQuestionForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.editQuestionForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      questionTitle: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      rightAnswer: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.addQuestionForm.get('title')?.valueChanges.subscribe(value => {
      this.selectQuestion(value);
      this.questionSelected = !!value;
    });
    this.addQuestionForm.get('category')?.valueChanges.subscribe(value => {
      this.selectedCategory = value;
    });
  }

  ngOnInit(): void {
    this.selectedQuestion = null;
    this.getQuestions();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
      if (role === 'ROLE_ADMIN') {
        this.getUnapprovedQuestions();
      }
    });
  }

  getQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (questions) => {
        this.questions = questions;
        this.uniqueCategories = this.getUniqueCategories(questions);
      }
    );
  }

  getUnapprovedQuestions(): void {
    this.questionService.getUnapprovedQuestions().subscribe(
      questions => {
        this.unapprovedQuestions = questions;
      }
    );
  }

  isUnapproved(selectedQuestion: any): boolean {
    return selectedQuestion && !selectedQuestion.approved;
  }

  selectQuestion(questionTitle: string): void {
    this.isDeleted = false;
    this.selectedQuestion = this.questions.find(q => q.questionTitle === questionTitle);
  }

  edit(): void {
    if (this.selectedQuestion) {
      this.isEditVisible = true;
      this.isAddPressed = false;
      this.editQuestionForm.patchValue(this.selectedQuestion);
    }
  }

  saveEdit(): void {
    const updatedQuestion = {
      ...this.editQuestionForm.getRawValue(),
      id: this.selectedQuestion.id
    };
    this.questionService.updateQuestion(updatedQuestion.id, updatedQuestion).subscribe(
      (response) => {
        const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
        }
        this.isEditVisible = false;
        this.selectedQuestion = updatedQuestion;
        alert('Question updated successfully');
      },
      (error) => {
        alert(`Error updating question: ${error}`);
      }
    );
  }

  add(): void {
    this.isEditVisible = true;
    this.isAddPressed = true;
    this.editQuestionForm.reset();
    this.addQuestionForm.reset();
    this.selectedQuestion = null;
  }

  saveAddedQuestion(): void {
    const newQuestion = {
      ...this.editQuestionForm.getRawValue()
    };
    delete newQuestion.id;

    this.questionService.addQuestion(newQuestion).subscribe(
      (response) => {
        this.questions.push(response);
        this.isEditVisible = false;
        this.ngOnInit()
        alert('Question added successfully');
      },
      (error) => {
        alert(`Error adding question: ${error}`);
      }
    );
  }

  cancelEdit(): void {
    this.isEditVisible = false;
  }

  delete(): void {
    if (this.selectedQuestion) {
      if (confirm('Are you sure you want to delete this question?')) {
        this.questionService.deleteQuestion(this.selectedQuestion.id).subscribe(
          response => {
            this.selectedQuestion = null;
            this.isDeleted = true;
            this.ngOnInit();
            alert(response.message || 'Question deleted successfully');
          },
          error => {
            if (error.status === 404) {
              alert('Question not found');
            } else {
              alert(error.message || 'Failed to delete question');
            }
          }
        );
      }
    } else {
      alert('No question selected');
    }
  }

  approve(questionId: number): void {
    if (this.userRole === 'ROLE_ADMIN') {
      this.questionService.approveQuestion(questionId).subscribe(
        response => {
          alert('Question approved successfully');
          this.ngOnInit();
        },
        error => {
          alert(`Error approving question: ${error}`);
        }
      );
    } else {
      alert('You do not have permission to approve questions.');
    }
  }

  viewQuestion(question: Question): void {
    this.selectedQuestion = question;
    this.isEditVisible = true;
    this.isAddPressed = false;
    this.editQuestionForm.patchValue(this.selectedQuestion);
  }

  viewUnapprovedQuestion(question: Question): void {
    this.selectedQuestion = question;
    this.isEditVisible = false;
    this.isAddPressed = false;
    this.editQuestionForm.patchValue(this.selectedQuestion);
  }

  get filteredQuestions() {
    if (this.selectedCategory) {
      return this.questions.filter(question => question.category === this.selectedCategory);
    } else {
      return this.questions;
    }
  }

  getUniqueCategories(questions: any[]): string[] {
    const categories = questions.map(question => question.category);
    return [...new Set(categories)];
  }

  onSubmit(): void {
  }
}
