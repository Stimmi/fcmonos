import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable()

//Service for single DB action, without creating Observables

export class DbService {
    playerName: string;
    timestamp = firebase.firestore.FieldValue.serverTimestamp();


    private teamSource = new BehaviorSubject('default');
    currentTeam = this.teamSource.asObservable();



  constructor(private db: AngularFirestore) {



   }

   getTeam(teamId) {

    return this.db.collection("fcmonos").doc(teamId).valueChanges();

   }

   getTeams() {

     return this.db.collection("fcmonos").valueChanges({ idField: 'id' });


   }

   addTeam(team) {

    return this.db.collection("fcmonos").add(Object.assign({},team));

   }


  addPlayer(teamIdThree,player){


    return this.db.collection("fcmonos").doc(teamIdThree).collection("players")
    .add(Object.assign({},player)).then(() => this.updateTeamInfo(teamIdThree));


  }

  updateTeamInfo(teamIdThree){

    return this.db.collection("fcmonos").doc(teamIdThree).update({
      amountPlayers: firebase.firestore.FieldValue.increment(1)});

  }

  updatePlayer(teamIdSix, id, player) {
    return this.db.collection("fcmonos").doc(teamIdSix).collection("players").doc(id).set(Object.assign({},player))
  }

  setLastActive(teamId, id) {
    /*return this.db.collection("fcmonos").doc(teamId).collection("players").doc(id).update({
      lastActive: this.timestamp});*/
    return this.db.doc(`fcmonos/${teamId}/players/${id}/details/details`).set({
      lastActive: this.timestamp});
  }

  getLastActive(teamId, id) {
    /*return this.db.collection("fcmonos").doc(teamId).collection("players").doc(id).update({
      lastActive: this.timestamp});*/
    return this.db.doc(`fcmonos/${teamId}/players/${id}/details/details`).valueChanges();
  }


  getPlayerByUid(teamIdTwo, uid){

    return this.db.collection("fcmonos").doc(teamIdTwo)
    .collection('players', ref => ref.where('uid', '==', uid).limit(1)).valueChanges({ idField: 'id' });

  }

  getPlayerById(teamIdSeven,id) {
    return this.db.collection("fcmonos").doc(teamIdSeven).collection('players').doc(id).valueChanges();
  }


  linkPlayerAndAuth(teamIdEight, id,uid,email) {

   return this.db.collection("fcmonos").doc(teamIdEight).collection('players')
   .doc(id).update({uid: uid, email: email});

    
  }

  addEvent(teamIdFour, eventTwo) {

    return this.db.collection("fcmonos").doc(teamIdFour).collection("events").add(Object.assign({},eventTwo));


  }

  updateEvent(teamIdNine, eventID,event) {
    return this.db.collection("fcmonos").doc(teamIdNine).collection("events")
    .doc(eventID).set(Object.assign({},event));
  }

  getEvent(teamIdTen,eventID) {

    return this.db.collection("fcmonos").doc(teamIdTen)
    .collection('events').doc(eventID).valueChanges();

  }

  getEventPrecenses(teamIdEleven, eventId2) {

    return this.db.collection("fcmonos").doc(teamIdEleven)
    .collection('events').doc(eventId2).collection('presences').valueChanges({ idField: 'id' });
  }

  getEventPrecensesPlayer(teamIdTwelve,playerId) {

    return this.db.collection("fcmonos").doc(teamIdTwelve)
    .collection('players').doc(playerId).collection('presences').valueChanges({ idField: 'id' });
  }

  setEventPresence(teamIdThirteen, eventId3,playerId,eventPresence, oldPresence) {

    /*this.changeEventTotals(teamIdThirteen,eventId3, eventPresence, oldPresence);*/
    
    this.db.collection("fcmonos").doc(teamIdThirteen)
    .collection('players').doc(playerId).collection('presences').doc(eventId3).set(Object.assign({},eventPresence));

    return this.db.collection("fcmonos").doc(teamIdThirteen).collection('events').doc(eventId3)
    .collection('presences').doc(playerId).set(Object.assign({},eventPresence));
  
  }

  changeEventTotals(teamIdThirteen, eventId3, eventPresence, oldPresence) {

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

    return this.db.collection("fcmonos").doc(teamIdThirteen)
    .collection('events').doc(eventId3).update({amountYes: firebase.firestore.FieldValue.increment(incrementYes), 
    amountNo: firebase.firestore.FieldValue.increment(incrementNo),
    amountMaybe: firebase.firestore.FieldValue.increment(incrementMaybe)});

  }

  getChatMessages(teamID, eventID) {
    return this.db.collection("fcmonos").doc(teamID)
    .collection('events').doc(eventID).collection('chat', message => {
      return message.orderBy('timestamp').limit(100)}).valueChanges();
  }

  addChatMessage(teamID, eventID,playerId, message) {
    this.db.collection("fcmonos").doc(teamID)
    .collection('events').doc(eventID).collection('chat')
    .add({playerId : playerId, content : message, timestamp: this.timestamp});
  }

  changeTeam(message: any) {

    this.teamSource.next(message)
  }



}


