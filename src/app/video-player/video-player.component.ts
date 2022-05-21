import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Output() closeBtnClicked = new EventEmitter<boolean>();
  @Input() videoCode: string;

  baseUrl = 'https://www.youtube.com/embed/';

  videoUrl: SafeResourceUrl = ``;

  constructor(private sanitizer: DomSanitizer) {}

  onClose() {
    this.closeBtnClicked.emit(true);
  }

  ngOnInit() {
    this.videoUrl = this.baseUrl + this.videoCode;
    console.log(this.videoUrl);
  }
}
