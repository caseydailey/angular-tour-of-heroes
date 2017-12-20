import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}
    
  // a helper to log messages
  private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }
    
  // URL to web api
  private heroesUrl = 'api/heroes';
  
  // special header for save requests
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  
  // get heroes from the server
  getHeroes(): Observable<Hero[]> {

    // http.get returns an observable
    // extended with the pipe method
    // which we pass a 'tap' and 'catchError' operator
    return this.http.get<Hero[]>(this.heroesUrl)
               .pipe(
                 tap(heroes => this.log('fetched heroes')),
                 catchError(this.handleError('getHeroes', []))
               );
  }

  
  // similar to above, but accepts and id
  // and appends to heroesUrl
  getHero(id: number): Observable<Hero> {

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
                    .pipe(
                      tap(_ => this.log(`fetched hero id=${id}`)),
                      catchError(this.handleError<Hero>(`getHero id=${id}`))
                    );

  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
                    .pipe(
                      tap(_ => this.log(`updated hero id=${hero.id}`)),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
                    .pipe(
                      tap((hero: Hero) => this.log(`added hero w/id=${hero.id}`)),
                      catchError(this.handleError<Hero>('addHero'))
                    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {

    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
                    .pipe(
                      tap(_=> this.log(`deleted hero id=${id}`)),
                      catchError(this.handleError<Hero>('deleteHero'))
                    );

  }


  

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
