import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../meal';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styles: [
   `.meal-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class MealFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Meal> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Meal>();
 
 @Output()
 formSubmitted = new EventEmitter<Meal>();
 
 mealForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.mealForm.get('name')!; }
 get type() { return this.mealForm.get('type')!; }
 get rating() { return this.mealForm.get('rating'); }
 
 ngOnInit() {
   this.initialState.subscribe(meal => {
     this.mealForm = this.fb.group({
       name: [ meal.name, [Validators.required] ],
       type: [ meal.type, [Validators.required] ],
       rating: [ meal.rating ]
     });
   });
 
   this.mealForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.mealForm.value);
 }
}
