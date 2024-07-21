import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import {ErrorService} from "./errorService";
import {SharedService} from "./sharedService";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private sharedService: SharedService)  {

  }


  getCategories(): Observable<string[]> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/categories`;
    return this.http.get<string[]>(url, {headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
  }


  getQuizQuestions(category: string,difficulty:string, numberOfQuestions: number): Observable<any> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/get?category=${category}&difficulty=${difficulty}&numberOfQuestions=${numberOfQuestions}`;
    return this.http.get<any>(url, {headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
  }


  getRightAnswer(questionId: number): Observable<string> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/answer/${questionId}`;
    return this.http.get<{ rightAnswer: string }>(url, {headers}).pipe(
      map(response => response.rightAnswer),
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
  }

  getDifficulty(): Observable<string[]> {
    const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/difficulty-levels`;
    return this.http.get<string[]>(url,{headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
  }

saveQuiz(savedQuizz : any, quizResultId : number, userId : number){
  const headers = this.sharedService.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/save?quizResultId=${quizResultId}&userId=${userId}`;
    return this.http.post<any>(url, savedQuizz, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
}

getAllSaved(userId : number){
  const headers = this.sharedService.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saved/${userId}`;
    return this.http.get<any[]>(url, {headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
  }

getSavedQuestions(quizQuestions : string) : Observable<any>{
  const headers = this.sharedService.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saved_questions?quizQuestions=${quizQuestions}`;
    return this.http.get<any[]>(url, {headers}).pipe(
      catchError(error => this.errorService.handleError(error, 'quiz'))
    );
}

deleteSavedQuiz(id: number): Observable<any> {
  const headers = this.sharedService.getAuthHeaders();
  const url = `${this.apiServerUrl}/quiz/saves/delete/${id}`;
  return this.http.delete(url, { headers, responseType: 'text' }).pipe(
    catchError(error => this.errorService.handleError(error, 'quiz'))
  );
}


}