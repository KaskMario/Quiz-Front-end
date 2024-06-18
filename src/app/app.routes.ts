
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {LoadQuizComponent} from "./components/load-quiz/load-quiz.component";

export const routes: Routes = [ { path: '', component: CreateQuizComponent },
  { path: 'quiz/:id', component: LoadQuizComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

