import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tv-show.model';
import { DataStorageService } from '../services/data-storage.service';
import { MoviesStoreService } from '../services/movies-store.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent implements OnInit {
  constructor(
    private dataService: DataStorageService,
    private moviesStore: MoviesStoreService
  ) {}

  viewOptions: string[] = ['Movie', 'TV', 'All'];
  selectedView: string = 'Movie';

  isAgenda: boolean = true;
  isShowVideo: boolean = false;
  videoCode: string;

  savedMovies: Movie[] = [];
  savedShows: TvShow[] = [];

  ngOnInit(): void {
    if (this.savedMovies.length === 0) {
      this.savedMovies = this.moviesStore.getMovies();
    }
    if (this.savedShows.length === 0) {
      this.getShows();
    }
  }

  showVideo(videoCode) {
    this.videoCode = videoCode;

    this.isShowVideo = true;
  }

  closeVideo() {
    this.isShowVideo = false;
  }

  getMovies() {
    this.dataService.getSavedMovies().subscribe((response) => {
      this.savedMovies = response;
    });
  }

  getShows() {
    this.dataService.getSavedShows().subscribe((response) => {
      this.savedShows = response;
    });
  }

  onViewChange($event) {
    this.selectedView = $event.target.innerText;
  }
}
