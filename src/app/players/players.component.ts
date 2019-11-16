import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PlayerDbService } from '../services/playerDb.service';

export class Player {
  public name:string;
  public playerNumber:string;

  constructor () {

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
  currentPlayer: String;




  constructor(private playerDb: PlayerDbService,
    private router:  Router,
    private auth: AuthService) { }



  ngOnInit() {



    /*this.players = [new Player("John", "33"),
    new Player("John","33"),
    new Player("Rudy", "33"),
    new Player("John","33"),
    new Player("Elvis","33"),
    new Player("John","33"),
    new Player("John","33"),
    new Player("John","33"),
    new Player("John","33"), 
  
  ]*/

  this.subscriptionPlayers = this.playerDb.currentPlayers.subscribe(x => this.displayPlayers(x));

  this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));


  }

  ngOnDestroy(){
    this.subscriptionPlayers.unsubscribe();
    this.subscriptionAuth.unsubscribe();

   }

  addAPlayer() {
    this.router.navigate(['/players/newplayer']);


  }

  /*


  */

  displayPlayers(players) {

    if (players != 'default') {
      this.players = players;
    }

  }

  checkAuth(message) {


    if (message === 'default') {

      // Wacht de onStateChanged heeft nog geen resultaat


    } else if (message === null) {

      // Geen sessie gaan naar login pagina

      this.router.navigate(['/fcmonos/login']);

    } else {

      this.currentPlayer = message.name 
      console.log(this.currentPlayer);


      // auth sessie binnen



    }

  }

  checkUser (message: any) {
    console.log(message);
  }

  logOut() {

    this.auth.logOut();
  }




}
