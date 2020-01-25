import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DbService } from './db.service';
import { EventDbService } from './eventDbService';
import { PlayerDbService } from './playerDbService';


/*import { Player } from '../players/players.component';*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean;
  private authSource = new BehaviorSubject('default');
  currentAuth = this.authSource.asObservable();

  uid: string;
  authJSON: any;
  private currentPlayer: any /*Player = new Player*/;
  subscriptionTeam: Subscription;
  currentTeam: any;

  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private eventDbService: EventDbService,
    private playerDbService: PlayerDbService) {

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

        return this.afAuth.auth.signOut().then(x => this.currentPlayer = null);

      }

      processAuth(message: any) {
        
        console.log('process Auth in Auth');
        console.log(message);

        switch (message) {
          case  "default": break;
          case "linkPlayer": break;
          case "session": break;
          case null: this.changeAuth(null);break;
          case message: this.loadLinkedTeam(message); break;
          default: this.changeAuth(null);

        }
      }

      loadLinkedTeam(authMessage) {
        this.authJSON = JSON.parse(JSON.stringify(authMessage));
        this.uid = this.authJSON.uid;
        this.subscriptionTeam = this.db.getTeam(this.authJSON.displayName).subscribe(z => this.processTeam(z));
      }

      processTeam(z) {
      
        this.currentTeam = z;
        this.db.getPlayerByUid(this.getTeamId(),this.uid).subscribe(x => this.checkPlayer(x));
        this.eventDbService.getEvents(this.getTeamId());
        this.playerDbService.getPlayers(this.getTeamId());

      }

      checkPlayer(x) {

        console.log('Check player function in auth');
        console.log(x);

        if (x[0]) {
          this.currentPlayer = x[0];
        }

        if (this.currentPlayer) {
          this.changeAuth('session');
        } else {
          this.changeAuth('linkPlayer')
        }

      }

      changeAuth(message: any) {

        console.log('Auth Service, change auth to:');
        console.log(message);
        this.authSource.next(message);
        
      }

      getUid(){
        return this.uid;
      } 

      getAdministrator(){

        return this.currentPlayer.administrator;

      } 

      setCurrentPlayer(playerJ: any) {

        this.currentPlayer = playerJ;

      }

      getCurrentPlayer() {
        return this.currentPlayer;
      }

      getMailAdress() {
        return this.authJSON.email;
      }


      setTeamId() {

      }

      getTeamId() {
        return this.afAuth.auth.currentUser.displayName;
      }

      getTeamName() {
        return this.currentTeam.name;
      }

      getAmountPlayers() {

        if (this.currentTeam === undefined) {
          return 0;
        } else {
          return this.currentTeam.amountPlayers;

        }



      }

      updateProfile () {

        console.log(this.afAuth.auth.currentUser);

        this.afAuth.auth.currentUser.updateProfile({displayName: "IqrnITdri7beif3d5c4s"}).then(x => console.log(x));


      }



}