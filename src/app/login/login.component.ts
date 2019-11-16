import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  password: String;
  mail: String;
  errorMessage: String;
  subscriptionAuth: Subscription;
  team: String;

  


  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbService) {


   }

  ngOnInit() {

    this.team = this.route.snapshot.paramMap.get('team');

    this.dbService.changeTeam(this.team);

    this.dbService.currentTeam.subscribe(x => console.log(x));


    this.subscriptionAuth = this.authService.currentAuth.subscribe(message => this.checkAuth(message));



  }

  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();

  }



  onSubmitLogin() {

    console.log("submit")

    console.log(this.mail + '' + this.password);


    this.authService.login(this.mail,this.password).then(() => this.proceedToDashboard()).catch(
      error => this.errorMessage = error);

      

  }

  proceedToDashboard() {

    this.router.navigate(['/Dashboard']);

  }

  proceedtoSignUp() {
    this.router.navigate(['/signup']);

  }

  checkAuth(message) {

    console.log('Check auth in login')

    console.log(message);

    if (message === 'default') {

      // Wacht de onStateChanged heeft nog geen resultaat


    } else if (message === null) {

      // Geen sessie gaan naar login pagina

      /*this.router.navigate(['/login']);*/

    } else {

      // auth sessie binnen
      this.router.navigate(['/dashboard']);

    }
  }


}
