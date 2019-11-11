import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

export class DbService {
    items: Observable<any[]>;
    playerName: string;
    private playerSource = new BehaviorSubject('default message');
    currentPlayers = this.playerSource.asObservable();



  constructor(private db: AngularFirestore) {



   }

   getPlayers() {

    this.db.collection('fcmonos').doc('players').collection('players').valueChanges()
    .subscribe(players => this.changePlayers(players));


   }

   getPlayer(playerName){

    this.upperCaser(playerName);

    return this.db.collection('fcmonos').doc('players').collection('players').doc(playerName).get();

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


