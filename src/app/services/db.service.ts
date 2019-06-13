import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()

export class DbService {
    items: Observable<any[]>;
    playerName: string;



  constructor(private db: AngularFirestore) {



   }

   getPlayers() {
    this.items = this.db.collection('fcmonos').doc('players').collection('players').valueChanges();

  
    return this.items;

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

}


