import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../players.component';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  playerName: string;
  updateMode: boolean = false;
  model = new Player("Ronaldo", "18");
  foutmelding:string;

  constructor(private route: ActivatedRoute,
     private router: Router,
     private dbService: DbService) {



   }

  ngOnInit() {

    if (this.router.url ==="/players/newplayer") {
      this.updateMode= true;


    } else {
      this.playerName = this.route.snapshot.paramMap.get('name');
      this.updateMode= false;

      //Niet afgewerkt!!!!
      this.dbService.getPlayer(this.playerName).subscribe(x => this.model.name = x.data().name);

    }


  }

  onSubmit() {

    console.log("formsubmitted")
    console.log(this.model);

    this.dbService.getPlayer(this.model.name).subscribe(x => {
      if(x.exists){
        this.foutmelding = "bestaat reeds";
      } else {
        this.dbService.addPlayer(this.model).then((x) => this.updateMode = !this.updateMode);
      }
    });


  }



}
