import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class PlayerDbService {
    playerName: string;
    private playerSource = new BehaviorSubject([]);
    currentPlayers = this.playerSource.asObservable();




  constructor(private db: AngularFirestore) {

    this.getPlayers();

   }

   getPlayers() {

    this.db.collection('fcmonos').doc('players').collection('players').valueChanges({ idField: 'id' })
    .subscribe(players => this.changePlayers(players));


   }



  changePlayers(message: any) {

    this.playerSource.next(message)
  }



}
