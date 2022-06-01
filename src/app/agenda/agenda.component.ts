import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
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

  // savedMovies: Movie[] = [];
  // savedShows: TvShow[] = [];

  ngOnInit(): void {
    this.moviesStore.setMovies(this.getMovies());
  }

  showVideo(videoCode) {
    this.videoCode = videoCode;

    this.isShowVideo = true;
  }

  closeVideo() {
    this.isShowVideo = false;
  }

  getMovies(): Movie[] {
    this.dataService
      .getSavedMovies()
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe();
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
