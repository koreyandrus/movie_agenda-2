import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
