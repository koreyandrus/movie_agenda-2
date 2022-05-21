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

  // searchMovies(searchTerm: string): Observable<Movie[]> {
  //   return this.http
  //     .get<Movie[]>(
  //       `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchTerm}`
  //     )
  //     .pipe(retry(2), catchError(this.handleError));
  // }

  // getVideoId(movieId: number) {
  //   return this.http.get(
  //     `${this.baseUrl}movie/${movieId}/videos?api_key=${this.apiKey}&language=${this.language}`
  //   );
  // }

  // getPopularMovies(): Observable<Movie[]> {
  //   return this.http
  //     .get<Movie[]>(`${this.baseUrl}movie/popular?api_key=${this.apiKey}`)
  //     .pipe(retry(2), catchError(this.handleError));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occured!';

  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(() => new Error(errorMessage));
  //   }

  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already!';
  //       break;
  //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //       errorMessage =
  //         'Too many sign in attempts. Please wait a little while and try again!';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Incorrect email or password!';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Incorrect email or password!';
  //       break;
  //   }
  //   return throwError(() => new Error(errorMessage));
  // }

  searchMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchTerm}`
    );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}movie/${id}?api_key=${this.apiKey}`
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
