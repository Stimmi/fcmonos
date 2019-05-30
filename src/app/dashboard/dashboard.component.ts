import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Event[];

  constructor() {

    this.events = [new Event("Event1"), new Event("Event2")];


   }

  ngOnInit() {
  }

}
