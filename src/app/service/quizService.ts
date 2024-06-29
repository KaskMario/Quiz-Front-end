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
    const url = `${this.apiServerUrl}/quiz/categories`;
    return this.http.get<string[]>(url);
  }


  getQuizQuestions(category: string, numberOfQuestions: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/get?category=${category}&numberOfQuestions=${numberOfQuestions}`;
    console.log(`Requesting quiz questions from URL: ${url} with headers:`, headers);  // Logging the request details
    return this.http.get<any>(url, { headers });
  }


  getRightAnswer(questionId: number): Observable<string> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiServerUrl}/quiz/answer/${questionId}`;
    console.log(`Requesting right answer from URL: ${url} with headers:`, headers);  // Logging the request details
    return this.http.get<{ rightAnswer: string }>(url, { headers }).pipe(
      map(response => response.rightAnswer)
    );
  }

}
