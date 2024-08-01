import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryResponse } from '../models/category.model';
import { MealResponse } from '../models/meal.model';
import { MealDetailResponse } from '../models/mealdetail.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/categories.php`).pipe(
      catchError(this.handleError)
    );
  }

  getMealsByCategory(category: string): Observable<MealResponse> {
    return this.http.get<MealResponse>(`${this.apiUrl}/filter.php?c=${category}`).pipe(
      catchError(this.handleError)
    );
  }

  getMealsByName(name: string): Observable<MealResponse> {
    return this.http.get<MealResponse>(`${this.apiUrl}/search.php?s=${name}`).pipe(
      catchError(this.handleError)
    );
  }

  getMealDetails(id: string): Observable<MealDetailResponse> {
    return this.http.get<MealDetailResponse>(`${this.apiUrl}/lookup.php?i=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
