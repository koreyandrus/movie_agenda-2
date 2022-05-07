import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  url: string;
  apiKey: string;
  region: string;
  language: string;

  constructor(private http: HttpClient) {
    this.url = 'https://api.themoviedb.org/3/';
    this.apiKey = '31b8073c5e7605cb23df4674c1ae905d';
    this.region = 'US';
    this.language = 'en-US';
  }

  searchMovies(searchTerm: string): Observable<any> {
    return this.http.get(
      `${this.url}search/movie?api_key=${this.apiKey}&query=${searchTerm}`
    );
  }
}
