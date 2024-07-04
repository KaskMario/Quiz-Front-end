import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../service/authService";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  @Output() loggedIn = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: token => {
        localStorage.setItem('token', token);
        this.loggedIn.emit(this.username);
        this.router.navigate(['/']);
        alert("Login successful");
      },
      error: err => {
        console.error('Login failed', err);
        alert('Login failed: ' + err.message);
      }
    });
  }


}
