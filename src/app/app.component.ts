import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QuizPlayerComponent} from "./components/quiz-player/quiz-player.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateQuizComponent, RegisterComponent, LoginComponent, HttpClientModule, FormsModule, QuizPlayerComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Java Quiz';



}
