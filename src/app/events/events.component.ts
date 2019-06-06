import { Component, OnInit, Input } from '@angular/core';

export class Event {
  public name:string;

  constructor (name: string) {
    this.name = name;
  }


}

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit() {

  }

}
