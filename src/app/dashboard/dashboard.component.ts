import { Component, OnInit } from '@angular/core';
import { Event } from '../events/events.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Event[];



  constructor() {



   }



  ngOnInit() {

    this.events = [new Event(), new Event()];

  }

}
