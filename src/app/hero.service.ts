import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeroService {

  getHeroes(): Observable<Hero[]> {

    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    
    //TODO: send message _after_ fetching the hero

    this.messageService.add(`HeroService: fetched hero id=${id}`);

    // like getHeroes(), getHero() has an asynchronous signature
    // it returns a mock hero as an Observable, using the RxJS of() function
    return of(HEROES.find(hero => hero.id === id));

  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

}
