import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Player } from '../players/players.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<Player>;
  authState = null;
  authenticated: boolean;
  private authSource = new BehaviorSubject('default message');
  currentAuth = this.authSource.asObservable();





  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

      afAuth.auth.onAuthStateChanged((auth) => this.changeAuth(auth));
      
      
    }

      createPlayerClassicMethod(email, password) {

        return this.afAuth.auth.createUserWithEmailAndPassword(email,password);


      }

      login(email2, password2) {

        return this.afAuth.auth.signInWithEmailAndPassword(email2, password2);


      }

      logOut() {

        return this.afAuth.auth.signOut();


      }

      changeAuth(message: any) {
        this.authSource.next(message)
      }


      /*authenticated(): boolean {
        return this.authState !== null;
      }
      
      
      // Returns current user
      currentUser(): any {
        return this.authenticated ? this.authState.auth : null;
      }
      
      // Returns current user UID
      currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
      }*/

}