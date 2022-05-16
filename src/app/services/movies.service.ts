import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from '../models/movie.model';
import { Constants } from '../shared/Constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiKey: string;
  baseUrl: string;
  region: string;
  language: string;

  constructor(private http: HttpClient) {
    this.baseUrl = Constants.BASE_URL;
    this.apiKey = Constants.API_KEY;
    this.region = Constants.REGION;
    this.language = Constants.LANGUAGE;
  }

  searchMovies(searchTerm: string): Observable<Movie[]> {
    return this.http
      .get(
        `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchTerm}`
      )
      .pipe(
        map((res) => {
          return res['results'].map((item) => {
            return new Movie(
              item.poster_path,
              item.adult,
              item.overview,
              item.release_date,
              item.genre_ids,
              item.id,
              item.original_title,
              item.original_language,
              item.title,
              item.backdrop_path,
              item.popularity,
              item.vote_count,
              item.video,
              item.vote_average
            );
          });
        })
      );
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http
      .get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}`)
      .pipe(
        map((res) => {
          return res['results'].map((item) => {
            return new Movie(
              item.poster_path,
              item.adult,
              item.overview,
              item.release_date,
              item.genre_ids,
              item.id,
              item.original_title,
              item.original_language,
              item.title,
              item.backdrop_path,
              item.popularity,
              item.vote_count,
              item.video,
              item.vote_average
            );
          });
        })
      );
  }
}
