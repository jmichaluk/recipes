import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { MealIngredientService } from 'src/app/meal-ingredient/meal-ingredient.service';
import { MealIngredient } from 'src/app/meal-ingredient/meal-ingredient';
import { Observable,map, count } from 'rxjs';
import { Ingredient } from 'src/app/ingredient/ingredient';
import { IngredientService } from 'src/app/ingredient/ingredient.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html'
})

export class MealDetailComponent implements OnInit {

  @Input() meal?: Meal;
  mealIngredients$: Observable<MealIngredient[]> = new Observable;
  ingredients$: Observable<Ingredient[]> = new Observable;

  mealId: string = ""

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private mealIngredientService: MealIngredientService,
    private ingredientService: IngredientService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.mealId = String(this.route.snapshot.paramMap.get('id')) ?? "";
    this.getMeal();
    this.fetchMealIngredients();
    this.fetchIngredients();
  }

  getMeal(): void {
    this.mealService.getMeal(this.mealId)
      .subscribe(meal => this.meal = meal);
  }

  private fetchMealIngredients(): void {
    this.mealIngredients$ = this.mealIngredientService.getMealIngredients()
      .pipe(map(mealIngredients => 
        mealIngredients.filter(mealIngredient => 
          mealIngredient.mealId === this.mealId
      )
    ));
  }

  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }

  goBack(): void {
    this.location.back();
  }

}
