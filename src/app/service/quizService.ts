import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<string[]> {
    const url = `${this.apiServerUrl}/quiz/categories`;
    return this.http.get<string[]>(url);
  }


  getQuizQuestions(category: string, numberOfQuestions: number): Observable<any> {
    const url = `${this.apiServerUrl}/quiz/get?category=${category}&numberOfQuestions=${numberOfQuestions}`;
    return this.http.get<any>(url);
  }

  getRightAnswer(questionId: number): Observable<string> {
    const url = `${this.apiServerUrl}/quiz/answer/${questionId}`;
    return this.http.get<{ rightAnswer: string }>(url).pipe(
      map(response => response.rightAnswer));

  }






}
