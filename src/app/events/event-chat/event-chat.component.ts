import { Component, OnInit, OnDestroy, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { PlayerDbService } from '../../services/playerDbService';
import { Player } from '../../players/players.component';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe', {static:false}) private myScrollContainer: ElementRef;

  subscribtionAuth: Subscription;
  subscriptionPlayers: Subscription;
  players: Player[];

  messages;
  message: string = '';
  currentPlayerId : string;


  @Input('eventId') eventID : string;


  constructor(private auth: AuthService,
    private dbService: DbService,
    private playerDb: PlayerDbService) { }

  ngOnInit() {

    this.subscribtionAuth = this.auth.currentAuth.subscribe(a => this.processAuth(a));
    this.subscriptionPlayers = this.playerDb.currentPlayers.subscribe(x => this.players = x);

  }

  ngOnDestroy() {
    if(this.subscribtionAuth) {
      this.subscribtionAuth.unsubscribe();
    }
    if(this.subscriptionPlayers) {
      this.subscriptionPlayers.unsubscribe();
    }
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  processAuth(a) {
    switch(a) {
      case "session": this.loadData() ; break;
    }
  }

  loadData() {
    this.dbService.getChatMessages(this.eventID).subscribe(x => this.loadChat(x));
    this.currentPlayerId = this.auth.getCurrentPlayerId();
  }

  loadChat(x) {

    this.messages = x;
    this.messages = this.messages.filter(a => a.timestamp);

    let index;
    let indexx;

    this.scrollToBottom();

    for (index = 0; index < this.messages.length; index++) {

      this.messages[index].timestamp = this.messages[index].timestamp.seconds*1000;

      if(this.currentPlayerId == this.messages[index].playerId) {
        this.messages[index].currentPlayer = true;
      }


      for (indexx = 0; indexx < this.players.length; indexx++) {

        if (this.messages[index].playerId == this.players[indexx].id) {
          this.messages[index].playerName = this.players[indexx].name;

        }
      }
    }
   
  }

  sendMessage() {
    /*Add message to the db. Is it necessary to add message already in local variable? */

    if(this.message !== '') {
      this.dbService.addChatMessage(this.eventID,this.currentPlayerId, this.message)
      this.message = '';
    }

  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }


}
