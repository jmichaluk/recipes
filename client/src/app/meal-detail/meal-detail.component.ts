import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html'
})


export class MealDetailComponent implements OnInit {

  @Input() meal?: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }

  goBack(): void {
    this.location.back();
  }

}
