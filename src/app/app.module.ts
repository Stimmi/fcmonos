import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';
import { TipstricksComponent } from './tipstricks/tipstricks.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DbService } from './services/db.service';
import { FormsModule }   from '@angular/forms';
import { SignupComponent } from './login/signup/signup.component';
import { LinkAuthPlayerComponent } from './login/link-auth-player/link-auth-player.component';
import { RouterService } from './services/router.service';
import { PlayerDbService } from './services/playerDbService';
import { CreatePlayerComponent } from './players/create-player/create-player.component';
import { EventDbService } from './services/eventDbService';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventPresenceComponent } from './events/event-presence/event-presence.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LOCALE_ID } from '@angular/core';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeNl, 'nl-NL');

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
    TipstricksComponent,
    SignupComponent,
    LinkAuthPlayerComponent,
    CreatePlayerComponent,
    EventPresenceComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule

  ],
  providers: [AuthService,DbService,PlayerDbService,EventDbService, RouterService,
    { provide: LOCALE_ID, useValue: "nl-NL" }],
  bootstrap: [AppComponent]


})
export class AppModule { }
