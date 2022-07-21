import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, tap, catchError, map } from 'rxjs';

import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private url = 'http://localhost:5200/ingredients';
  private ingredients$: Subject<Ingredient[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshIngredients() {
    this.httpClient.get<Ingredient[]>(`${this.url}`)
      .subscribe(ingredients => {
        this.ingredients$.next(ingredients);
      });
  }

  getIngredients(): Subject<Ingredient[]> {
    this.refreshIngredients();
    return this.ingredients$;
  }

  getIngredient(id: string): Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(`${this.url}/${id}`);
  }

  createIngredient(ingredient: Ingredient): Observable<string> {
    return this.httpClient.post(`${this.url}`, ingredient, {responseType: 'text'});
  }

  updateIngredient(id: string, ingredient: Ingredient): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, ingredient, {responseType: 'text' });
  }

  deleteIngredient(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  /* GET ingredients whose name contains search term */
  // TODO: FIX
  searchIngredients(term: string): Observable<Ingredient[]> {
    if (!term.trim()) {
      // if not search term, return empty ingredient array.
      return of([]);
    }

    return this.httpClient.get<Ingredient[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ? 
        console.log(`found "${x.length}" recipes matching "${term}"`) :
        console.log(`no recipes matching "${term}"`)),
        catchError(this.handleError<Ingredient[]>('searchIngredients', []))
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
