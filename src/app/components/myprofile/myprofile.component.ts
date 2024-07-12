import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/authService';
import { StatsService } from '../../service/stats.service';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { NgIf } from '@angular/common';
import { StatsComponent } from '../stats/stats.component';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [NgIf, StatsComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit{

  loggedInUsername :string = "";
  user! : User
  userRole : string = "";
  selectedUsername : string = "";
  selectedUserId : number = 0;
  userIdNotNull : boolean = false;
  profileVisible : boolean = true;
  isEditVisible : boolean = false;
  editUserForm: FormGroup;

  
  

  constructor(private statsService: StatsService, 
              private authService: AuthService, 
              private usersService : UsersService,
              private router: Router,
              private formBuilder: FormBuilder) {

this.editUserForm = this.formBuilder.group({
username: ['', Validators.required],
first_name: ['', Validators.required],
last_name: ['', Validators.required],
email: ['', Validators.required]                
                });
              }

  ngOnInit(): void {
     this.getUsername();
     this.getUser(this.loggedInUsername);
    
        
}

getUsername() : void{
  this.authService.getLoggedInUsername().subscribe(
    (loggedInUsername : string) => {this.loggedInUsername = loggedInUsername;
      this.selectedUsername = this.loggedInUsername
      
    })
  
}

getUser(username : string) : void {
  
  this.usersService.getUserByUsername(username).subscribe(
    (user : User) => {this.user = user;
      console.log(user.email);
      console.log("Fetched user")
      this.selectedUserId = user.id;
      this.userIdNotNull = true;
      console.log(this.selectedUserId)
    },
    (error) => {
      alert(`Error fetching user: ${error}`);
    }

  )
  
}

getRoleName(roleName : String) : String {
  if (roleName === "ROLE_USER") {
    return this.userRole="User"
    
  } else {
    return this.userRole="Administrator"
    }
}


onCloseStats (){
  this.router.navigate(['']);
}

edit(){
  this.editUserForm.patchValue({
    username: this.user.username,
    first_name: this.user.first_name,
    last_name: this.user.last_name,
    email: this.user.email,});

  this.profileVisible = false;
  this.isEditVisible = true;
}

save(): void {
    const formValues = this.editUserForm.getRawValue();
    const updatedUser = {
      ...formValues,
      password : this.user.password,
      id: this.user.id,
      role : this.user.role
      };
  console.log(updatedUser.id)
    this.usersService.updateUser(this.user.id, updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.isEditVisible = false;
        this.profileVisible = true;
        this.ngOnInit();

      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
      
     

discard(){
  this.profileVisible = true;
  this.isEditVisible = false;
}




}
