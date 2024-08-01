import { TestBed } from '@angular/core/testing';
import { SearchHistoryService } from './search-history.service';

describe('SearchHistoryService', () => {
  let service: SearchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHistoryService);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if there is no search history', () => {
    expect(service.getSearchHistory()).toEqual([]);
  });

  it('should return search history from localStorage', () => {
    const searchHistory = ['test1', 'test2'];
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
    expect(service.getSearchHistory()).toEqual(searchHistory);
  });

  it('should add a new search term to the history', () => {
    service.addSearchTerm('test');
    expect(service.getSearchHistory()).toEqual(['test']);
  });

  it('should not add a duplicate search term to the history', () => {
    service.addSearchTerm('test');
    service.addSearchTerm('test');
    expect(service.getSearchHistory()).toEqual(['test']);
  });

  it('should clear the search history', () => {
    service.addSearchTerm('test');
    service.clearSearchHistory();
    expect(service.getSearchHistory()).toEqual([]);
  });
});