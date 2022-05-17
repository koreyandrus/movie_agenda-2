import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  movie: Movie;
  movies: Movie[];

  constructor(private http: HttpClient) {}

  getSavedMovies(): any {
    return this.http
      .get('https://movie-agenda-default-rtdb.firebaseio.com/movies.json')
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
}
