import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class EventDbService {

    playerName: string;
    private eventSource = new BehaviorSubject([]);
    currentEvents = this.eventSource.asObservable();




  constructor(private db: AngularFirestore) {

    /*this.getEvents()*/

   }

   getEvents(teamId) {

    this.db.collection("fcmonos").doc(teamId).collection('events').valueChanges({ idField: 'id' })
    .subscribe(events => this.changeEvents(events));


   }


   changeEvents(message: any) {

    this.eventSource.next(message)
  }


}
