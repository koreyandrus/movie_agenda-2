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
  savedShows: TvShow[];

  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.getMovies();
    this.getShows();
  }

  displayMovies() {
    // console.log(this.savedMovies);
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
