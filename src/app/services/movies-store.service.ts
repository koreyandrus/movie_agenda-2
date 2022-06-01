import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesStoreService {
  private readonly _movies = new BehaviorSubject<Movie[]>([]);

  readonly movies$ = this._movies.asObservable();

  getMovies(): Movie[] {
    return this._movies.getValue();
  }

  private _setMovies(movies: Movie[]) {
    this._movies.next(movies);
  }

  addMovie(movie: Movie) {
    const movies = [...this.getMovies(), movie];
    this._setMovies(movies);
  }

  removeMovie(movie: Movie) {
    const movies = this.getMovies().filter((mov) => mov.id !== movie.id);
  }

  toggleWatched(movie: Movie): void {
    const movies = this.getMovies().map((mov) =>
      mov.id === movie.id ? { ...mov, isWathed: true } : mov
    );
    this._setMovies(movies);
  }

  // get watched movies
  readonly watchedMovies$ = this.movies$.pipe(
    map((movies) => movies.filter((movie) => movie.isWatched))
  );
}
