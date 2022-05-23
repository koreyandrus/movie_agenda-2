import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
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
              movieArray.push(resData[key]);
            }
          }
          return movieArray;
        })
      );
  }

  // movieAlreadySaved(movieId): boolean {
  //   return this.movies.find
  // }

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
              showArray.push(resData[key]);
            }
          }
          return showArray;
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
}
