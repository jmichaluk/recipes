import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meal-list.component.html'
})
export class MealListComponent implements OnInit {

  meals$: Observable<Meal[]> = new Observable();
  
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.fetchMeals();
  }

  deleteMeal(id: string): void {
    this.mealService.deleteMeal(id).subscribe({
      next: () => this.fetchMeals()
    });
  }

  private fetchMeals(): void {
    this.meals$ = this.mealService.getMeals();
  }
}
