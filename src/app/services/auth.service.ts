import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { DbService } from './db.service';
import { Router } from '@angular/router';

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



  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router) {

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

        return this.afAuth.auth.signOut();


      }

      processAuth(message: any) {
        console.log('process Auth:');
        console.log(message);

        if (message === 'default') {

          this.changeAuth(message)

        } else if (message) {

          this.changeAuth(message);
          this.authJSON = JSON.parse(JSON.stringify(message));
          this.uid = this.authJSON.uid;
          this.db.getPlayer(this.uid).subscribe(x => this.checkPlayer(x));


        } else {

          this.changeAuth(null)

        }

      }

      checkPlayer(x) {

        this.playerJSON = x.data();

        if (this.playerJSON) {

          this.changeAuth(this.playerJSON);

        } else {
          this.router.navigate(['/linkplayer']);
        }

      }

      changeAuth(message: any) {

        console.log('Auth Service, change auth');
        console.log(message);
        this.authSource.next(message)
        
      }

}