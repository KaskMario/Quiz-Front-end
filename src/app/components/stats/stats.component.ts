import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stats } from '../../models/statistics';
import { StatsService } from '../../service/stats.service';
import { AuthService } from '../../service/authService';
import { Observable, tap } from 'rxjs';
import { ResultsByCategory } from '../../models/resultsByCategory';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  @Input() selectedUserId: any;
  @Input() selectedUsername : any;
  @Output() closeStats: EventEmitter<void> = new EventEmitter<void>();
  
  stats : Stats = {};
  loggedInUsername : String = "";
  resultsByCategory : ResultsByCategory [] = [];
  isResults : boolean = false;
  statsNotEmpty : boolean = false;
  
  
  

  constructor(private statsService: StatsService, private authService: AuthService) {}

  ngOnInit(): void {
       this.getStats(this.selectedUserId);
       this.getResultsByCategory(this.selectedUserId);
       console.log(this.selectedUserId)
       
    
  }

  getStats(userId : number): void {
  this.statsService.getStatsById(userId).subscribe(
      (content : Stats)  => {
        this.stats = content;
        this.statsNotEmpty = this.isObjectNotEmpty(this.stats);
        console.log(this.stats, 'fetched');
      },
      (error) => {
        console.error('Error fetching object:', error);
      }
    );
      
  }

  getUsername() : Observable<string> {
    return this.authService.getLoggedInUsername().pipe(
      tap(value => {
          this.loggedInUsername = value;
      })
  );
  }

  isObjectNotEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length > 0;}

  onCloseStats() {
    this.closeStats.emit();}

    getResultsByCategory(userId : number): void {
      this.statsService.getResultsCategories(userId).subscribe(
        (resultsByCategory : ResultsByCategory[]) => {
          console.log('Results:', resultsByCategory);
          this.resultsByCategory = resultsByCategory;
          this.isResults = this.resultsByCategory.length > 0;
        })
        
        console.log(this.isResults);
      }


  


}
