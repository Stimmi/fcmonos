import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

export class DbService {
    playerName: string;
    private playerSource = new BehaviorSubject('default');
    currentPlayers = this.playerSource.asObservable();

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

    this.upperCaser(player.name);


    return this.db.collection("fcmonos").doc("players").collection("players")
    .doc(this.playerName.toUpperCase()).set(Object.assign({},player));

  }
  upperCaser(playerName) {
    this.playerName = playerName;
    this.playerName.toUpperCase();
  }

  getPlayer(uid){


    return this.db.collection('fcmonos').doc('players').collection('players').doc(uid).get();

   }

  changeTeam(message: any) {

    this.teamSource.next(message)
  }

}


