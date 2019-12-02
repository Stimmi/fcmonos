import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../services/router.service';
import { EventDbService } from '../services/playerDb.service copy';

export class Event {
  public name:string;
  public date: Date;
  public description: string;
  public location: string;

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

    console.log(x);

  }

}
