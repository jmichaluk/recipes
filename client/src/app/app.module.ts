import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Meals
import { MealListComponent } from './meal-list/meal-list.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { MealSearchComponent } from './meal-search/meal-search.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

// Ingredients
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';

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
    EditIngredientComponent
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
