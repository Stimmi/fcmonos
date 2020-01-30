import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../players.component';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  @Input() player: Player;
  @Input() update: boolean;
  @Input() linkPlayer: boolean;
  @Input() admin : boolean;


  playerName: string;
  uid: String;
  errorMessage:string;
  linkPlayerMode: boolean;

  constructor() {

   }

  ngOnInit() {


  }

}
