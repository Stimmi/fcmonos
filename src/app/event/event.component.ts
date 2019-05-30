import { Component, OnInit, Input } from '@angular/core';

export class Event {
  public name:string;

  constructor (name: string) {
    this.name = name;
  }


}

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit() {

  }

}
