
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {QuizPlayerComponent} from "./components/quiz-player/quiz-player.component";


export const routes: Routes = [ { path: '', component: CreateQuizComponent },
  { path: 'quiz-player', component: QuizPlayerComponent }  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

