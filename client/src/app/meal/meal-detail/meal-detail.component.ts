import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { MealIngredientService } from 'src/app/meal-ingredient/meal-ingredient.service';
import { MealIngredient } from 'src/app/meal-ingredient/meal-ingredient';
import { Observable,map, count } from 'rxjs';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html'
})

export class MealDetailComponent implements OnInit {

  @Input() meal?: Meal;
  @Input() mealIngredients$: Observable<MealIngredient[]> = new Observable

  mealId: string = ""

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private mealIngredientService: MealIngredientService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.mealId = String(this.route.snapshot.paramMap.get('id')) ?? "";
    this.getMeal();
    this.fetchMealIngredients();
  }

  getMeal(): void {
    this.mealService.getMeal(this.mealId)
      .subscribe(meal => this.meal = meal);

      console.log(`Fetched Meal: ${this.meal?.name} for id : ${this.mealId}`)
  }

  private fetchMealIngredients(): void {
    this.mealIngredients$ = this.mealIngredientService.getMealIngredients().pipe(map(mealIngredients => 
      mealIngredients.filter(mealIngredient => 
        mealIngredient.mealId === this.mealId
      )
    ));
    console.log("Fetched Meal Ingredients");
  }

  goBack(): void {
    this.location.back();
  }
}
