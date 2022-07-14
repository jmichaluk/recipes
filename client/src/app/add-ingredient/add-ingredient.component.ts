import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';
 
@Component({
 selector: 'app-add-ingredient',
 templateUrl: './add-ingredient.component.html'
})
export class AddIngredientComponent {
 constructor(
   private router: Router,
   private ingredientService: IngredientService
 ) { }
 
 addIngredient(ingredient: Ingredient) {
   this.ingredientService.createIngredient(ingredient)
     .subscribe({
       next: () => {
         this.router.navigate(['/ingredients']);
       },
       error: (error) => {
         alert("Failed to create ingredient");
         console.error(error);
       }
     });
 }
}