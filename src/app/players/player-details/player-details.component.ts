import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  playerName: string;
  updateMode: boolean = false;

  constructor(private route: ActivatedRoute,
     private router: Router) {


    if (this.router.url ==="/players/newplayer") {
      this.updateMode= true;


    } else {
      this.playerName = this.route.snapshot.paramMap.get('name');
      this.updateMode= false;

    }

   }

  ngOnInit() {


  }

}
