import { Component, OnInit } from '@angular/core';
import { FormGroup, NgModel } from '@angular/forms';
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

  movieResults: Movie[];
  tvResults: TvShow[];
  actorResults: Actor[];

  searchForm: FormGroup;

  constructor(
    private movieService: MoviesService,
    private tvService: TvShowService,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {}

  onSubmit(form) {
    if (form.value.searchType === 'movie') {
      this.movieService.searchMovies(form.value.searchTerm).subscribe((res) => {
        this.movieResults = res['results'];
        console.log(this.movieResults);
      });
    } else if (form.value.searchType === 'tv') {
      this.tvService.searchtv(form.value.searchTerm).subscribe((res) => {
        this.tvResults = res['results'];
        console.log(this.tvResults);
      });
    } else if (form.value.searchType === 'person') {
      this.actorService.searchActor(form.value.searchTerm).subscribe((res) => {
        this.actorResults = res.results;
        console.log(this.actorResults);
      });
    }
  }
}
