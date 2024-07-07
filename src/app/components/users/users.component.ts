import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from "@angular/forms";
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';
import { CommonModule, NgFor } from '@angular/common';
import { Role } from '../../models/role';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  usersForm: FormGroup;
  userRole : String = "";
  editUserForm: FormGroup;
  selectedUser: any = null;
  selectedRole: any = null;
  isEditVisible : boolean = false;
  isAllVisible : boolean = true;
  roles: Role[] = [];
  isUsersNotEmpty : boolean = true;
 
  
  selectedUserId: number | null = null;


  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.usersForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.editUserForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      role: [ '', ],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
  this.getAllUsers();
  this.isAllVisible = true;
  this.getRoles();
  
  
    }

    getAllUsers(): void {
      this.usersService.getUsers().subscribe(
        (users : User[]) => {
          console.log('Users:', users);
          this.users = users;
          this.isUsersNotEmpty = this.users.length > 0;
        })
        
        console.log(this.isUsersNotEmpty);
      }

      getRoles(): void {
        this.usersService.getRoles().subscribe(
          (roles : Role[]) => {
         this.roles = roles;
          })
        }

  getRoleName(roleName : String) : String {
    if (roleName === "ROLE_USER") {
      return this.userRole="User"
      
    } else {
      return this.userRole="Administrator"
      }
  }
 
  
  handleClick(userId: number) {
   this.selectedUserId = userId;
   this.isEditVisible = false;
  
  }

 
  showButtons(userId: number): boolean {
    return this.selectedUserId === userId;
  }

    edit(userId: number) {
        
    if (this.selectedUserId === userId) {
            this.selectedUser = this.users.find(u => u.id === userId);
            this.selectedRole = this.roles.find(r => r.id === this.selectedUser.role.id)
            
      if (this.selectedUser) {
        this.editUserForm.patchValue({
          id: this.selectedUser.id,
          username: this.selectedUser.username,
          first_name: this.selectedUser.first_name,
          last_name: this.selectedUser.last_name,
          email: this.selectedUser.email,
          role: this.selectedRole ? this.selectedRole.role : '',
          
          
          
      });
        this.isEditVisible = true;
        this.isAllVisible = false;
         }
    }
  }

  
  saveEdit(): void {
    const formValues = this.editUserForm.getRawValue();
    const updatedRole = this.roles.find(role => role.role === formValues.role);
    const updatedUser = {
      ...formValues,
      password : this.selectedUser.password,
      id: this.selectedUserId,
      role : updatedRole
    };
  
    this.usersService.updateUser(updatedUser.id, updatedUser).subscribe(
      (response) => {
        const index = this.users.findIndex(q => q.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = { ...updatedUser, ...response };
        }
        this.isEditVisible = false;
        this.isAllVisible = true;
        this.selectedUser = { ...updatedUser, ...response };
        alert('User updated successfully');
      },
      (error) => {
        alert(`Error updating user: ${error}`);
      }
    );
  }
  
  deleteUser() : void{
    const userId = this.selectedUser.id;
    console.log(userId);
    this.usersService.deleteUser(userId).subscribe(
      () => { this.users = this.users.filter(user => user.id !== userId);
        this.isUsersNotEmpty = this.users.length > 0;},
      (error) => {
        console.error(`Error deleting user: ${error}`);
      }
    );
    this.selectedUserId = null;
    this.isEditVisible = false;
    this.isAllVisible = true;

  }

  

  discardEdit(){
    this.selectedUserId = null;
    this.isEditVisible = false;
    this.isAllVisible = true;
  }
  
  
 deleteSelected(userId : number){
  this.selectedUser = this.users.find(u => u.id === userId);
  this.deleteUser();
 }







}
