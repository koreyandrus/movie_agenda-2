import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  // @Output() showVideoClicked = new EventEmitter<boolean>();
  @Output() videoCodeEvent = new EventEmitter<string>();

  baseVideoUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  videos;
  videoCode: string;

  constructor(
    private movieService: MoviesService,
    private dataService: DataStorageService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.getSingleMoviesVideos(this.movie.id);
    this.getVideoCode(this.movie.id);
    this.movieService.getMovieVideos(this.movie.id).subscribe();
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

  onAdd(movieData: Movie) {
    this.dataService.getSavedMovies();

    this.dataService.saveMovie(movieData);
  }

  onShowVideoClicked() {
    this.videoCodeEvent.emit(this.videoCode);
  }

  getVideoCode(id): void {
    this.movieService.getMovieVideos(id).subscribe((res) => {
      this.videoCode = res.results.filter(this.filterType)[0].key;
    });
  }

  filterType(vids) {
    return vids.type == 'Trailer';
  }

  // getSingleMoviesVideos(id) {
  //   this.movieService.getMovieVideos(id).subscribe((res: any) => {
  //     if (res.results.length) {
  //       this.video = res.results[0];
  //     }
  //   });
  // }
}
