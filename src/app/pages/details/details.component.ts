import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { MealDetail } from '../../models/mealdetail.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsPage implements OnInit {
  meal: MealDetail | null = null;
  ingredients: string[] = [];
  isModalOpen: boolean = false;

  constructor(private route: ActivatedRoute, private mealService: MealService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealDetails(id).subscribe((response) => {
        this.meal = response.meals ? response.meals[0] : null;
        this.getIngredients()
      });
    }
  }

  getIngredients() {
    if (this.meal) {
      for (let i = 1; i <= 20; i++) {
        const ingredient = this.meal[`strIngredient${i}` as keyof MealDetail];
        const measure = this.meal[`strMeasure${i}` as keyof MealDetail];
        console.log(ingredient)
        console.log(measure)
        if (ingredient && ingredient.trim() !== '') {
          this.ingredients.push(`${ingredient} - ${measure}`);
        }
      }
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: any) {
    this.isModalOpen = false;
  }
}
