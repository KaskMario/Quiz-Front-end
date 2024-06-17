import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateQuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizApp';



}
