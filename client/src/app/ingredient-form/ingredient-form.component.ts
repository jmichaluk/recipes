import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styles: [
   `.ingredient-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class IngredientFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Ingredient> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Ingredient>();
 
 @Output()
 formSubmitted = new EventEmitter<Ingredient>();
 
 ingredientForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.ingredientForm.get('name')!; }
 get level() { return this.ingredientForm.get('type')!; }
 
 ngOnInit() {
   this.initialState.subscribe(ingredient => {
     this.ingredientForm = this.fb.group({
       name: [ ingredient.name, [Validators.required] ],
     });
   });
 
   this.ingredientForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.ingredientForm.value);
 }
}
