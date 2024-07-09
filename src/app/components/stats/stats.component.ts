import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stats } from '../../models/statistics';
import { StatsService } from '../../service/stats.service';
import { AuthService } from '../../service/authService';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  @Input() selectedUserId: any;
  @Input() selectedUsername : any;
  @Output() closeStats: EventEmitter<void> = new EventEmitter<void>();
  
  stats : Stats = {};
  loggedInUsername : String = "";
  
  

  constructor(private statsService: StatsService, private authService: AuthService) {}

  ngOnInit(): void {
       this.getStats(this.selectedUserId);
       this.getUsername;
    
  }

  getStats(userId : number): void {
  this.statsService.getStatsById(userId).subscribe(
      (content : Stats)  => {
        this.stats = content;
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

  onCloseStats() {
    this.closeStats.emit();}


  


}
