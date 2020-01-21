import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, Presence } from '../events.component';
import { DbService } from 'src/app/services/db.service';
import { RouterService } from 'src/app/services/router.service';
import { Subscription } from 'rxjs';
import { PlayerDbService } from 'src/app/services/playerDbService';
import { Player } from '../../players/players.component';
import { faCheckCircle, faCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as faCheckCircleSol, faCircle as faCircleSol, faTimesCircle as faTimesCircleSol,
faQuestionCircle as faQuestionCircleSol, faCalendar, faQuoteLeft, faClock, faMapMarkerAlt, faCommentAlt} from '@fortawesome/free-solid-svg-icons';

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
  eventID: string;
  newEventMode: boolean;
  subscribtionEvent: Subscription;
  subscribtionEventPresences: Subscription;
  subscribtionPlayers: Subscription;
  inbetweenDate: Date;
  precenses: Presence[] = [];
  players: Player[];

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

  presence: Presence;
  oldPresence: Presence;



  constructor(private route: ActivatedRoute,
    private dbService: DbService,
    private playerDbService: PlayerDbService,
    private router: RouterService) { 

    this.eventID = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.event = new Event();
    this.presence = new Presence;
    this.oldPresence = new Presence;



    if(this.eventID === 'newevent') {

      this.newEventMode = true;

    } else {

      this.newEventMode = false;



      this.subscribtionEvent = this.dbService.getEvent(this.eventID).subscribe(x => this.processEvent(x));

      this.subscribtionEventPresences = this.dbService.getEventPrecenses(this.eventID)
      .subscribe(y => this.processEventPresences(y));

      this.subscribtionPlayers = this.playerDbService.currentPlayers.subscribe(z => this.processPlayers(z));


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
  }

  submitForm() {
    if(this.eventID === 'newevent') {
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
    this.dbService.updateEvent(this.eventID,this.event).then(() => this.router.proceedToEvents());

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

  }

  processEventPresences(y) {
    this.precenses = y;
    this.createPresencesList();


  }

  processPlayers(z){
    this.players = z;
    this.createPresencesList();
  }

  createPresencesList() {
    let index = 0;
    let indexx = 0;

    for (index = 0; index < this.players.length; index++) {
      this.players[index].presence = null;
      for (indexx = 0; indexx < this.precenses.length; indexx++) {
        if (this.players[index].id === this.precenses[indexx].id) {
          this.players[index].presence = this.precenses[indexx].presence;
        }
      }
  }

  }

  changePresence(oldPresence, newPresence, playerID ) {

    this.presence.presence = newPresence;
    this.oldPresence.presence = oldPresence;

    this.dbService.setEventPresence(this.eventID, playerID ,this.presence, this.oldPresence);

    let index = 0;

    for (index = 0; index < this.players.length; index++) {
      if (this.players[index].id === playerID) {
        this.players[index].presence = this.presence.presence;
    }
  }


  }


  editEvent() {
    this.newEventMode = true;
  }



}

