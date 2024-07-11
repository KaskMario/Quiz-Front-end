
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {QuestionComponent} from "./components/question/question.component";
import { UsersComponent } from './components/users/users.component';
import { StatsComponent } from './components/stats/stats.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';


export const routes: Routes = [
  { path: '', component: CreateQuizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: MyprofileComponent },
  
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

