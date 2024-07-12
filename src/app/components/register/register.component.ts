import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from "../../service/authService";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-register',
  standalone: true,
   imports: [
    FormsModule,
    NgIf,
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  first_name : string = '';
  last_name : string = '';
  email : string = '';
  adminKey: string = '';
  isAdminRegistration: boolean = false;
  @Output() loggedIn = new EventEmitter<string>();


  constructor(private authService: AuthService, private router: Router,  ) {
    }


  register(): void {
    console.log(`Registering user: ${this.username}, as admin: ${this.isAdminRegistration}`);
    if (this.isAdminRegistration) {
      this.authService.registerAdmin(this.username, this.password, this.first_name, this.last_name, this.email, this.adminKey).subscribe({
        next: message => {
          console.log('Admin registration successful:', message);
          this.router.navigate(['/login']); // Redirect to the login page or any other page
        },
        error: err => {
          console.error('Registration failed', err);
          alert('Registration failed: ' + err.message);
        }
      });
    } else {
      this.authService.register(this.username, this.password, this.first_name, this.last_name, this.email).subscribe({
        next: message => {
          console.log('Registration successful:', message);
                 
          this.authService.login(this.username, this.password).subscribe({
            next: token => {
              localStorage.setItem('token', token);
              this.router.navigate(['/']);
            },
            error: err => {
              console.error('Login failed', err);
              alert('Login failed: ' + err.message);
            }
          });
        },
        error: err => {
          console.error('Registration failed', err);
          alert('Registration failed: ' + err);
        }
      });
    }
  }



}
