import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../services/router.service';
import { EventDbService } from '../services/eventDbService';

export class Event {
  public name:string;
  public startTime: Date;
  public description: string;
  public location: string;
  public id: string;
  public presence: string;
  public gDate: Date;
  public amountYes: number;
  public amountNo: number;
  public amountMaybe: number;
  public amountUnknown: number;




  constructor () {
  }

  
}

export class Presence {

  public id:string;
  public presence: string;

  constructor () {
  }
}


@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  public subscriptionAuth: Subscription;
  public events: Event[];
  public administrator: boolean = false;
  private inbetweenDate: Date;



  @Input() event: Event;

  constructor(private auth: AuthService,
    private router: RouterService,
    private eventService: EventDbService) { }

  ngOnInit() {
    this.subscriptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x));

  }

  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();

  }

  processAuth(x) {

    switch(x) {
      case "default": break;
      case "session": this.eventService.currentEvents.subscribe(x => this.processEvents(x)); break;
      case "linkPlayer": this.router.proceedToLinkPlayer(); break;
      default: this.router.proceedToLogin();
    }

  }

  processEvents(x){
    this.administrator = this.auth.getAdministrator()
    this.events = x;
    let index = 0;

    for (index = 0; index < this.events.length; index++) {
  
      this.events[index].gDate = this.changeDateField(this.events[index].startTime);
  
    }

  }

  
changeDateField(gDate) {

  return this.inbetweenDate = new Date(gDate.seconds*1000);
  
  }

  addEvent() {
    this.router.proceedToEventDetails('newevent');
  }

}
