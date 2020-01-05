import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PlayerDbService } from '../services/playerDbService';
import { RouterService } from '../services/router.service';

export class Player {
  public name:string;
  public playerNumber:string;
  public uid:string;
  public email:string;
  public id:string;
  public administrator: boolean = false;
  public presence: string;




  constructor () {
    this.name = this.name;
    this.uid = this.uid;
    this.playerNumber = this.playerNumber;
    this.email = this.email;
    this.administrator = this.administrator;


  }

}


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  private players: Player[];
  private subscriptionPlayers: Subscription;
  private subscriptionAuth: Subscription;
  private currentPlayer: Player = new Player();
  private administrator: boolean = false;


  constructor(private playerDb: PlayerDbService,
    private routerService: RouterService,
    private auth: AuthService) {

  }

  ngOnInit() {

  this.subscriptionAuth = this.auth.currentAuth.subscribe(message => this.checkAuth(message));

  }

  ngOnDestroy(){
    this.subscriptionPlayers.unsubscribe();
    this.subscriptionAuth.unsubscribe();

   }

  addAPlayer() {
    this.routerService.proceedToNewPlayer();
  }


  checkAuth(message) {

    switch(message) {
      case "default": break;
      case null: this.routerService.proceedToLogin(); break;
      case "linkPlayer": this.routerService.proceedToLinkPlayer(); break;
      case "session": this.loadData();break;

    }


  }

  loadData () {
    this.currentPlayer = this.auth.getCurrentPlayer();
    this.subscriptionPlayers = this.playerDb.currentPlayers.subscribe(x => this.displayPlayers(x));
    this.administrator = this.auth.getAdministrator();

  }

  displayPlayers(players) {
    this.players = players;

  }

  checkUser (message: any) {
    console.log('Check user function in players')
    console.log(message);
  }

  logOut() {

    this.auth.logOut();
  }




}
