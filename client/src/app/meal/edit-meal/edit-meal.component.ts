import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
 
@Component({
 selector: 'app-edit-meal.component.ts',
 templateUrl: './edit-meal.component.html'
})
export class EditMealComponent implements OnInit {
 meal: BehaviorSubject<Meal> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private mealService: MealService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.mealService.getMeal(id !).subscribe((meal) => {
     this.meal.next(meal);
   });
 }
 
 editMeal(meal: Meal) {
   this.mealService.updateMeal(this.meal.value._id || '', meal)
     .subscribe({
       next: () => {
         this.router.navigate(['/meals']);
       },
       error: (error) => {
         alert('Failed to update meal');
         console.error(error);
       }
     })
 }
}