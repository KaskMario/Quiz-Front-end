
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {QuestionComponent} from "./components/question/question.component";
import { UsersComponent } from './components/users/users.component';


export const routes: Routes = [
  { path: '', component: CreateQuizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'users', component: UsersComponent }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

