import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealService } from './meal.service';
import { CategoryResponse } from '../models/category.model';

describe('MealService', () => {
  let service: MealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealService],
    });
    service = TestBed.inject(MealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve categories from API', (done) => {
    const mockCategories: CategoryResponse = {
      categories: [
        { idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' },
        { idCategory: '2', strCategory: 'Chicken', strCategoryThumb: '', strCategoryDescription: '' }
      ]
    };

    service.getCategories().subscribe(categories => {
      expect(categories.categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
      done();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/categories.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
