import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMealComponent } from './add-meal/add-meal.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    MealListComponent,
    MealFormComponent,
    AddMealComponent,
    EditMealComponent
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
