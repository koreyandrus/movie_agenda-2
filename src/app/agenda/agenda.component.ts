import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tv-show.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  viewOptions: string[] = ['Movie', 'TV', 'All'];
  selectedView: string = 'Movie';

  isAgenda: boolean = true;
  isShowVideo: boolean = false;
  videoCode: string;

  savedMovies: Movie[] = [];
<<<<<<< HEAD
  savedShows: TvShow[];
=======
  savedShows: TvShow[] = [];
>>>>>>> 7155fe0d77c257001f42de3642cd0d3bdeb357f4

  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {
    if (this.savedMovies.length === 0) {
      this.getMovies();
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
