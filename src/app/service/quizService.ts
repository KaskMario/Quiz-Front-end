import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

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
}
