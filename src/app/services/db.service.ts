import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable()

//Service for single DB action, without creating Observables

export class DbService {
    playerName: string;
    timestamp = firebase.firestore.FieldValue.serverTimestamp();
    teamId: string;


  constructor(private db: AngularFirestore) {

   }

   /*TEAM*/
   getTeam() {

    return this.db.doc(`fcmonos/${this.teamId}`).valueChanges();

   }

   getTeamWithId(id: string) {

    return this.db.doc(`fcmonos/${id}`).valueChanges();

   }

   getTeams() {
    return this.db.collection("fcmonos").valueChanges({ idField: 'id' });
   }

   addTeam(team) {
    return this.db.collection("fcmonos").add(Object.assign({},team));
   }

   setTeamId(id: string) {
    this.teamId = id;
   }

   /*PLAYERS */
    addPlayer(player){
    return this.db.collection(`fcmonos/${this.teamId}/players`)
    .add(Object.assign({}, player));
  }


  updatePlayer(id: string, player) {
    return this.db.doc(`fcmonos/${this.teamId}/players/${id}`).set(Object.assign({},player))
  }

  setLastActive(id: string) {
    return this.db.doc(`fcmonos/${this.teamId}/players/${id}/details/details`).set({
      lastActive: this.timestamp});
  }

  getLastActive(id: string) {
    return this.db.doc(`fcmonos/${this.teamId}/players/${id}/details/details`).valueChanges();
  }


  getPlayerByUid(uid: string){

    return this.db.collection("fcmonos").doc(this.teamId)
    .collection('players', ref => ref.where('uid', '==', uid).limit(1)).valueChanges({ idField: 'id' });

  }

  getPlayerById(id) {
    return this.db.doc(`fcmonos/${this.teamId}/players/${id}`).valueChanges();
  }


  linkPlayerAndAuth(id: string,uid: string,email: string) {

   return this.db.doc(`fcmonos/${this.teamId}/players/${id}`).update({uid: uid, email: email});
  }

  deletePlayer(id: string) {

    return this.db.doc(`fcmonos/${this.teamId}/players/${id}`).delete();
  }

  /*EVENTS */

  addEvent(eventTwo) {
    return this.db.collection(`fcmonos/${this.teamId}/events`).add(Object.assign({},eventTwo));
  }

  updateEvent(eventId:string, event) {
    return this.db.doc(`fcmonos/${this.teamId}/events/${eventId}`).set(Object.assign({},event));
  }

  getEvent(eventId:string) {
    return this.db.doc(`fcmonos/${this.teamId}/events/${eventId}`).valueChanges();
  }

  deleteEvent(id) {

    return this.db.doc(`fcmonos/${this.teamId}/events/${id}`).delete();
  }


  /* PRESENCES */
  getEventPrecenses(eventId2) {

    return this.db.collection(`fcmonos/${this.teamId}/events/${eventId2}/presences`).valueChanges({ idField: 'id' });
  }

  getEventPrecensesPlayer(playerId:string) {

    return this.db.collection(`fcmonos/${this.teamId}/players/${playerId}/presences`).valueChanges({ idField: 'id' });
  }

  setEventPresence(eventId:string,playerId:string,eventPresence) {
  
    this.db.doc(`fcmonos/${this.teamId}/players/${playerId}/presences/${eventId}`).set(Object.assign({},eventPresence));

    return this.db.doc(`fcmonos/${this.teamId}/events/${eventId}/presences/${playerId}`).set(Object.assign({},eventPresence));
  
  }

  /* CHAT */
  getChatMessages(eventId:string) {
    return this.db.doc(`fcmonos/${this.teamId}/events/${eventId}`).collection('chat', message => {
      return message.orderBy('timestamp').limit(100)}).valueChanges();
  }

  addChatMessage(eventId,playerId, message) {
    this.db.collection(`fcmonos/${this.teamId}/events/${eventId}/chat`).add({playerId : playerId, content : message, timestamp: this.timestamp});
  }


}


