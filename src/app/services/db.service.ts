import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

//Service for single DB action, without creating Observables

export class DbService {
    playerName: string;


    private teamSource = new BehaviorSubject('default');
    currentTeam = this.teamSource.asObservable();



  constructor(private db: AngularFirestore) {



   }

   /*getPlayers() {

    this.db.collection('fcmonos').doc('players').collection('players').valueChanges()
    .subscribe(players => this.changePlayers(players));


   }




  addPlayer(player){

    this.upperCaser(player.name);


    return this.db.collection("fcmonos").doc("players").collection("players")
    .doc(this.playerName.toUpperCase()).set(Object.assign({},player));

  }



  changePlayers(message: any) {

    this.playerSource.next(message)
  }*/

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
    .collection('players', ref => ref.where('uid', '==', uid).limit(1)).valueChanges();

  }

  getPlayerById(id) {
    return this.db.collection('fcmonos').doc('players').collection('players').doc(id).valueChanges();
  }

  getPlayerByName(name){


    /*return this.db.collection('fcmonos').doc('players').collection('players').doc(uid).get();*/

    console.log('Get player by name');
    console.log(name);

    /*return this.db.collection('fcmonos').doc('players')
    .collection('players').doc(name.toUpperCase()).get();*/

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

  changeTeam(message: any) {

    this.teamSource.next(message)
  }

}


