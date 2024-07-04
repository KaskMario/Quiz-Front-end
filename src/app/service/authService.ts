import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInUsername: string = '';

  constructor(private http: HttpClient) {
  }


  login(username: string, password: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/login`;
    return this.http.post(url, { username, password }, { responseType: 'text' }).pipe(
      map(response => response as string),
      tap(token => {
        localStorage.setItem('token', token);
        this.loggedInUsername = username;
        this.loggedIn.next(true);
      }),
      catchError(this.handleError)

    );

  }
 /* isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  getLoggedInUsername(): string {
    return this.loggedInUsername;
  }*/

  register(username: string, password: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register`;
    return this.http.post(url, { username, password }, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(this.handleError)
    );
  }

  registerAdmin(username: string, password: string, adminKey: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register-admin`;
    const params = new HttpParams().set('adminKey', adminKey);
    return this.http.post(url, { username, password }, { params, responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.loggedInUsername = '';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}







