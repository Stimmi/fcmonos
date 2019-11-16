import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

export class PlayerDbService {
    playerName: string;
    private playerSource = new BehaviorSubject('default');
    currentPlayers = this.playerSource.asObservable();




  constructor(private db: AngularFirestore) {

    this.getPlayers();

   }

   getPlayers() {

    this.db.collection('fcmonos').doc('players').collection('players').valueChanges()
    .subscribe(players => this.changePlayers(players));


   }

   getPlayer(uid){


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
  }

  changePlayers(message: any) {

    this.playerSource.next(message)
  }



}
