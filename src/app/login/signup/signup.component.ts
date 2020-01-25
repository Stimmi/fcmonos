import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password: string;
  passwordConf: string;
  mail: string;
  errorMessage: string;
  subscriptionAuth: Subscription;
  private teamId: string;
  private teamName: string;


  


  constructor(private authService: AuthService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private db: DbService) {

      this.teamId = this.route.snapshot.paramMap.get('id');


   }

  ngOnInit() {

    this.subscriptionAuth = this.authService.currentAuth.subscribe(message => this.checkAuth(message));

    this.db.getTeam(this.teamId).subscribe(x  => this.processTeam(x));


  }


  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();

  }

  processTeam(x) {

    console.log(x);

    this.teamName = x.name;


  }


  onSubmit() {

    if (this.password === this.passwordConf) {

      
    this.authService.createPlayerClassicMethod(this.mail,this.password).then(() => this.proceedToLinkPlayer()).catch(
      error => this.errorMessage = error);

    } else {

      this.errorMessage = 'Something went wrong, please check if your data is correct.'

    }
    console.log(this.mail + '  ' + this.password);

  }


  proceedToDashboard() {

-    this.routerService.proceedToDashboard();
    

  }

  proceedToSignIn() {
    this.routerService.proceedToLogin();

  }

  proceedToLinkPlayer() {

    this.routerService.proceedToLinkPlayer();

  }

  
  checkAuth(message) {

    console.log('Check auth in signup')

    console.log(message);

    if (message === 'default') {

      // Wacht de onStateChanged heeft nog geen resultaat


    } else if (message === null) {

      // Geen sessie gaan naar login pagina

      /*this.router.navigate(['/login']);*/

    } else {

      // auth sessie binnen
      this.routerService.proceedToDashboard();

    }
  }


}
