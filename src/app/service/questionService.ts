import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./authService";
import {Question} from "../models/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {

  }


  getAllQuestions(): Observable<any[]> {
    const url = `${this.apiServerUrl}/question/allQuestions`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  deleteQuestion(id: number): Observable<any> {
    const url = `${this.apiServerUrl}/question/delete/${id}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  addQuestion(question: Question): Observable<{message:string}> {
    const url = `${this.apiServerUrl}/question/add`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(url, question, { headers }).pipe(
      catchError(this.handleError)
    );

  }

  updateQuestion(id: number, updatedQuestion: any) {
    const url = `${this.apiServerUrl}/question/update`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
     // 'Content-Type': 'application/json'
    });
    return this.http.put<any>(url, updatedQuestion, { headers }).pipe(
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

