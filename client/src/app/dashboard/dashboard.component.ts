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

  // TODO: Add shopping list

  constructor(
    private mealService: MealService,
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

    console.log("Randomize Meals" + count + " : " + isMeatless + isChicken + isTurkey + isOther);

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
  }
}
