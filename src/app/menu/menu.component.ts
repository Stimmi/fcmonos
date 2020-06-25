import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {


  teamName;
  currentPlayer;

  subscriptionAuth: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.subscriptionAuth = this.auth.currentAuth.subscribe(x => this.processAuth(x));


  }

  ngOnDestroy() {

    if (this.subscriptionAuth) {
      this.subscriptionAuth.unsubscribe();
    }    

  }

  processAuth(x) {

    switch(x) {
      case "default": break;
      case "session": this.loadData() ; break;
      default: break;
    }



  }

  loadData() {
    this.teamName = this.auth.getTeamName();
    this.currentPlayer = this.auth.getCurrentPlayerName();
  }

  logOut() {
    this.auth.logOut();
  }

}
