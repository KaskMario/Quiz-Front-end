import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { CreateQuizComponent } from "./components/create-quiz/create-quiz.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { QuizPlayerComponent } from "./components/quiz-player/quiz-player.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./service/authService";
import { NgIf } from "@angular/common";
import { QuestionComponent } from "./components/question/question.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateQuizComponent,
    QuestionComponent,
    RegisterComponent,
    LoginComponent,
    HttpClientModule,
    FormsModule,
    QuizPlayerComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Java Quiz';
  isLoggedIn: boolean = false;
  loggedInUsername: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loadToken();
    this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.getLoggedInUsername().subscribe(username => this.loggedInUsername = username);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
