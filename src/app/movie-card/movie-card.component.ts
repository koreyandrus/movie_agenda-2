import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';
import { MoviesService } from '../services/movies.service';
import { Genres } from '../shared/genres';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  @Input() isAgenda: boolean;
  @Output() videoCodeEvent = new EventEmitter<string>();

  baseVideoUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  videos;
  videoCode: string;
  certification: string;

  constructor(
    private movieService: MoviesService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.getVideoCode(this.movie.id);
    this.getRating(this.movie.id);
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
    this.movieService.getMovieRating(id).subscribe((res) => {
      this.certification = res.results
        .filter((type) => type.iso_3166_1 == 'US')[0]
        ?.release_dates.filter(
          (cert) => cert.type === 3 || cert.type === 4
        )[0].certification;
    });
  }

  onAdd(movieData: Movie) {
    this.dataService.getSavedMovies();
    this.dataService.saveMovie(movieData);
  }

  onDelete(movieData: Movie) {
    this.dataService
      .deleteMovie(movieData)
      .subscribe((res) => console.log(res));
    // this.dataService.getSavedMovies();
  }

  onShowVideoClicked() {
    this.videoCodeEvent.emit(this.videoCode);
  }

  getVideoCode(id): void {
    this.movieService.getMovieVideos(id).subscribe((res) => {
      this.videoCode = res.results.filter(this.filterType)[0]?.key;
    });
  }

  filterType(vids) {
    return vids.type == 'Trailer';
  }

  filterRating(iso) {
    return iso.iso_3166_1 == 'US';
  }
}
