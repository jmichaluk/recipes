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
   private mealService: MealService
 ) { }
 
 addMeal(meal: Meal) {
   this.mealService.createMeal(meal)
     .subscribe({
       next: () => {
         this.router.navigate(['/meals']);
       },
       error: (error) => {
         alert("Failed to create meal");
         console.error(error);
       }
     });
 }
}