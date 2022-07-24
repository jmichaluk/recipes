import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit {

  ingredients$: Observable<Ingredient[]> = new Observable();
  
  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  deleteIngredient(id: string): void {
    // TODO: Delete mealIngredients for this ingredient.
    // TODO: Alert for meals that will be losing the ingredient.
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => this.fetchIngredients()
    });
  }

  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }
}
