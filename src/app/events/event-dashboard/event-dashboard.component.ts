import { Component, OnInit } from '@angular/core';
import { Event } from '../events.component';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent implements OnInit {

  public event: Event;



  constructor() { }

  ngOnInit() {

    this.event = new Event()

    this.event.name = 'Match ddd'


  }

}
