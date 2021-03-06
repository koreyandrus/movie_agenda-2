import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { TvShow } from '../models/tv-show.model';
import { Constants } from '../shared/Constants';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
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

  searchtv(searchTerm: string): Observable<TvShow[]> {
    return this.http
      .get<TvShow[]>(
        `${this.baseUrl}search/tv?api_key=${this.apiKey}&query=${searchTerm}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getShowVideos(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}`
    );
  }

  getShowRating(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}tv/${id}/content_ratings?api_key=${this.apiKey}`
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'Too many sign in attempts. Please wait a little while and try again!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Incorrect email or password!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email or password!';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
