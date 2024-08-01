import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private readonly STORAGE_KEY = 'search_history';

  constructor() {}

  getSearchHistory(): string[] {
    const history = localStorage.getItem(this.STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  }

  addSearchTerm(term: string): void {
    const history = this.getSearchHistory();
    if (!history.includes(term)) {
      history.push(term);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
  }

  clearSearchHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}