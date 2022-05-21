import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ItemCardComponent } from './item-card/item-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import { AgendaComponent } from './agenda/agenda.component';
import { TvCardComponent } from './tv-card/tv-card.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SafePipe } from './shared/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FooterComponent,
    HeaderComponent,
    DropdownDirective,
    ItemCardComponent,
    MovieCardComponent,
    LoadingSpinner,
    AuthComponent,
    AgendaComponent,
    TvCardComponent,
    VideoPlayerComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
