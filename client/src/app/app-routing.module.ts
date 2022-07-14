import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Meals
import { MealListComponent } from './meal-list/meal-list.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

// Ingredients
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';

const routes: Routes = [
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
  { path: 'meals', component: MealListComponent },
  { path: 'meals/new', component: AddMealComponent },
  { path: 'meals/edit/:id', component: EditMealComponent },
  { path: 'meals/detail/:id', component: MealDetailComponent },
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredients/new', component: AddIngredientComponent},
  { path: 'ingredients/edit/:id', component: EditIngredientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
