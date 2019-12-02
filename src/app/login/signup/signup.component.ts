import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password: String;
  passwordConf: String;
  mail: String;
  errorMessage: String;
  subscriptionAuth: Subscription;

  


  constructor(private authService: AuthService,
    private routerService: RouterService) {


   }

  ngOnInit() {

    this.subscriptionAuth = this.authService.currentAuth.subscribe(message => this.checkAuth(message));



  }

  ngOnDestroy() {

    this.subscriptionAuth.unsubscribe();

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
