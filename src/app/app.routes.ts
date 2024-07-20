
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {QuestionComponent} from "./components/question/question.component";
import { UsersComponent } from './components/users/users.component';
import { StatsComponent } from './components/stats/stats.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { SavequizComponent } from './components/savequiz/savequiz.component';
import { QuizReplayComponent } from './components/quiz-replay/quiz-replay.component';
import { authGuard } from './auth.guard';
import {HomeComponent} from "./components/home/home.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: CreateQuizComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questions', component: QuestionComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard]},
  { path: 'profile', component: MyprofileComponent, canActivate: [authGuard] },
  { path: 'save', component: SavequizComponent,canActivate: [authGuard] },
  { path: 'replay', component: QuizReplayComponent, canActivate: [authGuard] },

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

