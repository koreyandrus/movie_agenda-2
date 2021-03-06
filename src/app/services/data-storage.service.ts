import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { exhaustMap, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  movie: Movie;
  movies: Movie[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSavedMovies(): Observable<Movie[]> {
    return this.http
      .get(
        `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/movies.json`
      )
      .pipe(
        map((resData) => {
          const movieArray: Movie[] = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              movieArray.push({ ...resData[key], db_id: key });
            }
          }
          return movieArray;
        })
      );
  }

  saveMovie(movieData: Movie) {
    this.http
      .post(
        `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/movies.json`,
        movieData
      )
      .subscribe(() => {
        alert(`Added ${movieData.title} to your agenda!`);
      });
  }

  deleteMovie(movieData: Movie) {
    return this.http.delete(
      `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/movies/${movieData.db_id}.json`
    );
  }

  getSavedShows(): Observable<TvShow[]> {
    return this.http
      .get(
        `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/shows.json`
      )
      .pipe(
        map((resData) => {
          const showArray: TvShow[] = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              showArray.push({ ...resData[key], db_id: key });
            }
          }
          return showArray;
        })
      );
  }

  saveShow(showData: TvShow) {
    this.http
      .post(
        `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/shows.json`,
        showData
      )
      .subscribe(() => {
        alert(`Added ${showData.name} to your agenda!`);
      });
  }

  deleteShow(showData: TvShow) {
    return this.http.delete(
      `https://movie-agenda-default-rtdb.firebaseio.com/users/${this.authService.user.value.id}/shows/${showData.db_id}.json`
    );
  }
}
