import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  isAgenda: boolean = true;
  isShowVideo: boolean = false;
  videoCode: string;

  savedMovies: Movie[];

  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.getMovies();
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
      // console.log(this.savedMovies);
    });
  }
}
