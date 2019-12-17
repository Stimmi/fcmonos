import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { PlayersComponent } from './players/players.component';
import { EventsComponent } from './events/events.component';
import { TipstricksComponent } from './tipstricks/tipstricks.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';
import { SignupComponent } from './login/signup/signup.component';
import { LinkAuthPlayerComponent } from './login/link-auth-player/link-auth-player.component';
import { CreatePlayerComponent } from './players/create-player/create-player.component';


const routes: Routes = [
  {path: ':team/login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'events', component: EventsComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'players/newplayer', component: PlayerDetailsComponent},
  {path: 'players/:id', component: PlayerDetailsComponent},
  {path: 'tips', component: TipstricksComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'linkplayer', component: LinkAuthPlayerComponent},
  {path: 'events/:id', component: EventDetailComponent},
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: '**', component: DashboardComponent, pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
