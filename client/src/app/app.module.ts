import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackPipe } from './callback.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';

// Meals
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealFormComponent } from './meal/meal-form/meal-form.component';
import { AddMealComponent } from './meal/add-meal/add-meal.component';
import { EditMealComponent } from './meal/edit-meal/edit-meal.component';
import { MealSearchComponent } from './meal/meal-search/meal-search.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';

// Ingredients
import { IngredientListComponent } from './ingredient/ingredient-list/ingredient-list.component';
import { AddIngredientComponent } from './ingredient/add-ingredient/add-ingredient.component';
import { IngredientFormComponent } from './ingredient/ingredient-form/ingredient-form.component';
import { EditIngredientComponent } from './ingredient/edit-ingredient/edit-ingredient.component';

// MealIngredients
import { AddMealIngredientComponent } from './meal-ingredient/add-meal-ingredient/add-meal-ingredient.component';
import { MealIngredientFormComponent } from './meal-ingredient/meal-ingredient-form/meal-ingredient-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MealListComponent,
    MealFormComponent,
    AddMealComponent,
    EditMealComponent,
    MealSearchComponent,
    MealDetailComponent,
    IngredientListComponent,
    AddIngredientComponent,
    IngredientFormComponent,
    EditIngredientComponent,
    DashboardComponent,
    AddMealIngredientComponent,
    MealIngredientFormComponent,
    CallbackPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
