import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../players.component';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit, OnDestroy {

  playerName: string;
  uid: String;
  errorMessage:string;
  model: Player = new Player('','');
  linkPlayerMode: boolean;
  subsciptionAuth: Subscription;

  constructor(private router: RouterService,
     private dbService: DbService,
     private auth: AuthService) {



   }

  ngOnInit() {

      this.subsciptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x)); 
    




  }


  ngOnDestroy() {
    this.subsciptionAuth.unsubscribe();
  }

  processAuth(x) {
    this.linkPlayerMode = x === 'linkPlayer' ? true : false;
  }

  onSubmit() {

    console.log("formsubmitted")
    console.log(this.model);

      this.dbService.getPlayerByName(this.model.name.toUpperCase()).subscribe(x =>

        {if(x.data()) {
          this.errorMessage = 'Looks like there is already a member with this name'
          
        } else  {

          this.model.email ='';

          this.dbService.addPlayer(this.model).finally(() => this.afterSubmit());


        }

        })
    }
        
        
  afterSubmit() {

    if(this.linkPlayerMode) {
      this.dbService.linkPlayerAndAuth(this.model.name, this.auth.getUid(), this.auth.getMailAdress())
      .then(() =>this.router.proceedToDashboard());
      

    } else {
      this.router.proceedToPlayers()
    }


  }

  displayPlayer(player) {
    console.log(player);
    this.model = player;
  }



}
