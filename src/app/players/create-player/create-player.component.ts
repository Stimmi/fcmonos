import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit, OnDestroy {

  @Input() player: Player;
  @Input() update: boolean;

  playerName: string;
  uid: String;
  errorMessage:string;
  linkPlayerMode: boolean;

  constructor(private dbService: DbService) {



   }

  ngOnInit() {


  }



  ngOnDestroy() {

  }



  onSubmit() {

    /*console.log("formsubmitted")
    console.log(this.player);
    this.player.email = '';
    this.dbService.addPlayer(this.player).then(x => this.afterSubmit(x.id));*/

    }
        
     
    /*FUNCTIES TE VERPLAATSEN NAAR LINK PLAYER EN PLAYER-DET */
  afterSubmit(id) {

    /*if(this.linkPlayerMode) {
      this.dbService.linkPlayerAndAuth(id, this.auth.getUid(), this.auth.getMailAdress())
      .then(() =>this.router.proceedToDashboard());
      

    } else {
      this.router.proceedToPlayers()
    }*/


  }



}
