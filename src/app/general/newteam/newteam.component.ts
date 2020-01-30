import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { RouterService } from '../../services/router.service';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-newteam',
  templateUrl: './newteam.component.html',
  styleUrls: ['./newteam.component.css']
})
export class NewteamComponent implements OnInit {

  private subscriptionAuth: Subscription;
  private email: string;
  private password: string;
  public teamName: string;
  public newUserMode: boolean = true;
  private team :any;
  public errorMessage: string;

  constructor(private auth: AuthService,
    private db: DbService,
    private router: RouterService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x));

  }


  processAuth(x) {

    if(x === 'session') {

      this.email = this.auth.getCurrentPlayer().email;   
      this.newUserMode = false;


    }

  }

  createTeam() {

    this.team = {
      name: this.teamName,
      amountPlayers: 0
    };

    this.db.addTeam(this.team).then(z => this.setNewTeamId(z.id)).catch(y => this.errorMessage === y)
    .then(() => this.router.proceedToLinkPlayer());

  }

  setNewTeamId (z) {
    this.auth.setTeamId(z);
    this.auth.loadTeamData();
    this.auth.setTeamIdDisplayName(z);
  }

}
