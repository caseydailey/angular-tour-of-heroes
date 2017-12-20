import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  // declaring heroes as an an observable
  heroes$: Observable<Hero[]>;

  // declaring searchTerms as an rxjs 'Subject'
  // a subject is both a source of observable values and an Observable itself.
  // you can subscribe to a Subject as you would any Observable
  private searchTerms = new Subject<string>();

  
  // you can push values into an rxjs Subject by calling its next(value)
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  constructor(private heroService: HeroService) {}
  
  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      // ensures that a request is sent only if the filter text changed
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // calls the searcgh service for each search term that makes it through debounce and distinctUntilChanged
      // it cancels and discards previous search observables, returnin only the latest search service observable
      switchMap((term: string) => this.heroService.searchHeroes(term)),

    );

  }

}
