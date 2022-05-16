import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Genres } from '../shared/genres';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;

  constructor() {}

  ngOnInit(): void {}

  getImagePath(img_path) {
    if (img_path) {
      return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + img_path;
    }
    return;
  }

  getGenre(id) {
    return Genres.genres.find((genre) => genre.id === id).name;
  }
}
