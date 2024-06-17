import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { Quiz } from "../models/quiz";


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
    return this.http.post<Quiz>(url, body);
  }







}
