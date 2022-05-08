import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() movie: Movie;

  constructor() {}

  ngOnInit(): void {
    console.log(this.movie);
  }
}
