import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string;
  constructor() {}

  ngOnInit(): void {}

  getVideoLink() {
    this.videoId = 'https://www.youtube.com/watch?v=vc7_mH2PWHs';
  }
}
