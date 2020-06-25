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
  currentTeam: any;
  private teamId: string;
  private orginalTeamId: string;
  private displayName: string;
  subscriptionPlayer: Subscription;


  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private eventDbService: EventDbService,
    private playerDbService: PlayerDbService) {

      afAuth.auth.onAuthStateChanged((auth) => this.processAuth(auth));
      
  }

      createPlayerClassicMethod(teamId, email : string, password) {

        this.setTeamId(teamId);

        return this.afAuth.auth.createUserWithEmailAndPassword(email.trim(),password)
        .then(() => this.setTeamIdDisplayName(teamId));
      }

      setTeamIdDisplayName(teamIdTwo) {

        if(this.afAuth.auth.currentUser.displayName != null || this.afAuth.auth.currentUser.displayName) {
          this.orginalTeamId = this.afAuth.auth.currentUser.displayName;
        } else  {
          this.orginalTeamId = '';
        }

        this.afAuth.auth.currentUser.updateProfile({displayName:
          this.orginalTeamId
          + teamIdTwo + '&&&'}).then(() => this.setDisplayName(this.orginalTeamId+teamIdTwo+'&&&'));

      }

      changeDefaultTeam(teamIdThree) {

        this.orginalTeamId = null;
        this.orginalTeamId = this.getDisplayName();
        let pos = this.orginalTeamId.indexOf(teamIdThree);
        this.orginalTeamId = this.orginalTeamId.substr(pos,23) + this.orginalTeamId.replace(teamIdThree+'&&&','');
        this.setDisplayName(this.orginalTeamId);
        this.afAuth.auth.currentUser.updateProfile({displayName:
          this.orginalTeamId});

      }

      login(email2: string, password2) {

        return this.afAuth.auth.signInWithEmailAndPassword(email2.trim(), password2).finally(
          () => this.afAuth.auth.setPersistence('local'));

      }

      logOut() {

        return this.afAuth.auth.signOut().then(x => this.currentPlayer = null);

      }

      processAuth(message: any) {
        
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
        this.setDisplayName(this.authJSON.displayName)
        if (this.authJSON.displayName) {
          this.setTeamId(this.authJSON.displayName.toString().substr(0,20));
          this.setDisplayName(this.authJSON.displayName);
        }
        this.loadTeamData();

      }

      loadTeamData() {
        this.db.getTeam(this.getTeamId()).subscribe(z => this.processTeam(z));
      }

      processTeam(z) {
      
        this.currentTeam = z;
        this.subscriptionPlayer = this.db.getPlayerByUid(this.getTeamId(),this.uid).subscribe(x => this.checkPlayer(x));
        this.eventDbService.getEvents(this.getTeamId());
        this.playerDbService.getPlayers(this.getTeamId());

      }

      checkPlayer(x) {

        this.currentPlayer = null;


        if (x[0]) {
          this.currentPlayer = x[0];
        }

        if (this.currentPlayer) {
          this.changeAuth('session');
          this.subscriptionPlayer.unsubscribe();
          this.db.setLastActive(this.teamId,this.currentPlayer.id);


        } else {
          this.changeAuth('linkPlayer')
        }

      }

      changeAuth(message: any) {

        this.authSource.next(message);
        
      }

      getUid(){
        return this.uid;
      } 

      getAdministrator(){

        return this.currentPlayer.administrator;

      } 


      getCurrentPlayer() {
        return this.currentPlayer;
      }

      getCurrentPlayerName() {
        return this.currentPlayer.name;
      }

      getCurrentPlayerId() {
        return this.currentPlayer.id;
      }

      getMailAdress() {
        return this.authJSON.email;
      }

      setTeamId(teamId) {
        this.teamId = teamId;
      }

      setDisplayName(setDisplayName) {
        this.displayName = setDisplayName;
      }

      getDisplayName(){
        return this.displayName;
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