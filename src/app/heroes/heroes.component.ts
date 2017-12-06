import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;

  
  // handler for the click event on each hero's <li> element
  // takes the hero object on click and 
  // sets the value of the instance variable selectedHero
  // the passed hero object. returns nothing
  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;

  }

  constructor() { }

  ngOnInit() {

  }

}
