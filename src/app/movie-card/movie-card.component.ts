import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';
import { MoviesService } from '../services/movies.service';
import { Genres } from '../shared/genres';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  baseVideoUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  video;

  constructor(
    private movieService: MoviesService,
    private dataService: DataStorageService,
    private router: Router,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.videoUrl = `https://www.youtube.com/watch?v=${this.getTrailerId()}`;
    this.getSingleMoviesVideos(this.movie.id);
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

  getSingleMoviesVideos(id) {
    this.movieService.getMovieVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        // this.relatedvideo = res.results;
      }
    });
  }

  openDialogMovie(): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseVideoUrl + 'SQK-QxxtE8Y' + this.autoplay
    );
    this.dialog.open(VideoPlayerComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video },
    });
  }

  onViewTrailer() {
    // this.router.navigate([this.videoUrl]);
  }
}
