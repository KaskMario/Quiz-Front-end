import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getCategories(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/categories`;
    return this.http.get<string[]>(url, {headers});
  }


  getQuizQuestions(category: string,difficulty:string, numberOfQuestions: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/get?category=${category}&difficulty=${difficulty}&numberOfQuestions=${numberOfQuestions}`;
    return this.http.get<any>(url, {headers});
  }


  getRightAnswer(questionId: number): Observable<string> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/answer/${questionId}`;
    return this.http.get<{ rightAnswer: string }>(url, {headers}).pipe(
      map(response => response.rightAnswer)
    );
  }

  getDifficulty(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/difficulty-levels`;
    return this.http.get<string[]>(url,{headers});
  }

saveQuiz(savedQuizz : any, quizResultId : number, userId : number){
  const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/save?quizResultId=${quizResultId}&userId=${userId}`;
    return this.http.post<any>(url, savedQuizz, { headers }).pipe(
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

getAllSaved(userId : number){
  const headers = this.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saved/${userId}`;
    return this.http.get<any[]>(url, {headers});
  }

getSavedQuestions(quizQuestions : string) : Observable<any>{
  const headers = this.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saved_questions?quizQuestions=${quizQuestions}`;
    return this.http.get<any[]>(url, {headers});
}

deleteSavedQuiz(id: number): Observable<any> {
  const headers = this.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saves/delete/${id}`;
  return this.http.delete(url, { headers, responseType: 'text' }).pipe(
    catchError(this.handleError)
  );
}


}



