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
  private newAuth: boolean = true;


  


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

  checkAuth(message) {

    switch (message) {
      case 'default': break;
      case 'session': this.fillOutForm(); break;

    }

  }

  processTeam(x) {
    this.teamName = x.name

  }

  fillOutForm() {

    this.mail = this.authService.getMailAdress();
    this.newAuth = false;

  }


  onSubmit() {

    if (this.password === this.passwordConf) {

      
    this.authService.createPlayerClassicMethod(this.teamId,this.mail,this.password)
    .then(() => this.proceedToLinkPlayer()).catch(
      error => this.errorMessage = error);

    } else {

      this.errorMessage = 'Something went wrong, please check if your data is correct.'

    }

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

  

}
