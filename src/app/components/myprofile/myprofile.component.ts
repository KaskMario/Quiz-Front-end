import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/authService';
import { StatsService } from '../../service/stats.service';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { NgIf } from '@angular/common';
import { StatsComponent } from '../stats/stats.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [NgIf, StatsComponent],
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

  
  

  constructor(private statsService: StatsService, 
              private authService: AuthService, 
              private usersService : UsersService,
              private router: Router) {}

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






}
