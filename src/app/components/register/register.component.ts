import { Component } from '@angular/core';
import {AuthService} from "../../service/authService";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  adminKey: string = '';
  isAdminRegistration: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}


  register(): void {
    console.log(`Registering user: ${this.username}, as admin: ${this.isAdminRegistration}`);
    if (this.isAdminRegistration) {
      this.authService.registerAdmin(this.username, this.password, this.adminKey).subscribe({
        next: message => {
          console.log('Admin registration successful:', message);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Registration failed', err);
          alert('Registration failed: ' + err.message);
        }
      });
    } else {
      this.authService.register(this.username, this.password).subscribe({
        next: message => {
          console.log('Registration successful:', message);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Registration failed', err);
          alert('Registration failed: ' + err);
        }
      });
    }
  }



}
