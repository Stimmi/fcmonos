import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { PlayersComponent } from './players/players.component';
import { EventsComponent } from './events/events.component';
import { TipstricksComponent } from './tipstricks/tipstricks.component';


const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Events', component: EventsComponent},
  {path: 'Players', component: PlayersComponent},
  {path: 'Tips', component: TipstricksComponent},
  {path: 'Events/:name', component: EventDetailComponent},
  {path: '', redirectTo: '/Dashboard', pathMatch:'full'},
  {path: '**', component: DashboardComponent, pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
