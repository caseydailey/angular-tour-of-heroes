import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}



  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {

    // the route.snapshot is a static image of the route informations shortly after the component was created
    // the paramMap is a dictionary of route paramete values extracted from the URL
    // the 'id' key returns the id of the hero to fetch
    // route params are always strings. the '+' operator converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
