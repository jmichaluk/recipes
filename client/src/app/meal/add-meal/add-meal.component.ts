import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
 
@Component({
 selector: 'app-add-meal',
 templateUrl: './add-meal.component.html'
})
export class AddMealComponent {
 constructor(
   private router: Router,
   private mealService: MealService ) { }

 
  addMeal(meal: Meal) {
    this.mealService.createMeal(meal)
      .subscribe({
        next: mealId => {
          this.router.navigate([`/meals/addingredient/${mealId.replace(`"`, "").replace(`"`,"")}`]);
        },
        error: (error) => {
          alert("Failed to create meal");
          console.error(error);
        }
      });
  }
}