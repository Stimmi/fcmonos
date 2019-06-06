import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent implements OnInit {

  @Input() event: Event;


  constructor() { }

  ngOnInit() {
  }

}
