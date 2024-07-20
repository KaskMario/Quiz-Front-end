import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Question} from "../models/question";
import {ErrorService} from "./errorService";
import {SharedService} from "./sharedService";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private sharedService: SharedService) {

  }


  getAllQuestions(): Observable<Question[]> {
    const url = `${this.apiServerUrl}/question/allQuestions`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.get<Question[]>(url, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
    );
  }
  deleteQuestion(id: number): Observable<any> {
    const url = `${this.apiServerUrl}/question/delete/${id}`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.delete(url, { headers, responseType: 'text' }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
      );
  }
  addQuestion(question: Question): Observable<{message:string}> {
    const url = `${this.apiServerUrl}/question/add`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.post<any>(url, question, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
    );

  }

  updateQuestion(id: number, updatedQuestion: any) {
    const url = `${this.apiServerUrl}/question/update`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.put<any>(url, updatedQuestion, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
    );
  }

  getUnapprovedQuestions(): Observable<Question[]> {
    const url = `${this.apiServerUrl}/question/unapproved`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.get<Question[]>(url, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
    );
  }

  approveQuestion(id: number): Observable<any> {
    const url = `${this.apiServerUrl}/question/approve/${id}`;
    const headers = this.sharedService.getAuthHeaders();
    return this.http.put<any>(url, {}, { headers }).pipe(
      catchError(error => this.errorService.handleError(error, 'question'))
    );
  }
}

