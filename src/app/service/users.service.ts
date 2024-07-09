import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService : AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  public getUsers(): Observable<User[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<User []>(`${this.apiServerUrl}/users/all`, { headers});}

    public getRoles(): Observable<Role[]>{
      const headers = this.getAuthHeaders();
      return this.http.get<Role []>(`${this.apiServerUrl}/users/roles`, { headers});
    }

   
    updateUser(id : number, updatedUser: any)  {
      const url = `${this.apiServerUrl}/users/update`;
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.put<any>(url, updatedUser, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (error.status === 403) {
          errorMessage = 'Username already in use.';
        } else {
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }

deleteUser(userId : number) : Observable<void> {
  const headers = this.getAuthHeaders();
  const params = new HttpParams().set('userId', userId.toString());
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete`, { headers, params });
}


  }
  

  

