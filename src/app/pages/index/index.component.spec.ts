import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { IndexPage } from './index.component';
import { MealService } from '../../services/meal.service';
import { SearchHistoryService } from '../../services/search-history.service';
import { ActivatedRoute } from '@angular/router';

describe('IndexPage', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;
  let mealService: jasmine.SpyObj<MealService>;
  let searchHistoryService: jasmine.SpyObj<SearchHistoryService>;

  beforeEach(async () => {
    const mealServiceSpy = jasmine.createSpyObj('MealService', ['getCategories', 'getMealsByName', 'getMealsByCategory']);
    const searchHistoryServiceSpy = jasmine.createSpyObj('SearchHistoryService', ['addSearchTerm']);

    await TestBed.configureTestingModule({
      declarations: [IndexPage],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot()
      ],
      providers: [
        { provide: MealService, useValue: mealServiceSpy },
        { provide: SearchHistoryService, useValue: searchHistoryServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ search: 'test' })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
    mealService = TestBed.inject(MealService) as jasmine.SpyObj<MealService>;
    searchHistoryService = TestBed.inject(SearchHistoryService) as jasmine.SpyObj<SearchHistoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when searching meals by category', () => {
    const errorResponse = 'test error';
    mealService.getMealsByCategory.and.returnValue(throwError(() => errorResponse));
    component.selectedCategory = 'Beef';

    component.onCategoryChange();

    expect(mealService.getMealsByCategory).toHaveBeenCalledWith('Beef');
    expect(component.meals.length).toBe(0);
    expect(component.errorMessage).toEqual('test error');
  });
});
