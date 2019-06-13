import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private dbService: DbService,
    private router:  Router) { }



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

  this.subscriptionPlayers = this.dbService.getPlayers().subscribe(x => this.displayPlayers(x));


  }

  ngOnDestroy(){
    this.subscriptionPlayers.unsubscribe();
  }

  addAPlayer() {
    this.router.navigate(['/players/newplayer']);
  }

  displayPlayers(players) {

    this.players = players;

    console.log(this.players);
  }




}
