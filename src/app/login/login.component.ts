import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from '../services/db.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  password: string;
  mail: string;
  errorMessage: string;
  subscriptionAuth: Subscription;
  team: string;

  


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private routerService: RouterService,
    private dbService: DbService) {


   }

  ngOnInit() {

    this.team = this.route.snapshot.paramMap.get('team');

    this.dbService.changeTeam(this.team);

    this.subscriptionAuth = this.authService.currentAuth.subscribe(message => this.checkAuth(message));

  }

  ngOnDestroy() {

    if (this.subscriptionAuth) {

      this.subscriptionAuth.unsubscribe();
    }


  }


  checkAuth(message) {

    switch (message) {
      case 'linkPlayer': this.routerService.proceedToLinkPlayer();
        break;
      case 'session': this.routerService.proceedToDashboard();
        break;
      default:
        break;
    }

  }



  onSubmitLogin() {

    this.authService.login(this.mail,this.password).then(() => this.proceedToDashboard()).catch(
      error => this.errorMessage = error);

      
  }

  proceedToDashboard() {

    this.routerService.proceedToDashboard();

  }



}
