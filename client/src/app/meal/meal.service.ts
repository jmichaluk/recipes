import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, tap, catchError, map, filter } from 'rxjs';

import { Meal } from './meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private url = 'http://localhost:5200/meals';
  private meals$: Subject<Meal[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshMeals() {
    this.httpClient.get<Meal[]>(`${this.url}`)
      .subscribe(meals => {
        this.meals$.next(meals);
      });
  }

  getMeals(): Subject<Meal[]> {
    this.refreshMeals();
    return this.meals$;
  }

  getMeal(id: string): Observable<Meal> {
    return this.httpClient.get<Meal>(`${this.url}/${id}`);
  }

  createMeal(meal: Meal): Observable<string> {
    return this.httpClient.post(`${this.url}`, meal, {responseType: 'text'});
  }

  updateMeal(id: string, meal: Meal): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, meal, {responseType: 'text' });
  }

  deleteMeal(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  /* GET meals whose name contains search term */
  // TODO: FIX
  searchMeals(term: string): Observable<Meal[]> {
    if (!term.trim()) {
      // if not search term, return empty meal array.
      return of([]);
    }
    // this.meals$.pipe(filter(meals =>
    //   meals.forEach => )
    //   )
      return of([]);
  }
}
