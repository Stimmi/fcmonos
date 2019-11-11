import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { TipstricksComponent } from './tipstricks/tipstricks.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DbService } from './services/db.service';
import { FormsModule }   from '@angular/forms';
import { AuthService } from './services/auth.service';

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
    TipstricksComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule

  ],
  providers: [DbService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
