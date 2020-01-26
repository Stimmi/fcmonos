import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
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
  currentTeam: any;
  private teamId: string;

  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private eventDbService: EventDbService,
    private playerDbService: PlayerDbService) {

      afAuth.auth.onAuthStateChanged((auth) => this.processAuth(auth));
      
  }

      createPlayerClassicMethod(teamId, email, password) {

        this.setTeamId(teamId);

        return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then(() => this.afAuth.auth.currentUser.updateProfile({displayName: teamId}));
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
        if (this.authJSON.displayName) {
          this.setTeamId(this.authJSON.displayName)
        }
        this.db.getTeam(this.getTeamId()).subscribe(z => this.processTeam(z));

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

      getCurrentPlayerName() {
        return this.currentPlayer.name;
      }

      getMailAdress() {
        return this.authJSON.email;
      }

      setTeamId(teamId) {
        this.teamId = teamId;
      }


      getTeamId() {
        return this.teamId;
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


}