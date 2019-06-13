import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {

  playerName: string;
  updateMode: boolean = false;
  newPlayerMode: boolean;
  model:Player = new Player();
  foutmelding:string;
  subsciptionPlayer:Subscription;

  constructor(private route: ActivatedRoute,
     private router: Router,
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
      this.playerName = this.route.snapshot.paramMap.get('name');
      this.updateMode= false;

      this.subsciptionPlayer = this.dbService.getPlayer(this.playerName.toUpperCase())
      .subscribe(x => this.displayPlayer(x.data()));

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
      this.dbService.getPlayer(this.model.name.toUpperCase()).subscribe(x => {
        if(x.exists){
          this.foutmelding = "bestaat reeds";
        } else {
          this.dbService.addPlayer(this.model).finally(() => this.router.navigate(['/players']));
        }
      });
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
      this.router.navigate(['/players']);
    } else {
      this.updateModeFunction();
    }
  }




}
