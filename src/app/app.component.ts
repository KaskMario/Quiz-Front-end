import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QuizPlayerComponent} from "./components/quiz-player/quiz-player.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateQuizComponent, HttpClientModule, FormsModule, QuizPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizApp';



}
