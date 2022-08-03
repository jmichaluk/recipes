import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, filter, Observable, map } from 'rxjs';
import { Ingredient } from '../../ingredient/ingredient';
import { MealIngredient } from '../meal-ingredient';
import { MealIngredientService } from '../meal-ingredient.service';
import { IngredientService } from '../../ingredient/ingredient.service';

@Component({
  selector: 'app-meal-ingredient-form',
  templateUrl: './meal-ingredient-form.component.html',
  styles: [
   `.ingredient-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class MealIngredientFormComponent implements OnInit {
 @Input()
 initialState: string | undefined
 
 @Output()
 formValuesChanged = new EventEmitter<MealIngredient>();
 
 @Output()
 formSubmitted = new EventEmitter<MealIngredient>();
 
  mealIngredientForm: FormGroup = new FormGroup({});
  mealIngredients$: Observable<MealIngredient[]> = new Observable();
  ingredients$: Observable<Ingredient[]> = new Observable();
  mealId!: string;
  
  constructor(
    private fb: FormBuilder, 
    private mealIngredientService: MealIngredientService,
    private ingredientService: IngredientService
  ) {}
  
  get ingredientId() { return this.mealIngredientForm.get('ingredientId')!; }
  get measurement() { return this.mealIngredientForm.get('measurement'); }
  get quantity() { return this.mealIngredientForm.get('quantity'); }
  
  ngOnInit() {
    this.fetchIngredients();
    this.fetchMealIngredients();
    this.mealId = this.initialState ?? ""

    this.mealIngredientForm = this.fb.group({
      mealId: [ [Validators.required] ],
      ingredientId: [ [Validators.required] ],
      quantity: [  ],
      measurement: [ ]
    });
  
    this.mealIngredientForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  deleteMealIngredient(id: string) {
    this.mealIngredientService.deleteMealIngredient(id).subscribe({
      next: () => this.fetchMealIngredients()
    });
  }

  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }

  private fetchMealIngredients(): void {
    this.mealIngredients$ = this.mealIngredientService.getMealIngredients()
      .pipe(map(mealIngredients => 
        mealIngredients.filter(mealIngredient => 
          mealIngredient.mealId === this.mealId))
      );
  }
 
  submitForm() {
    this.formSubmitted.emit(this.mealIngredientForm.value);
  }
}
