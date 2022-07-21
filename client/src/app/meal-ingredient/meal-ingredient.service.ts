import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, tap, catchError, map } from 'rxjs';

import { MealIngredient } from './meal-ingredient';

@Injectable({
  providedIn: 'root'
})
export class MealIngredientService {
  private url = 'http://localhost:5200/mealIngredients';
  private mealIngredients$: Subject<MealIngredient[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshMealIngredients() {
    this.httpClient.get<MealIngredient[]>(`${this.url}`)
      .subscribe(mealIngredients => {
        this.mealIngredients$.next(mealIngredients);
      });
  }

  getMealIngredients(): Subject<MealIngredient[]> {
    this.refreshMealIngredients();
    return this.mealIngredients$;
  }

  // getMealIngredientsByMeal(mealId: string): Observable<MealIngredient[]> {
  //   return this.httpClient.get<MealIngredient[]>(`${this.url}/${mealId}`)
  // }

  // getMealIngredientsByIngredient(ingredientId: string): Observable<MealIngredient> {
  //   return this.httpClient.get<MealIngredient>(`${this.url}/${ingredientId}`)
  // }

  getMealIngredient(id: string): Observable<MealIngredient> {
    return this.httpClient.get<MealIngredient>(`${this.url}/${id}`);
  }

  createMealIngredient(mealIngredient: MealIngredient): Observable<string> {
    return this.httpClient.post(`${this.url}`, mealIngredient, {responseType: 'text'});
  }

  updateMealIngredient(id: string, mealIngredient: MealIngredient): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, mealIngredient, {responseType: 'text' });
  }

  deleteMealIngredient(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, {responseType: 'text'});
  }
}
