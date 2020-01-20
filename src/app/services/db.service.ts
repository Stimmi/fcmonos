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

   getTeam() {

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').valueChanges();

   }


  addPlayer(player){

    this.updateTeamInfo();

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection("players")
    .add(Object.assign({},player));


  }

  updateTeamInfo(){

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').update({
      amountPlayers: firebase.firestore.FieldValue.increment(1)});

  }

  updatePlayer(id, player) {
    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection("players").doc(id).set(Object.assign({},player))
  }


  getPlayerByUid(uid){

    console.log('Get player');
    console.log(uid);

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('players', ref => ref.where('uid', '==', uid).limit(1)).valueChanges({ idField: 'id' });

  }

  getPlayerById(id) {
    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection('players').doc(id).valueChanges();
  }


  linkPlayerAndAuth(id,uid,email) {

    console.log('Db service link player auth');

   return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection('players')
   .doc(id).update({uid: uid, email: email});

    
  }

  addEvent(event) {

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection("events").add(Object.assign({},event));


  }

  updateEvent(eventID,event) {
    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s').collection("events")
    .doc(eventID).set(Object.assign({},event));
  }

  getEvent(eventID) {

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('events').doc(eventID).valueChanges();

  }

  getEventPrecenses(eventId2) {

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('events').doc(eventId2).collection('presences').valueChanges({ idField: 'id' });
  }

  getEventPrecensesPlayer(playerId) {

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('players').doc(playerId).collection('presences').valueChanges({ idField: 'id' });
  }

  setEventPresence(eventId3,playerId,eventPresence, oldPresence) {

    this.changeEventTotals(eventId3, eventPresence, oldPresence);

    this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('players').doc(playerId).collection('presences').doc(eventId3).set(Object.assign({},eventPresence));

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('events').doc(eventId3).collection('presences').doc(playerId).set(Object.assign({},eventPresence));
  
  
  }

  changeEventTotals(eventId3, eventPresence, oldPresence) {

    let incrementYes = 0;
    let incrementNo = 0;
    let incrementMaybe = 0;

    switch (oldPresence.presence) {
      case 'YES': incrementYes = -1;
        break;
      case 'NO': incrementNo = -1;
        break;
      case 'MAYBE': incrementMaybe = -1;
        break;
    }
    switch (eventPresence.presence) {
      case 'YES': incrementYes = 1;
        break;
      case 'NO': incrementNo = 1;
        break;
      case 'MAYBE': incrementMaybe = 1;
        break;
    }

    return this.db.collection("fcmonos").doc('IqrnITdri7beif3d5c4s')
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(incrementYes), 
    amountNo: firebase.firestore.FieldValue.increment(incrementNo),
    amountMaybe: firebase.firestore.FieldValue.increment(incrementMaybe)});

  }

  changeTeam(message: any) {

    this.teamSource.next(message)
  }

}


