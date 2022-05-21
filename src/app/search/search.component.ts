import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { response } from 'express';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import {} from 'rxjs';

import { Actor } from '../models/actor.model';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tv-show.model';
import { ActorService } from '../services/actor.service';
import { MoviesService } from '../services/movies.service';
import { TvShowService } from '../services/tv-show.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  types = ['Movie', 'TV Show', 'Actor'];
  selectedType: string = 'movie';
  isShowVideo: boolean = false;
  videoCode: string;

  // searchForm = new FormGroup({
  searchField: FormControl;
  optionField: FormControl = new FormControl('Movie');
  // });

  loading: boolean = false;

  movieResults: Movie[];
  popularMovies: Movie[];
  tvResults: TvShow[];
  actorResults: Observable<Actor[]>;

  constructor(
    private movieService: MoviesService,
    private tvService: TvShowService,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.searchField = new FormControl();

    this.getWhatsPopular();
  }

  showVideo(videoCode) {
    this.videoCode = videoCode;

    this.isShowVideo = true;
  }

  closeVideo() {
    this.isShowVideo = false;
  }

  doSearch() {
    if (this.searchField.value === null) {
      return;
    }
    if (this.optionField.value === 'Movie') {
      this.movieResults = [];
      this.tvResults = [];

      this.loading = true;
      this.movieService
        .searchMovies(this.searchField.value)
        .subscribe((response) => {
          response['results'].forEach((movie) => {
            if (
              movie.backdrop_path !== null &&
              movie.poster_path !== null &&
              movie.overview !== ''
            ) {
              this.movieResults.push(movie);
            }
          });
          this.loading = false;
        });
    } else if (this.optionField.value === 'TV Show') {
      this.movieResults = [];
      this.tvResults = [];

      this.loading = true;
      this.tvService.searchtv(this.searchField.value).subscribe((response) => {
        response['results'].forEach((show) => {
          if (
            show.backdrop_path !== null &&
            show.poster_path !== null &&
            show.overview !== ''
          ) {
            this.tvResults.push(show);
          }
        });
        this.loading = false;
      });
    } else if (this.optionField.value === 'Actor') {
      this.actorService.searchActor(this.searchField.value).subscribe((res) => {
        this.actorResults = res.results;
      });
    }
  }

  // getVideoCode(id): void {
  //   this.movieService.getMovieVideos(id).subscribe((res) => {
  //     this.videoCode = res.results[0].key;
  //   });
  // }

  getWhatsPopular() {
    this.loading = true;
    this.popularMovies = [];
    this.movieService.getPopularMovies().subscribe((response) => {
      this.popularMovies = response['results'];
    });
    this.loading = false;
  }
}
