import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from '../models/actor.model';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';
import { MoviesService } from '../services/movies.service';
import { Genres } from '../shared/genres';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit {
  @Input() actor: Actor;
  // @Input() isAgenda: boolean;
  @Output() videoCodeEvent = new EventEmitter<string>();
  @Output() onDeleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getImagePath(img_path) {
    if (img_path) {
      return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + img_path;
    }
    return;
  }
}
