import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventName: string;


  constructor(private route: ActivatedRoute) { 

    this.eventName = this.route.snapshot.paramMap.get('name');

  }

  ngOnInit() {
  }

}
