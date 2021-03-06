import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
/*import { PlayerDbService } from 'src/app/services/playerDbService';*/
import { Player } from 'src/app/players/players.component';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-link-auth-player',
  templateUrl: './link-auth-player.component.html',
  styleUrls: ['./link-auth-player.component.css']
})
export class LinkAuthPlayerComponent implements OnInit, OnDestroy {

  subscriptionAuth: Subscription;
  subscriptionDB: Subscription;

  uid: any;
  /*playerList: Player[];
  selectedPlayer: String;*/
  player: Player;
  updateMode: boolean = true;
  linkPlayerMode: boolean = true;


  constructor(private auth: AuthService,
    private router: RouterService,
    /*private playerDb: PlayerDbService*/
    private db: DbService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));
    /*this.subscriptionDB = this.playerDb.currentPlayers.subscribe(x => this.checkPlayers(x));*/
    this.player = new Player();


  }

  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();

  }

  logOut() {
    this.auth.logOut();
  }

  checkAuth(message) {

    switch (message) {
      case 'linkPlayer': this.uid = this.auth.getUid();
        break;
      case 'session': this.router.proceedToDashboard();
        break;
      case 'default':;
        break;
      default: this.router.proceedToLogin();

        break;
    }

  }


  linkNewPlayer() {

    this.player.uid = this.auth.getUid();
    this.player.email = this.auth.getMailAdress();
    if (this.player.playerNumber === null || this.player.playerNumber === undefined) {
      this.player.playerNumber = '-';
    }
    if(this.auth.getAmountPlayers() < 1) {
      this.player.administrator = true;
    } else {
      this.player.administrator = false;
    }
    this.db.addPlayer(this.player);
  }


}

