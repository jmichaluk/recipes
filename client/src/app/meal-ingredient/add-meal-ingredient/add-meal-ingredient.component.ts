import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MealService } from 'src/app/meal/meal.service';
import { Meal } from 'src/app/meal/meal';
import { MealIngredient } from '../meal-ingredient';
import { MealIngredientService } from '../meal-ingredient.service';

@Component({
  selector: 'app-add-meal-ingredient',
  templateUrl: './add-meal-ingredient.component.html',
  styles: [
  ]
})
export class AddMealIngredientComponent implements OnInit {

  mealId: string | undefined;

  constructor(   
    private router: Router,
    private route: ActivatedRoute,
    private mealIngredientService: MealIngredientService,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') ?? "";

    if (id.length > 0) {
      this.mealId = id
    } else {
      alert('No mealId provided');
    }
  }

  addMealIngredient(mealIngredient: MealIngredient) {
    mealIngredient.mealId = this.mealId
    this.mealIngredientService.createMealIngredient(mealIngredient)
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          alert("Failed to link meal and ingredient");
          console.error(error);
        }
      });
  }

}
