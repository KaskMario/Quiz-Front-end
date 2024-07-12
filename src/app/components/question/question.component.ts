import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../service/questionService";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {

  questions: any[] = [];
  addQuestionForm: FormGroup;
  selectedQuestion: any = null;
  editQuestionForm: FormGroup;
  isEditVisible: boolean = false;
  isDeleted: boolean = false;
  isAddPressed: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService: QuestionService) {
    this.addQuestionForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.editQuestionForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
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
    });
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.adminService.getAllQuestions().subscribe(
      (questions) => {
        this.questions = questions;

      })
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
    this.adminService.updateQuestion(updatedQuestion.id, updatedQuestion).subscribe(
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

    this.adminService.addQuestion(newQuestion).subscribe(
      (response) => {
        this.questions.push(response);
        this.isEditVisible = false;
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

  onSubmit(): void {
  }

  delete() {
    if (this.selectedQuestion) {
      if (confirm('Are you sure you want to delete this question?')) {
        this.adminService.deleteQuestion(this.selectedQuestion.id).subscribe(
          response => {
            alert(response.message || 'Question deleted successfully');
            this.getQuestions();
            this.selectedQuestion = null;
            this.isDeleted = true;
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
}
