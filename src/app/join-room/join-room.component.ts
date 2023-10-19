import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  
  constructor(private router: Router) {}
  
  roomKey: any;
  showErrorMsg = false;

  submit(){
    if(this.roomKey.toString().length == 6){
      this.router.navigate(['room/' + this.roomKey]);
      return;
    }
    this.showErrorMsg = true;
    

  }
}
