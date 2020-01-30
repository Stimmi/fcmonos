import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {


  constructor(private router: Router,
    private zone: NgZone) {
 
  }


  proceedToLogin() {
    this.zone.run(() => this.router.navigate(['/login']));

  }

  proceedToSignUp() {
    this.zone.run(() => this.router.navigate(['/signup']));

  }


  proceedToLinkPlayer() {
    this.zone.run(() => this.router.navigate(['/linkplayer']));
  }

  proceedToPlayers() {
    this.zone.run(() => this.router.navigate(['/players']));
  }

  proceedToDashboard() {
    this.zone.run(() => this.router.navigate(['/dashboard']));
  }

  proceedToNewPlayer() {
    this.zone.run(() => this.router.navigate(['/players/newplayer']));
  }

  proceedToEvents() {
    this.zone.run(() => this.router.navigate(['/events']));
  }

  /*proceedToEventDetails() {
    this.zone.run(() => this.router.navigate(['/events/:new']));
  }*/

  proceedToEventDetails(event: string) {
    this.zone.run(() => this.router.navigate(['/events/' + event]));
  }

  proceedToNewTeam() {
    this.zone.run(() => this.router.navigate(['/newteam']));
  }

}