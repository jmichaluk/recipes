import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Meal } from '../meal/meal';
import { MealService } from '../meal/meal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
  
})
export class DashboardComponent implements OnInit {

  mealRandomizerForm: FormGroup = new FormGroup({});
  randomizedMeals$: Observable<Meal[]> = new Observable

  // TODO: Add additional filters to randomizations (meal type)
  // TODO: Add shopping list

  constructor(
    private mealService: MealService,
    private fb: FormBuilder
    ) { }

    get count() { return this.mealRandomizerForm.get('count')!.value; }
   
  ngOnInit(): void {
    this.mealRandomizerForm = this.fb.group({
      count: []
    })
  }

  randomizeMeals() {
    const count = this.count;

    console.log("Randomize Meals" + count);

    this.randomizedMeals$ = this.mealService.getMeals()
      .pipe(map(meals => meals.sort(
        () => 0.5 - Math.random()
      ).slice(0,count)))
  }
}
