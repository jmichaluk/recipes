import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';
import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meal-list.component.html'
})
export class MealListComponent implements OnInit {

  meals$: Observable<Meal[]> = new Observable();
  searchedMeals$!: Observable<Meal[]>;
  @Input() showAll: Boolean = true;

  private searchTerms = new Subject<string>();
  
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.fetchMeals();

    this.searchedMeals$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),      

      // switch to new search observable each time the term changes
      switchMap((term: string) => 
        this.mealService.getMeals().pipe(map(meals =>
          meals.filter(meal =>
            meal.name?.toLowerCase().includes(term.toLowerCase())
          )
        )
      ))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.showAll = false;
    this.searchTerms.next(term);
  }

  deleteMeal(id: string): void {
    // TODO: Delete mealIngredients for meal.
    this.mealService.deleteMeal(id).subscribe({
      next: () => this.fetchMeals()
    });
  }

  private fetchMeals(): void {
    this.meals$ = this.mealService.getMeals();
  }
}
