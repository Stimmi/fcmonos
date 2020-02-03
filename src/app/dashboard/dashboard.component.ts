import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, Presence } from '../events/events.component';
import { Player} from '../players/players.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';
import { EventDbService } from '../services/eventDbService';
import { DbService } from 'src/app/services/db.service';
import { faCheckCircle, faCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as faCheckCircleSol, faCircle as faCircleSol, faTimesCircle as faTimesCircleSol,
faQuestionCircle as faQuestionCircleSol, faUsers} from '@fortawesome/free-solid-svg-icons';

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

  public subscriptionAuth: Subscription;
  public subscriptionEvents: Subscription;
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


  constructor(private auth: AuthService,
    private eventService: EventDbService,
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
    this.subscriptionPresences = this.dbService.
    getEventPrecensesPlayer(this.auth.getTeamId(),this.currentPlayer.id).subscribe(y => this.processPresences(y));


  }

  processEvents(x) {

    this.events = x;

    this.createDashboardList();
    

  }

  processPresences(y) {

    this.presences = y;
    this.createDashboardList();


  }



  createDashboardList() {
  let index = 0;
  let indexx = 0;

  for (index = 0; index < this.events.length; index++) {
    this.events[index].presence = null;

    this.events[index].gDate = this.changeDateField(this.events[index].startTime);

    this.events[index].amountUnknown = this.auth.getAmountPlayers() - this.events[index].amountMaybe
    - this.events[index].amountYes - this.events[index].amountNo;
    
    for (indexx = 0; indexx < this.presences.length; indexx++) {
      if (this.events[index].id === this.presences[indexx].id) {
        this.events[index].presence = this.presences[indexx].presence;
      }
    }
  }


  this.events = this.events.filter(c => c.gDate > new Date(new Date().setDate(new Date().getDate()-1)));
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
