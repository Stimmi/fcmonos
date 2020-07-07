import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, Presence } from '../events/events.component';
import { Player} from '../players/players.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';
import { EventDbService } from '../services/eventDbService';
import { PlayerDbService } from '../services/playerDbService';

import { DbService } from 'src/app/services/db.service';
import { faCheckCircle, faCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as faCheckCircleSol, faCircle as faCircleSol, faTimesCircle as faTimesCircleSol,
faQuestionCircle as faQuestionCircleSol, faUsers, faComment, faUserTie, faUserShield, faUserInjured, faUserCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public events: Event[];
  public presences: Presence[] = [];
  private currentPlayer: Player;
  private presence: Presence;
  private oldPresence: Presence;
  private inbetweenDate: Date;
  private countPlayers: number;

  private players: Player[];
  public amountCount: number;
  private amountUnknown: number;
  public amountTotalCoach: number;
  public amountTotalGoalkeeper: number;
  public amountTotalInjured: number;
  public amountUpcoming: number;


  public subscriptionAuth: Subscription;
  public subscriptionEvents: Subscription;
  public subscriptionPlayers: Subscription;
  public subscriptionPresences: Subscription;


  faCheckCircle = faCheckCircle;
  faCheckCircleSol = faCheckCircleSol;
  faTimesCircle = faTimesCircle;
  faTimesCircleSol = faTimesCircleSol;
  faCircle = faCircle;
  faCircleSol = faCircleSol;
  faQuestionCircle = faQuestionCircle;
  faQuestionCircleSol = faQuestionCircleSol;
  faUsers = faUsers;
  faComment = faComment;
  faUserTie = faUserTie;
  faUserShield = faUserShield;
  faUserInjured = faUserInjured;
  faUserCheck = faUserCheck;


  constructor(private auth: AuthService,
    private eventService: EventDbService,
    private playerService: PlayerDbService,
    private dbService: DbService,
    private router: RouterService) { }

  ngOnInit() {
    this.presence = new Presence;
    this.oldPresence = new Presence;
    this.subscriptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x));
    this.countPlayers = 0;

  }

  ngOnDestroy() {

    if (this.subscriptionAuth) {
      this.subscriptionAuth.unsubscribe();
    }
    if (this.subscriptionEvents) {
      this.subscriptionEvents.unsubscribe();
    }
    if (this.subscriptionPlayers) {
      this.subscriptionPlayers.unsubscribe();
    }
    if (this.subscriptionPresences) {
      this.subscriptionPresences.unsubscribe();
    }


  }


  processAuth(x) {

    switch(x) {
      case "default": break;
      case "session": this.loadData() ; break;
      case "linkPlayer": this.router.proceedToLinkPlayer(); break;
      default: this.router.proceedToLogin();
    }

  }

  loadData() {

    this.currentPlayer = this.auth.getCurrentPlayer();

    this.subscriptionEvents = this.eventService.currentEvents.subscribe(x => this.processEvents(x));
    this.subscriptionPlayers = this.playerService.currentPlayers.subscribe(z => this.processPlayers(z));
    this.subscriptionPresences = this.dbService.
    getEventPrecensesPlayer(this.auth.getTeamId(),this.currentPlayer.id).subscribe(y => this.processPresences(y));


  }

  processEvents(x) {

    this.events = x;

    this.createDashboardList();
    

  }

  processPlayers(players) {
    let index = 0;
    this.amountCount = 0;
    this.amountTotalCoach = 0;
    this.amountTotalInjured = 0;
    this.amountTotalGoalkeeper = 0;
    this.amountCount = 0;

    this.players = players;

    for (index = 0; index < this.players.length; index++) {
      if(this.players[index].includeCount == true) {
        this.amountCount++
      }
      if(this.players[index].coach == true) {
        this.amountTotalCoach++
      }
      if(this.players[index].goalkeeper == true) {
        this.amountTotalGoalkeeper++
      }
      if(this.players[index].injured == true) {
        this.amountTotalInjured++
      }
    }
  }

  processPresences(y) {

    this.presences = y;
    this.createDashboardList();


  }



  createDashboardList() {
  let index = 0;
  let indexx = 0;
  this.amountUpcoming = 0;

  for (index = 0; index < this.events.length; index++) {
    this.events[index].presence = null;

    this.events[index].gDate = this.changeDateField(this.events[index].startTime);

    this.events[index].amountUnknown = this.amountCount - this.events[index].amountMaybe
    - this.events[index].amountYes - this.events[index].amountNo;
    
    for (indexx = 0; indexx < this.presences.length; indexx++) {
      if (this.events[index].id === this.presences[indexx].id) {
        this.events[index].presence = this.presences[indexx].presence;
      }
    }
  }

  this.events = this.events.filter(c => c.gDate > new Date(new Date().setDate(new Date().getDate()-1)));
  this.amountUpcoming = this.events.length;
  this.events.sort((a,b) => this.sortDate(a.startTime, b.startTime)); 
}

changeDateField(gDate) {

return this.inbetweenDate = new Date(gDate.seconds*1000);

}

sortDate(a,b) {
  return (a.seconds*1000+a.nanoseconds/1000000) - (b.seconds*1000+b.nanoseconds/1000000);
}


changePresence(oldPresence, newPresence, eventID ) {

  this.presence.presence = newPresence;
  this.oldPresence.presence = oldPresence;

  this.dbService.setEventPresence(this.auth.getTeamId(),eventID, this.currentPlayer.id ,this.presence, this.oldPresence);

  let index = 0;

  for (index = 0; index < this.events.length; index++) {
    if (this.events[index].id === eventID) {
      this.events[index].presence = this.presence.presence;
    }
  }

}
}
