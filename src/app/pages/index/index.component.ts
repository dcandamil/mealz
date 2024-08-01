import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Category } from '../../models/category.model';
import { Meal } from '../../models/meal.model';
import { SearchHistoryService } from '../../services/search-history.service';
import { Router, ActivatedRoute } from '@angular/router';

interface MealWithCategory extends Meal {
  category?: string | null;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexPage implements OnInit {
  categories: Category[] = [];
  meals: MealWithCategory[] = [];
  searchTerm: string = '';
  selectedCategory: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private mealService: MealService,
    private searchHistoryService: SearchHistoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.searchTerm = search;
        this.onSearchChange();
      }
    });
  }

  getCategories() {
    this.mealService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.categories;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  onSearchChange() {
    if (this.searchTerm) {
      this.mealService.getMealsByName(this.searchTerm).subscribe({
        next: (response) => {
          this.meals = response.meals || [];
          this.searchHistoryService.addSearchTerm(this.searchTerm);
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else {
      this.meals = [];
    }
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.mealService.getMealsByCategory(this.selectedCategory).subscribe({
        next: (response) => {
          this.meals = (response.meals || []).map(meal => ({ ...meal, category: this.selectedCategory }));
          this.searchTerm = '';
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else {
      this.meals = [];
    }
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }
}
