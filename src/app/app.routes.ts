
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {QuizPlayerComponent} from "./components/quiz-player/quiz-player.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";


export const routes: Routes = [ { path: '', component: CreateQuizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

