import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IngredientService } from '../ingredient.service';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css']
})
export class IngredientSearchComponent implements OnInit {
  searchedIngredients$!: Observable<Ingredient[]>;

  private searchTerms = new Subject<string>();

  constructor(private ingredientService: IngredientService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

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
  }
}

