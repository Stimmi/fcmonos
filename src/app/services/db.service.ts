import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()

export class DbService {
    items: Observable<any[]>;



  constructor(private db: AngularFirestore) {



   }

   getPlayers() {
    this.items = this.db.collection('fcmonos').doc('players').collection('players').valueChanges();

  
    return this.items;

}


}