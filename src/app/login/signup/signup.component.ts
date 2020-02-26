import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Team } from 'src/app/tipstricks/tipstricks.component';



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
  public team: Team;
  private teamId: string;
  public newAuth: boolean = true;


  


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
      case 'linkPlayer': this.routerService.proceedToLinkPlayer(); break;


    }

  }

  processTeam(x) {
    this.team= x

  }

  fillOutForm() {

    console.log(this.authService.getDisplayName());
    console.log(this.teamId);


    if(this.authService.getDisplayName().includes(this.teamId)) {
      this.authService.setTeamId(this.teamId);
      this.authService.loadTeamData();
      this.routerService.proceedToDashboard();
    }

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

    this.routerService.proceedToDashboard();

  }

  proceedToSignIn() {
    this.routerService.proceedToLogin();

  }

  proceedToLinkPlayer() {

    this.routerService.proceedToLinkPlayer();

  }

  

}
