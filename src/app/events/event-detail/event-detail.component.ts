import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event, Presence } from '../events.component';
import { DbService } from 'src/app/services/db.service';
import { RouterService } from 'src/app/services/router.service';
import { Subscription } from 'rxjs';
import { PlayerDbService } from 'src/app/services/playerDbService';
import { AuthService } from '../../services/auth.service';
import { Player } from '../../players/players.component';
import { faCheckCircle, faCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as faCheckCircleSol, faCircle as faCircleSol, faTimesCircle as faTimesCircleSol,
faQuestionCircle as faQuestionCircleSol, faCalendar, faQuoteLeft, faClock, faMapMarkerAlt, faCommentAlt,
faExclamationTriangle, faCog, faUserTie, faUserShield, faUserInjured, faUserCog} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  disabled: boolean = false;
  datePicked: {
    year:number,
    month:number,
    day:number
  }
  startTime1: number;
  startTime2: number;
  event: Event;
  eventId: string;
  newEventMode: boolean;
  subscribtionEvent: Subscription;
  subscribtionAuth: Subscription;
  subscribtionEventPresences: Subscription;
  subscribtionPlayers: Subscription;
  inbetweenDate: Date;
  presences: Presence[] = [];
  players: Player[];
  playersCount: Player[];
  playersNoCount: Player[];
  currentPlayer: Player;
  private totalPlayersCount: number = 0;


  faCheckCircle = faCheckCircle;
  faCheckCircleSol = faCheckCircleSol;
  faTimesCircle = faTimesCircle;
  faTimesCircleSol = faTimesCircleSol;
  faCircle = faCircle;
  faCircleSol = faCircleSol;
  faQuestionCircle = faQuestionCircle;
  faQuestionCircleSol = faQuestionCircleSol;
  faCalendar = faCalendar;
  faQuoteLeft = faQuoteLeft;
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;
  faCommentAlt = faCommentAlt;
  faExclamationTriangle = faExclamationTriangle;
  faCog =  faCog;
  faUserTie = faUserTie;
  faUserShield = faUserShield;
  faUserInjured = faUserInjured;
  faUserCog = faUserCog;

  presence: Presence;


  constructor(private route: ActivatedRoute,
    private dbService: DbService,
    private playerDbService: PlayerDbService,
    private router: RouterService,
    private redirecter: Router,
    private auth: AuthService) { 

    this.eventId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.event = new Event();
    this.event.amountUnknown = 0;
    this.presence = new Presence;
    this.currentPlayer = new Player;
    this.currentPlayer.administrator = false;
    this.playersNoCount = [];
    this.playersCount = [];

    this.subscribtionAuth = this.auth.currentAuth.subscribe(a => this.processAuth(a));

  }

  processAuth(a) {

  
    switch(a) {
      case "default": break;
      case "session": this.loadData() ; break;
      case "linkPlayer": this.router.proceedToLinkPlayer(); break;
      default: this.router.proceedToLogin();
    }
  }

  ngOnDestroy() {
    if(this.subscribtionEvent) {
      this.subscribtionEvent.unsubscribe();
    }
    if(this.subscribtionEventPresences) {
      this.subscribtionEventPresences.unsubscribe();
    }
    if(this.subscribtionPlayers) {
      this.subscribtionPlayers.unsubscribe();
    }
    if(this.subscribtionAuth) {
      this.subscribtionAuth.unsubscribe();
    }
  }

  loadData() {
    
    this.currentPlayer = this.auth.getCurrentPlayer();

    if(this.eventId === 'newevent') {

      this.newEventMode = true;

    } else {

      this.newEventMode = false;

      this.subscribtionEvent = this.dbService.getEvent(this.eventId).subscribe(x => this.processEvent(x));

      this.subscribtionEventPresences = this.dbService.getEventPrecenses(this.eventId)
      .subscribe(y => this.processEventPresences(y));

      this.subscribtionPlayers = this.playerDbService.currentPlayers.subscribe(z => this.processPlayers(z));

    }
  }

  submitForm() {
    if(this.eventId === 'newevent') {
      this.addNewEvent();
    } else {
      this.updateEvent();
    }

  }

  addNewEvent() {

    this.event.startTime = new Date();

    this.event.startTime.setFullYear(this.datePicked.year, this.datePicked.month-1, this.datePicked.day);
    this.event.startTime.setHours(this.startTime1);
    this.event.startTime.setMinutes(this.startTime2);
    this.event.amountYes = 0;
    this.event.amountNo = 0;
    this.event.amountMaybe = 0;


    this.processDateFields();

    this.dbService.addEvent(this.event).then(() => this.router.proceedToEvents());
    
  }

  updateEvent() {

    this.processDateFields();
    this.dbService.updateEvent(this.eventId,this.event)
    .then(() => this.router.proceedToEvents());

  }

  addEvent() {

    this.redirecter.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.redirecter.navigate(["/events/newevent"]);
  }); 

  }

  deleteEvent() {
    this.dbService.deleteEvent(this.eventId);
    this.router.proceedToEvents();

  }

  processDateFields() {

    this.event.startTime = new Date();

    this.event.startTime.setFullYear(this.datePicked.year, this.datePicked.month-1, this.datePicked.day);
    this.event.startTime.setHours(this.startTime1);
    this.event.startTime.setMinutes(this.startTime2);

  }

  completeTimeFields(startTime) {

    this.datePicked = {year:0,month:0, day:0};

    this.inbetweenDate = new Date(startTime.seconds*1000);


    this.datePicked.year = this.inbetweenDate.getFullYear();
    this.datePicked.month = this.inbetweenDate.getMonth()+1;
    this.datePicked.day = this.inbetweenDate.getDate();

    this.startTime1 = this.inbetweenDate.getHours();
    this.startTime2 = this.inbetweenDate.getMinutes();

  }


  processEvent(x) {
    this.event = x;

    this.completeTimeFields(this.event.startTime);
    this.calculateTotals();

  }

  processEventPresences(y) {
    this.presences = y;
    this.createPresencesList();


  }

  processPlayers(z){

    this.players = z;

    if(this.presences.length > 0) {
      this.createPresencesList();
    }

  }

  createPresencesList() {
    
    this.calculateTotals();

    let index = 0;
    let indexx = 0;

    /*Loop all players and link them with the presences linked to the current event */
    for (index = 0; index < this.players.length; index++) {
      this.players[index].presence = null;
      for (indexx = 0; indexx < this.presences.length; indexx++) {
        if (this.players[index].id === this.presences[indexx].id) {
          this.players[index].presence = this.presences[indexx].presence;
        }
      }
    }

    /*Split the players between those included in the count and those not*/
    this.playersNoCount = [];
    this.playersCount = [];
    index = 0;
    for (index = 0; index < this.players.length; index++) {
      if (this.players[index].includeCount === false) {
          this.playersNoCount.push(this.players[index]);
      } else {
          this.playersCount.push(this.players[index]);
        }
      }


  this.playersCount.sort((a,b) => this.sortBypresence(a,b));
  this.playersNoCount.sort((a,b) => this.sortBypresence(a,b));


  }

  /*Sort method by precense and setting the current player first*/
  sortBypresence (a,b) {

    if(a.id == this.currentPlayer.id) {
      a = 6;
    } else {
      switch (a.presence) {
        case 'YES': a = 5;break;
        case 'MAYBE': a = 4;break;
        case 'NO': a = 3;break;    
        default: a = 0;
          break;
      }
    }

    if (b.id == this.currentPlayer.id) {
     b = 6; 
    } else {
      switch (b.presence) {
        case 'YES': b = 5;break;
        case 'MAYBE': b = 4;break;
        case 'NO': b = 3;break;    
        default: b = 0;
          break;
      }
    }


    if ( a < b ){
      return 1;
    }
    if ( a > b){
      return -1;
    }
    return 0;  
  }
  
  calculateTotals() {
    let index = 0;
    let playersCount = 0;
    this.event.amountUnknown = 0;

    for (index = 0; index < this.players.length; index++) {
        if(this.players[index].includeCount != false) {
          playersCount++
        }

    }
    this.event.amountUnknown = playersCount - this.event.amountYes - this.event.amountMaybe - this.event.amountNo;
  }

  changePresence(newPresence, playerID ) {

    if (this.currentPlayer.administrator === true || playerID === this.currentPlayer.id) {

      this.presence.presence = newPresence;

      this.dbService.setEventPresence(this.eventId, playerID ,this.presence);

      let index = 0;

      for (index = 0; index < this.players.length; index++) {
        if (this.players[index].id === playerID) {
          this.players[index].presence = this.presence.presence;
     }
    }
  }


  }


  editEvent() {
    this.newEventMode = true;
  }



}

