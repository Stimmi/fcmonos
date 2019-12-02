import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean;
  private authSource = new BehaviorSubject('default');
  currentAuth = this.authSource.asObservable();

  uid: String;
  authJSON: any;
  playerJSON: any;
  currentPlayer: any;



  constructor(private afAuth: AngularFireAuth,
    private db: DbService) {

      afAuth.auth.onAuthStateChanged((auth) => this.processAuth(auth));
      
    }

      createPlayerClassicMethod(email, password) {


        return this.afAuth.auth.createUserWithEmailAndPassword(email,password);


      }

      login(email2, password2) {

        return this.afAuth.auth.signInWithEmailAndPassword(email2, password2).finally(
          () => this.afAuth.auth.setPersistence('local'));


      }

      logOut() {

        return this.afAuth.auth.signOut().then(x => this.playerJSON = null);


      }

      processAuth(message: any) {
        console.log('process Auth:');
        console.log(message);

        if (message === 'default') {

          /*this.changeAuth(message)*/

        } else if(message ==='linkPlayer') {

          /*this.routerService.proceedToLinkPlayer();*/

        } else if (message === 'session') {

          console.log('process Auth message = session');


        }else if (message) {

          /*this.changeAuth(message);*/
          this.authJSON = JSON.parse(JSON.stringify(message));
          this.uid = this.authJSON.uid;
          this.db.getPlayer(this.uid).subscribe(x => this.checkPlayer(x));


        } else {

          this.changeAuth(null)

        }

      }

      checkPlayer(x) {

        console.log('Check player function in auth');
        console.log(x);

        if (x[0]) {
          this.playerJSON = x[0];
        }

        console.log('Player opgeladen in auth');
        console.log(this.playerJSON);


        if (this.playerJSON) {

          this.changeAuth('session');
          this.setCurrentPlayer(this.playerJSON);

        } else {

          this.changeAuth('linkPlayer')

          /*this.routerService.proceedToLinkPlayer();*/
        }

      }

      changeAuth(message: any) {

        console.log('Auth Service, change auth to:');
        console.log(message);
        this.authSource.next(message)
        
      }

      getUid(){
        return this.uid;
      } 

      setCurrentPlayer(player) {


        this.currentPlayer = player;

      }

      getCurrentPlayer() {
        return this.playerJSON;
      }

      getMailAdress() {
        return this.authJSON.email;
      }



}