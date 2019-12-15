import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../events.component';
import { DbService } from 'src/app/services/db.service';
import { RouterService } from 'src/app/services/router.service';
import { Subscription } from 'rxjs';

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
  inbetweenDate: Date;


  constructor(private route: ActivatedRoute,
    private dbService: DbService,
    private router: RouterService) { 

    this.eventID = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.event = new Event();


    if(this.eventID === 'newevent') {

      this.newEventMode = true;

    } else {

      this.newEventMode = false;

      this.subscribtionEvent = this.dbService.getEvent(this.eventID).subscribe(x => this.processEvent(x));



    }

  }

  ngOnDestroy() {
    if(this.subscribtionEvent) {
      this.subscribtionEvent.unsubscribe();
    }
  }

  submitForm() {

    this.event.startTime = new Date();

    this.event.startTime.setFullYear(this.datePicked.year, this.datePicked.month-1, this.datePicked.day);
    this.event.startTime.setHours(this.startTime1);
    this.event.startTime.setMinutes(this.startTime2);

    this.processDateFields();



    this.dbService.addEvent(this.event).then(() => this.router.proceedToEvents());



  }

  updateEvent() {

    this.processDateFields();

    console.log(this.event);
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

    console.log(startTime);

    this.inbetweenDate = new Date(startTime.seconds*1000);

    console.log(this.inbetweenDate);

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

  editEvent() {
    this.newEventMode = true;
  }



}

