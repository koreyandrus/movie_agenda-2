import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

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
    return this.http.get<Movie[]>(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchTerm}`
    );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}movie/${id}?api_key=${this.apiKey}&append_to_response=release_dates`
    );
  }

  getMovieRating(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}movie/${id}/release_dates?api_key=${this.apiKey}`
    );
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`
    );
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.baseUrl}movie/popular?api_key=${this.apiKey}`
    );
  }
}
