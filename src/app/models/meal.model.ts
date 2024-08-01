export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealResponse {
  meals: Meal[] | null;
}