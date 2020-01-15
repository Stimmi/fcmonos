import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()

//Service for single DB action, without creating Observables

export class DbService {
    playerName: string;


    private teamSource = new BehaviorSubject('default');
    currentTeam = this.teamSource.asObservable();



  constructor(private db: AngularFirestore) {



   }


  addPlayer(player){

    return this.db.collection("fcmonos").doc("players").collection("players")
    .add(Object.assign({},player));

  }

  updatePlayer(id, player) {
    return this.db.collection("fcmonos").doc("players").collection("players").doc(id).set(Object.assign({},player))
  }


  getPlayerByUid(uid){

    console.log('Get player');
    console.log(uid);

    return this.db.collection('fcmonos').doc('players')
    .collection('players', ref => ref.where('uid', '==', uid).limit(1)).valueChanges({ idField: 'id' });

  }

  getPlayerById(id) {
    return this.db.collection('fcmonos').doc('players').collection('players').doc(id).valueChanges();
  }


  linkPlayerAndAuth(id,uid,email) {

    console.log('Db service link player auth');

   return this.db.collection('fcmonos').doc('players').collection('players')
   .doc(id).update({uid: uid, email: email});

    
  }

  addEvent(event) {

    return this.db.collection("fcmonos").doc("events").collection("events").add(Object.assign({},event));


  }

  updateEvent(eventID,event) {
    return this.db.collection("fcmonos").doc("events").collection("events")
    .doc(eventID).set(Object.assign({},event));
  }

  getEvent(eventID) {

    return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventID).valueChanges();

  }

  getEventPrecenses(eventId2) {

    return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId2).collection('presences').valueChanges({ idField: 'id' });
  }

  getEventPrecensesPlayer(playerId) {

    return this.db.collection('fcmonos').doc('players')
    .collection('players').doc(playerId).collection('presences').valueChanges({ idField: 'id' });
  }

  setEventPresence(eventId3,playerId,eventPresence, oldPresence) {

    this.changeEventTotals(eventId3, eventPresence, oldPresence);

    this.db.collection('fcmonos').doc('players')
    .collection('players').doc(playerId).collection('presences').doc(eventId3).set(Object.assign({},eventPresence));

    return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).collection('presences').doc(playerId).set(Object.assign({},eventPresence));
  
  
  }

  changeEventTotals(eventId3, eventPresence, oldPresence) {

    if (oldPresence.presence === 'YES' && eventPresence.presence === 'NO') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(-1), 
    amountNo: firebase.firestore.FieldValue.increment(1)});
    }
    if (oldPresence.presence === 'YES' && eventPresence.presence === 'MAYBE') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(-1)});
    }
    if (oldPresence.presence === 'NO' && eventPresence.presence === 'YES') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(1), 
    amountNo: firebase.firestore.FieldValue.increment(-1)});
    }
    if (oldPresence.presence === 'NO' && eventPresence.presence === 'MAYBE') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountNo: firebase.firestore.FieldValue.increment(-1)});
    }
    if (oldPresence.presence === 'MAYBE' && eventPresence.presence === 'YES') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(1)});
    }
    if (oldPresence.presence === 'MAYBE' && eventPresence.presence === 'NO') {

      return this.db.collection('fcmonos').doc('events')
    .collection('events').doc(eventId3).update({amountNo: firebase.firestore.FieldValue.increment(1)});
    }





  }

  changeTeam(message: any) {

    this.teamSource.next(message)
  }

}


