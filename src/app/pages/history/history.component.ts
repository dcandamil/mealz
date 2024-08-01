import { Component, OnInit } from '@angular/core';
import { SearchHistoryService } from '../../services/search-history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: []
})
export class HistoryPage implements OnInit {
  searchHistory: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private searchHistoryService: SearchHistoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSearchHistory();
  }

  loadSearchHistory() {
    try {
      this.searchHistory = this.searchHistoryService.getSearchHistory();
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage = 'Failed to load search history';
    }
  }

  search(term: string) {
    this.router.navigate(['/index'], { queryParams: { search: term } });
  }

  clearHistory() {
    this.searchHistoryService.clearSearchHistory();
    this.loadSearchHistory();
  }
}
