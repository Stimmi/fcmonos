import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

import { Subscription } from 'rxjs';


export class Team {
  public id:string;

  public name:string;
  public amountPlayers:number;


  constructor () {
    this.name = this.name;
    this.amountPlayers = this.amountPlayers;
    this.id = this.id;


  }

}

@Component({
  selector: 'app-tipstricks',
  templateUrl: './tipstricks.component.html',
  styleUrls: ['./tipstricks.component.css']
})



export class TipstricksComponent implements OnInit, OnDestroy {

  subscriptionAuth: Subscription;
  teamId: string;
  teamName: string;
  teamsAuth : string[];
  teams: Team[];
  defaultTeam: string;

  constructor(private router :RouterService,
    private auth: AuthService,
    private db: DbService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x));

  }

  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();
  }

  processAuth(x) {

    switch(x) {
      case "default": break;
      case null: this.router.proceedToLogin(); break;
      case "linkPlayer": this.router.proceedToLinkPlayer(); break;
      case "session": this.loadData();break;

    }


  }

  loadData() {

    this.teamId = this.auth.getTeamId();
    this.teamName = this.auth.getTeamName();
    this.db.getTeams().subscribe(y => this.checkTeams(y));


  }

  proceedToNewTeam() {

    this.router.proceedToNewTeam();

  }

  checkTeams(y) {

    this.teamsAuth = this.auth.getDisplayName().split("&&&");
    this.setDefaultTeam(this.teamsAuth[0]);

    this.teams = y;
    this.teams = this.teams.filter(data => (this.teamsAuth.includes(data.id)));
   

  }

  changeTeam(team) {

    this.auth.setTeamId(team);
    this.auth.loadTeamData();

    this.router.proceedToDashboard();
  }

  setDefault(team) {
    this.auth.changeDefaultTeam(team);
    this.changeTeam(team);
  }

  setDefaultTeam(team) {
    this.defaultTeam = team;
  }

  getDefaultTeam() {
    return this.defaultTeam;
  }


}
