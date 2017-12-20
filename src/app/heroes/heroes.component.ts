import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  
  // adding this parameter to the constructor defines a private heroService property
  // and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService) {}
  
  // when this component is initialized
  // get the heroes
  ngOnInit() {
    this.getHeroes();
  }
  
  // wait for the observable to emit the array of heroes
  // then subscribe pass the emitted array to the callback
  // which sets the component's heroes property
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }
  
  delete(hero: Hero): void {

    // though actual removal of the hero from the data is delegated to the heroService,
    // the component is still responsible for removing the hero from it's own list 
    // we do so here, assuming the delete will work.
    this.heroes = this.heroes.filter(h => h !== hero);

    // we don't need to do anything with the Observable returned by deleteHero()
    // but we must subscribe anyway. if you do not, the delete will not send
    // an Observable does nothing unril something subscribes
    this.heroService.deleteHero(hero).subscribe();
  }

}
