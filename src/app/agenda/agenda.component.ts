import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  savedMovies: Movie[];

  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  displayMovies() {
    console.log(this.savedMovies);
  }

  getMovies() {
    this.dataService.getSavedMovies().subscribe((response) => {
      this.savedMovies = response;
    });
  }
}
