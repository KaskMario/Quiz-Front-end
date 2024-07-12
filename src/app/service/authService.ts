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
  private loggedInUsername = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }


  login(username: string, password: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/login`;
    return this.http.post(url, { username, password }, { responseType: 'text' }).pipe(
      map(response => response as string),
      tap(token => {
        localStorage.setItem('token', token);
        this.loggedInUsername.next(username);
        this.loggedIn.next(true);
      }),
      catchError(this.handleError)

    );

  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  getLoggedInUsername(): Observable<string> {
    return this.loggedInUsername.asObservable();
  }
  
  register(username: string, password: string, first_name: string, last_name : string, email : string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register`;
    const user = { username, password, first_name, last_name, email };

    return this.http.post(url, user, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(this.handleError)
    );
  }

  registerAdmin(username: string, password: string, first_name: string, last_name : string, email : string, adminKey: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/register-admin`;
    const params = new HttpParams().set('adminKey', adminKey);
    return this.http.post(url, { username, password, first_name, last_name, email }, { params, responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(this.handleError)
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.loggedInUsername.next('');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
 /* setUsername(username: string): void {
    localStorage.setItem('username', username);
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }*/

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







