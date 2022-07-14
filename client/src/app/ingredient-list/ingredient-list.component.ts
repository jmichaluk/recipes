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
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => this.fetchIngredients()
    });
  }

  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }
}
