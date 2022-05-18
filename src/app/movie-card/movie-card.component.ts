import { Component, Input, OnInit } from '@angular/core';
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
  videoUrl: string;

  constructor(
    private movieService: MoviesService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.videoUrl = `https://www.youtube.com/watch?v=${this.getTrailerId()}`;
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

  getTrailerId() {
    let key = this.movieService.getVideoId(this.movie.id).subscribe((res) => {
      return res['results'].find((item) => item.type === 'Trailer')['key'];
    });
    console.log(key);
    return key;
  }
}
