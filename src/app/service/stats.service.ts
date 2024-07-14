import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authService';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { Stats } from '../models/statistics';
import { ResultsByCategory } from '../models/resultsByCategory';
import {ErrorService} from "./errorService";
import {SharedService} from "./sharedService";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private sharedService: SharedService) {

  }

  logResults(newResult : any, username : String ) : Observable<{ id : number}>{
  const headers = this.sharedService.getAuthHeaders();
  const url = `${this.apiServerUrl}/stats/log/${username}`;
  return this.http.post<any>(url, newResult, { headers }).pipe(
    catchError(error => this.errorService.handleError(error, 'stats'))
  );
}

getStatsById(userId : number) : Observable<Stats>{
  const headers = this.sharedService.getAuthHeaders();
  const url = `${this.apiServerUrl}/stats/${userId}`;
  return this.http.get<Stats>(url, { headers }).pipe(
    catchError(error => this.errorService.handleError(error, 'stats'))
  );

}


public getResultsCategories(userId : number): Observable<ResultsByCategory[]>{
  const headers = this.sharedService.getAuthHeaders();
  return this.http.get<ResultsByCategory []>(`${this.apiServerUrl}/stats/bycategory/${userId}`, { headers}).pipe(
    catchError(error => this.errorService.handleError(error, 'stats'))
  );

  }




  }




