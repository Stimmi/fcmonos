import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';

export class Player {
  public name:string;
  public playerNumber:string;



  constructor (name: string, playerNumber: string) {
    this.name = name;
    this.playerNumber = playerNumber;
  }


}


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];

  constructor(private dbService: DbService,
    private router:  Router) { }



  ngOnInit() {

    this.players = [new Player("John", "33"),
    new Player("John","33"),
    new Player("Rudy", "33"),
    new Player("John","33"),
    new Player("Elvis","33"),
    new Player("John","33"),
    new Player("John","33"),
    new Player("John","33"),
    new Player("John","33"), 
  
  ]

  /*this.dbService.getPlayers().subscribe(x => console.log(x));*/


  }

  addAPlayer() {
    this.router.navigate(['/players/newplayer']);
  }



}
