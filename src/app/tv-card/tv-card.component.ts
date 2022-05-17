import { Component, Input, OnInit } from '@angular/core';
import { TvShow } from '../models/tv-show.model';
import { Genres } from '../shared/genres';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {
  @Input() show: TvShow;

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
