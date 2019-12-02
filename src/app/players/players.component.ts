import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PlayerDbService } from '../services/playerDb.service';
import { RouterService } from '../services/router.service';

export class Player {
  public name:string;
  public playerNumber:string;
  public uid:string;
  public email:string;


  constructor (name, uid) {
    this.name = name;
    this.uid = uid;
    this.playerNumber = this.playerNumber;
    this.email = this.email;


  }

}


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  players: Player[];
  subscriptionPlayers: Subscription;
  subscriptionAuth: Subscription;
  currentPlayer: Player = new Player('0','0');




  constructor(private playerDb: PlayerDbService,
    private routerService: RouterService,
    private auth: AuthService) { }



  ngOnInit() {

  this.subscriptionPlayers = this.playerDb.currentPlayers.subscribe(x => this.displayPlayers(x));

  this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));


  }

  ngOnDestroy(){
    this.subscriptionPlayers.unsubscribe();
    this.subscriptionAuth.unsubscribe();

   }

  addAPlayer() {
    this.routerService.proceedToNewPlayer();


  }

  /*


  */

  displayPlayers(players) {

    this.players = players;
    

  }

  checkAuth(message) {

    console.log('Check aut in Players');
    console.log(message);


    if (message === 'default') {

      // Wacht de onStateChanged heeft nog geen resultaat

    } else if (message === null) {

      // Geen sessie gaan naar login pagina

      this.routerService.proceedToLogin();

    } else if(message === 'linkPlayer') {

      this.routerService.proceedToLinkPlayer();

    } else {

      this.currentPlayer = this.auth.getCurrentPlayer();
      console.log('Player comp: laden naam');
      console.log(this.currentPlayer);


      // auth sessie binnen



    }

  }

  checkUser (message: any) {
    console.log('Check user function in players')
    console.log(message);
  }

  logOut() {

    this.auth.logOut();
  }




}
