import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'video', component: VideoPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
