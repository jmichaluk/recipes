import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, tap, catchError, map } from 'rxjs';

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

    return this.httpClient.get<Meal[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ? 
        console.log(`found "${x.length}" recipes matching "${term}"`) :
        console.log(`no recipes matching "${term}"`)),
        catchError(this.handleError<Meal[]>('searchMeals', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
