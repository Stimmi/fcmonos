import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { TipstricksComponent } from './tipstricks/tipstricks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    EventsComponent,
    EventDetailComponent,
    PlayersComponent,
    PlayerDetailsComponent,
    EventDashboardComponent,
    TipstricksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
