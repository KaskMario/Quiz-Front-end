import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CreateQuizComponent} from "./components/create-quiz/create-quiz.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QuizPlayerComponent} from "./components/quiz-player/quiz-player.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./service/authService";
import {NgIf} from "@angular/common";
import {QuestionComponent} from "./components/question/question.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CreateQuizComponent, QuestionComponent, RegisterComponent, LoginComponent, HttpClientModule, FormsModule, QuizPlayerComponent, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Java Quiz';
  isLoggedIn: boolean = false;
  loggedInUsername: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoggedInStatus();
  }
  checkLoggedInStatus(): void {
    const token = this.authService.getToken();
    const username = this.authService.getUsername();
    if (token && username) {
      this.isLoggedIn = true;
      this.loggedInUsername = username;
    }
  }

  onLoggedIn(username: string): void {
    this.isLoggedIn = true;
    this.loggedInUsername = username;
  }
  onActivate(event: any): void {
    if (event.loggedIn) {
      event.loggedIn.subscribe((username: string) => {
        this.onLoggedIn(username);
      });
    }
  }


}
