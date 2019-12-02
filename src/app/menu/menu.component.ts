import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private router: RouterService) { }

  ngOnInit() {
  }

  proceedToPlayers() {
    this.router.proceedToPlayers();
  }



}
