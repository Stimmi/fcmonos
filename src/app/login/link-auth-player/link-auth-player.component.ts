import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { PlayerDbService } from 'src/app/services/playerDbService';
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
  playerList: Player[];
  selectedPlayer: String;
  player: Player;
  updateMode: boolean = true;

  constructor(private auth: AuthService,
    private router: RouterService,
    private playerDb: PlayerDbService,
    private db: DbService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));
    this.subscriptionDB = this.playerDb.currentPlayers.subscribe(x => this.checkPlayers(x));
    this.player = new Player();


  }

  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();
    this.subscriptionDB.unsubscribe();

  }

  logOut() {
    this.auth.logOut();
  }

  checkAuth(message) {

    if (message === 'default') {


    } else if (message === 'linkPlayer') {

      this.uid = this.auth.getUid();

      console.log('UID in link comp')

      console.log(this.uid);

    } else if (message = 'session') {

      this.router.proceedToDashboard();


    } else {

      this.router.proceedToLogin();

    }

  }

  checkPlayers(x) {


    this.playerList = x;
    this.playerList = this.playerList.filter(x => x.uid === null || x.uid === undefined || x.uid === '0' || x.uid === '');
    /*this.playerList.unshift();*/
    console.log('Link player comp player list')
    console.log(this.playerList);


  }

  linkPlayer(){


      this.db.linkPlayerAndAuth(this.selectedPlayer,this.auth.getUid(),this.auth.getMailAdress())
      .then(() => this.router.proceedToDashboard()).catch(y => console.log(y));


  }

  linkNewPlayer() {

    this.player.uid = this.auth.getUid();
    this.player.email = this.auth.getMailAdress();
    this.db.addPlayer(this.player)
  }

}
