import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<TvShow[]>(
      `${this.baseUrl}search/tv?api_key=${this.apiKey}&query=${searchTerm}`
    );
  }
}
