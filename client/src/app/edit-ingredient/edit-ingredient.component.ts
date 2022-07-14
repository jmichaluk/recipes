import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';
 
@Component({
 selector: 'app-edit-ingredient.component.ts',
 templateUrl: './edit-ingredient.component.html'
})
export class EditIngredientComponent implements OnInit {
 ingredient: BehaviorSubject<Ingredient> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private ingredientService: IngredientService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.ingredientService.getIngredient(id !).subscribe((ingredient) => {
     this.ingredient.next(ingredient);
   });
 }
 
 editIngredient(ingredient: Ingredient) {
   this.ingredientService.updateIngredient(this.ingredient.value._id || '', ingredient)
     .subscribe({
       next: () => {
         this.router.navigate(['/ingredients']);
       },
       error: (error) => {
         alert('Failed to update ingredient');
         console.error(error);
       }
     })
 }
}