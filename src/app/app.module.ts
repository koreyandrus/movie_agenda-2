import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarModule } from './nav-bar/nav-bar.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NavBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
