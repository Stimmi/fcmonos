import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { faCog, faIdCard, faSignature, faUserInjured, faUserShield, faUserTie, faUserCheck, faUserCog} from '@fortawesome/free-solid-svg-icons';

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
  subscriptionDetails: Subscription;
  subsciptionAuth:Subscription;
  public administrator = false;
  public administratorAdmin = false;

  faCog = faCog;
  faIdCard = faIdCard;
  faSignature = faSignature;
  faUserInjured = faUserInjured;
  faUserShield = faUserShield;
  faUserTie = faUserTie;
  faUserCheck = faUserCheck;
  faUserCog = faUserCog;

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
    if(this.subsciptionPlayer){
      this.subsciptionPlayer.unsubscribe();
    }
    if (this.subsciptionAuth) {
      this.subsciptionAuth.unsubscribe();
    }
    if (this.subscriptionDetails) {
      this.subscriptionDetails.unsubscribe();
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
      this.administratorAdmin  = this.auth.getAdministrator();


    } else {
      this.playerId = this.route.snapshot.paramMap.get('id');
      this.updateMode= false;

      this.subsciptionPlayer = this.dbService.getPlayerById(this.playerId)
      .subscribe(x => this.displayPlayer(x));

      this.subscriptionDetails = this.dbService.getLastActive(this.playerId)
      .subscribe(y => this.setLastActive(y));

      this.administrator = this.auth.getAdministrator();
      this.administratorAdmin  = false;

    }

  }

  submitFunction() {


    if (this.newPlayerMode) {

      this.dbService.addPlayer(this.player).finally(() => this.router.navigate(['/players']));

    } else {
      this.updateMode = false;
      this.administratorAdmin = false;
      this.dbService.updatePlayer(this.playerId, this.player);
    }

  }
  
  createFunction() {
    this.player.uid = '/';
    this.player.email = '/';

    this.dbService.addPlayer(this.player).then(() => this.routerService.proceedToPlayers());

  }


  displayPlayer(player) {
    this.player = player;
    if(this.player.uid === this.auth.getUid()) {
      this.administrator = true;
    }
  }

  setLastActive(date) {
    if(date) {
      this.player.lastActive = date.lastActive;
    }
  }

  updateModeFunction() {
    this.updateMode = !this.updateMode;
    if(this.updateMode) {
      this.administratorAdmin = this.auth.getAdministrator();
    } else {
      this.administratorAdmin = false;
    }
  }

  cancelFunction() {
    if(this.newPlayerMode) {
      this.routerService.proceedToPlayers();
    } else {
      this.updateModeFunction();
    }
  }

  deletePlayer() {
    this.dbService.deletePlayer(this.playerId);
    this.routerService.proceedToPlayers();
  }


}
