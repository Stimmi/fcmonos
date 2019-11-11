import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: String;
  mail: String;
  errorMessage: String;

  


  constructor(private authService: AuthService,
    private router: Router) {


   }

  ngOnInit() {


  }
  onSubmit() {


    console.log(this.mail + '  ' + this.password);


    this.authService.createPlayerClassicMethod(this.mail,this.password).then().catch(
      error => console.log("CCConsole:" + error)
    );





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




}
