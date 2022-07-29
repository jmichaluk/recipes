import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit {

  ingredients$: Observable<Ingredient[]> = new Observable();
  searchedIngredients$!: Observable<Ingredient[]>;
  @Input() showAll: Boolean = true;

  private searchTerms = new Subject<string>();
  
  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {

    this.searchedIngredients$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),      

      // switch to new search observable each time the term changes
      switchMap((term: string) => 
        this.ingredientService.getIngredients().pipe(map(ingredients =>
          ingredients.filter(ingredient =>
            ingredient.name?.toLowerCase().includes(term.toLowerCase())
          )
        )
      ))
    );
    
    this.fetchIngredients();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.showAll = false;
    this.searchTerms.next(term);
  }

  deleteIngredient(id: string): void {
    // TODO: Delete mealIngredients for this ingredient.
    // TODO: Alert for meals that will be losing the ingredient.
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => this.fetchIngredients()
    });
  }

  private fetchIngredients(): void {
    this.ingredients$ = this.ingredientService.getIngredients();
  }
}
