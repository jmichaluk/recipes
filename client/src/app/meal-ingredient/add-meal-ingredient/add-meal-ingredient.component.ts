import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private mealIngredientService: MealIngredientService,
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
