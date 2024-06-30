import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/adminService";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit  {

  questions: any[] = [];
  adminForm: FormGroup;
  selectedQuestion: any = null;
  editForm: FormGroup;
  isEditVisible: boolean = false;
  isDeleted: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.adminForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.editForm = this.formBuilder.group({
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
    this.adminForm.get('title')?.valueChanges.subscribe(value => {
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
      this.editForm.patchValue(this.selectedQuestion);
    }
  }

  saveEdit(): void {
    const updatedQuestion = {
      ...this.editForm.getRawValue(),
      id: this.selectedQuestion.id
    };
    this.adminService.updateQuestion(updatedQuestion.id, updatedQuestion).subscribe(
      (response) => {
        // Update the local questions array with the updated question
        const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
        }
        this.isEditVisible = false;
        this.selectedQuestion = updatedQuestion;
      },
      (error) => {
        console.error('Error updating question:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.isEditVisible = false;
  }

  onSubmit(): void {}

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
            console.error('Error deleting question:', error);
            alert(error.message || 'Failed to delete question');
          }
        );
      }
    } else {
      alert('No question selected');
    }
  }

}
