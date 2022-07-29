import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Ingredient } from '../ingredient/ingredient';
import { IngredientService } from '../ingredient/ingredient.service';
import { MealIngredient } from '../meal-ingredient/meal-ingredient';
import { MealIngredientService } from '../meal-ingredient/meal-ingredient.service';
import { Meal } from '../meal/meal';
import { MealService } from '../meal/meal.service';

// TODO: Show aggregated shopping list. (use modal? https://getbootstrap.com/docs/5.1/components/modal/)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  @Input() showShoppingList: Boolean = false
  mealRandomizerForm: FormGroup = new FormGroup({});
  randomizedMeals$: Observable<Meal[]> = new Observable
  mealIngredients$: Observable<MealIngredient[]> = new Observable
  ingredients$: Observable<Ingredient[]> = new Observable

  constructor(
    private mealService: MealService,
    private mealIngredientService: MealIngredientService,
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) { }

  get count() { return this.mealRandomizerForm.get('count')!.value; }
  get meatless() { return this.mealRandomizerForm.get('meatless')?.value; }
  get chicken() { return this.mealRandomizerForm.get('chicken')?.value; }
  get turkey() { return this.mealRandomizerForm.get('turkey')?.value; }
  get other() { return this.mealRandomizerForm.get('other')?.value }
   
  ngOnInit(): void {
    this.mealRandomizerForm = this.fb.group({
      count: [],
      meatless: [],
      chicken: [],
      turkey: [],
      other: []
    })
  }

  randomizeMeals() {
    const count : number = this.count;
    const isMeatless: Boolean = this.meatless;
    const isChicken: Boolean = this.chicken;
    const isTurkey: Boolean = this.turkey;
    const isOther: Boolean = this.other;

    this.randomizedMeals$ = this.mealService.getMeals()
      .pipe(map(meals => meals.sort(
        () => 0.5 - Math.random()
      ).filter(meal => {
        switch(meal.type?.toLowerCase()){
          case("meatless"): return isMeatless;
          case("chicken"): return isChicken;
          case("turkey"): return isTurkey;
          case("other"): return isOther
        } 
        return true;
      }
      ).slice(0,count)))
      this.fetchShoppingList();
      this.fetchIngredients();
      this.showShoppingList = true
  }

  fetchShoppingList() {
    this.mealIngredients$ = this.mealIngredientService.getMealIngredients();     
  }
    
  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }
}
