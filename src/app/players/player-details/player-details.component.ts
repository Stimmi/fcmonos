import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {

  playerId: string;
  updateMode: boolean = false;
  newPlayerMode: boolean;
  uid: String;
  player:Player = new Player();
  foutmelding:string;
  subsciptionPlayer:Subscription;
  subsciptionAuth:Subscription;
  private administrator = false;


  constructor(private route: ActivatedRoute,
     private router: Router,
     private routerService: RouterService,
     private dbService: DbService,
     private auth: AuthService) {



   }

  ngOnInit() {

    this.subsciptionAuth = this.auth.currentAuth.subscribe(y => this.processAuth(y));

  }


  ngOnDestroy() {
    /*if(this.subsciptionPlayer){
      this.subsciptionPlayer.unsubscribe();
    }*/

    if (this.subsciptionAuth) {
      this.subsciptionAuth.unsubscribe();
    }
  }

  processAuth(y) {

    switch(y) {
      case "default": break;
      case null: this.routerService.proceedToLogin(); break;
      case "session": this.loadData() ; break;
      default: break;
    }

  }

  loadData() {

    if (this.router.url ==="/players/newplayer") {
      this.newPlayerMode = true;
    } else {
      this.newPlayerMode = false;
    }


    if (this.newPlayerMode) {
      this.updateMode= true;

    } else {
      this.playerId = this.route.snapshot.paramMap.get('id');
      this.updateMode= false;

      this.subsciptionPlayer = this.dbService.getPlayerById(this.auth.getTeamId(),this.playerId)
      .subscribe(x => this.displayPlayer(x));

      this.administrator = this.auth.getAdministrator();

    }

  }

  submitFunction() {


    if (this.newPlayerMode) {

      this.dbService.addPlayer(this.auth.getTeamId(), this.player).finally(() => this.router.navigate(['/players']));

    } else {
      this.dbService.updatePlayer(this.auth.getTeamId(),this.playerId, this.player).finally(() => this.updateModeFunction());
    }

  }
  
  createFunction() {
    this.player.uid = '/';
    this.player.email = '/';

    this.dbService.addPlayer(this.auth.getTeamId(),this.player).then(() => this.routerService.proceedToPlayers());

  }


  displayPlayer(player) {
    this.player = player;
    if(this.player.uid === this.auth.getUid()) {
      this.administrator = true;
    }
  }


  updateModeFunction() {
    this.updateMode = !this.updateMode;
  }

  cancelFunction() {
    if(this.newPlayerMode) {
      this.routerService.proceedToPlayers();
    } else {
      this.updateModeFunction();
    }
  }




}
