import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Meals
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { AddMealComponent } from './meal/add-meal/add-meal.component';
import { EditMealComponent } from './meal/edit-meal/edit-meal.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';

// Ingredients
import { IngredientListComponent } from './ingredient/ingredient-list/ingredient-list.component';
import { AddIngredientComponent } from './ingredient/add-ingredient/add-ingredient.component';
import { EditIngredientComponent } from './ingredient/edit-ingredient/edit-ingredient.component';

// MealIngredients
import { AddMealIngredientComponent } from './meal-ingredient/add-meal-ingredient/add-meal-ingredient.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'meals', component: MealListComponent },
  { path: 'meals/new', component: AddMealComponent },
  { path: 'meals/edit/:id', component: EditMealComponent },
  { path: 'meals/detail/:id', component: MealDetailComponent },
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'ingredients/new', component: AddIngredientComponent},
  { path: 'ingredients/edit/:id', component: EditIngredientComponent},
  { path: 'meals/addingredient/:id', component: AddMealIngredientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
