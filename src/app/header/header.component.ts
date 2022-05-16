import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navBar: boolean = false;

  toggleNav() {
    this.navBar = !this.navBar;
  }

  constructor() {}

  ngOnInit(): void {}
}
