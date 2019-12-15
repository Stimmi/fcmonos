import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';
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
  model:Player = new Player(this.playerId, this.uid);/* AANPASSING CONSTRUCTOR */
  foutmelding:string;
  subsciptionPlayer:Subscription;

  constructor(private route: ActivatedRoute,
     private router: Router,
     private routerService: RouterService,
     private dbService: DbService) {



   }

  ngOnInit() {

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

      this.subsciptionPlayer = this.dbService.getPlayerById(this.playerId)
      .subscribe(x => this.displayPlayer(x));

    }


  }


  ngOnDestroy() {
    if(this.subsciptionPlayer){
      this.subsciptionPlayer.unsubscribe();

    }
  }

  onSubmit() {

    console.log("formsubmitted")
    console.log(this.model);

    if (this.newPlayerMode) {
 
      this.dbService.addPlayer(this.model).finally(() => this.router.navigate(['/players']));

    } else {
      this.dbService.addPlayer(this.model).finally(() => this.updateModeFunction());
    }





  }

  displayPlayer(player) {
    console.log(player);
    this.model = player;
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
