import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() {}

  public handleError(error: HttpErrorResponse, context: string): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (context) {
        case 'auth':
          errorMessage = this.getAuthErrorMessage(error);
          break;
        case 'question':
          errorMessage = this.getQuestionErrorMessage(error);
          break;
        case 'quiz':
          errorMessage = this.getQuizErrorMessage(error);
          break;
        case 'stats':
          errorMessage = this.getStatsErrorMessage(error);
          break;
        case 'user':
          errorMessage = this.getUserErrorMessage(error);
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private getAuthErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'Authentication failed: Incorrect username or password.';
    } else {
      return `Auth Error - Code: ${error.status}, Message: ${error.message}`;
    }
  }

  private getQuestionErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return 'Question not found.';
    } else if (error.status === 403) {
      return 'Access forbidden: You do not have the necessary permissions to access this resource.';
    } else {
      return `Question Error - Code: ${error.status}, Message: ${error.message}`;
    }
  }

  private getQuizErrorMessage(error: HttpErrorResponse): string {
    return `Quiz Error - Code: ${error.status}, Message: ${error.message}`;
  }

  private getStatsErrorMessage(error: HttpErrorResponse): string {
    return `Stats Error - Code: ${error.status}, Message: ${error.message}`;
  }

  private getUserErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 409) {
      return 'Username already in use.';
    } else {
      return `User Error - Code: ${error.status}, Message: ${error.message}`;
    }
  }
}
