import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public createQuiz(category: string, numberOfQuestions: number, title: string): Observable<any> {
    const url = `${this.apiServerUrl}/quiz/create`;
    const body = { category, numberOfQuestions, title };
    return this.http.post(url, body);
  }

  public getQuizQuestions(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/quiz/get/${id}`);
  }







}
