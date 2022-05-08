import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../shared/Constants';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  apiKey: string;
  baseUrl: string;
  region: string;
  language: string;

  constructor(private http: HttpClient) {
    this.apiKey = Constants.API_KEY;
    this.baseUrl = Constants.BASE_URL;
    this.region = Constants.REGION;
    this.language = Constants.LANGUAGE;
  }

  searchActor(searchTerm: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}search/person?api_key=${this.apiKey}&query=${searchTerm}`
    );
  }
}
