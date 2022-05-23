import { Component, Input, OnInit } from '@angular/core';
import { TvShow } from '../models/tv-show.model';
import { DataStorageService } from '../services/data-storage.service';
import { TvShowService } from '../services/tv-show.service';
import { Genres } from '../shared/genres';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {
  @Input() show: TvShow;
  @Input() showAddBtn: boolean;
  certification: string;

  constructor(
    private dataService: DataStorageService,
    private tvService: TvShowService
  ) {}

  ngOnInit(): void {
    this.getRating(this.show.id);
  }

  onAdd(showData: TvShow) {
    this.dataService.saveShow(showData);
    this.dataService.getSavedShows();
  }

  getImagePath(img_path) {
    if (img_path) {
      return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + img_path;
    }
    return;
  }

  getGenre(id) {
    return Genres.genres.find((genre) => genre.id === id).name;
  }

  getRating(id): void {
    this.tvService.getShowRating(id).subscribe((res) => {
      this.certification = res.results.filter(
        (type) => type.iso_3166_1 == 'US'
      )[0].rating;
    });
  }
}
