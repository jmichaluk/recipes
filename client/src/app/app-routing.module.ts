import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealListComponent } from './meal-list/meal-list.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
  { path: 'meals', component: MealListComponent },
  { path: 'meals/new', component: AddMealComponent },
  { path: 'meals/edit/:id', component: EditMealComponent },
  { path: 'meals/detail/:id', component: MealDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
