import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

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

  constructor(private dbService: DbService,
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

  this.subscriptionPlayers = this.dbService.currentPlayers.subscribe(x => this.displayPlayers(x));

  this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));
  }

  ngOnDestroy(){
    this.subscriptionPlayers.unsubscribe();
    this.subscriptionAuth.unsubscribe() }

  addAPlayer() {
    this.router.navigate(['/players/newplayer']);


  }

  displayPlayers(players) {

    if(players === 'default message') {

      // Player list is empty so db function is triggered. Check that this doesn't happen twice?
      this.dbService.getPlayers();
      /* Insert waiting symbol */
    } else {

      this.players = players;

      console.log(this.players);
    }


  }

  checkAuth(message) {

    if (message === 'default message') {
      this.router.navigate(['/login']);
    }

  }




}
