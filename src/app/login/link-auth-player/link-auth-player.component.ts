import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { DbService } from 'src/app/services/db.service';
import { PlayerDbService } from 'src/app/services/playerDb.service';

@Component({
  selector: 'app-link-auth-player',
  templateUrl: './link-auth-player.component.html',
  styleUrls: ['./link-auth-player.component.css']
})
export class LinkAuthPlayerComponent implements OnInit, OnDestroy {

  subscriptionAuth: Subscription;
  subscriptionDB: Subscription;

  authJSON: any;
  uid: any;
  playerList: any;

  constructor(private auth: AuthService,
    private router: RouterService,
    private playerDb: PlayerDbService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));
    this.subscriptionDB = this.playerDb.currentPlayers.subscribe(x => this.checkPlayers(x));


  }

  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();

  }

  logOut() {
    this.auth.logOut();
  }

  checkAuth(message) {

    if (message === 'default') {


    } else if (message) {

      this.authJSON = JSON.parse(JSON.stringify(message));
      this.uid = this.authJSON.uid;

      console.log(this.uid);

    } else {

      this.router.proceedToLogin();

    }

  }

  checkPlayers(x) {

    this.playerList = x;
    console.log(this.playerList);

  }

}
