import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authService';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { Stats } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  logResults(newResult : any, username : String ){
  const headers = this.getAuthHeaders();
  const url = `${this.apiServerUrl}/stats/log/${username}`;
  return this.http.put<any>(url, newResult, { headers }).pipe(
    catchError(this.handleError)
  );
}

getStatsById(userId : number) : Observable<Stats>{
  const headers = this.getAuthHeaders();
  const url = `${this.apiServerUrl}/stats/${userId}`;
  return this.http.get<Stats>(url, { headers }).pipe(
    catchError(this.handleError)
  );

}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    if (error.status === 403) {
      errorMessage = 'Access forbidden: You do not have the necessary permissions to access this resource.';
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

  }




