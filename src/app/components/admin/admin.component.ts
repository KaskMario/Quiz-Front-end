import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/adminService";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit  {

  questions: string[] = [];
  adminForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.adminForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }
  ngOnInit(): void {
   this.getQuestions();
  }

  getQuestions(): void {
    this.adminService.getAllQuestions().subscribe(
      (questions) => {
        console.log('Questions:', questions);
        this.questions = questions;
      })
  }
  onSubmit(): void {}

}
