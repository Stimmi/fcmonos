import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class EventDbService {

    playerName: string;
    private eventSource = new BehaviorSubject([]);
    currentEvents = this.eventSource.asObservable();




  constructor(private db: AngularFirestore) {

    this.getEvents();

   }

   getEvents() {

    this.db.collection('fcmonos').doc('events').collection('events').valueChanges({ idField: 'id' })
    .subscribe(events => this.changeEvents(events));


   }


   changeEvents(message: any) {

    this.eventSource.next(message)
  }


   /*getPlayer(uid){


    return this.db.collection('fcmonos').doc('players').collection('players').doc(uid).get();

   }


  addPlayer(player){

    this.upperCaser(player.name);


    return this.db.collection("fcmonos").doc("players").collection("players")
    .doc(this.playerName.toUpperCase()).set(Object.assign({},player));

  }



  upperCaser(playerName) {
    this.playerName = playerName;
    this.playerName.toUpperCase();
  }*/




}
