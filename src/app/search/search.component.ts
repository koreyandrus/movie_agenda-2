import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  types = ['Movie', 'TV Show', 'Actor'];
  searchForm: FormGroup;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {}

  onSubmit(form) {
    // this.movieService.searchMovies('jack reacher').subscribe((res) => {
    //   console.log(res);
    // });
    console.log(form.value);
  }
}
