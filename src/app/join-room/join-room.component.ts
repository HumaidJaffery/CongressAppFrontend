import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  
  roomKey: any;
  showErrorMsg = false;

  submit(){
    if(this.roomKey.toString().length == 6){
      this.router.navigate(['room/' + this.roomKey]);
      return;
    }
    this.showErrorMsg = true;
  }

  keyup() {
    if(this.roomKey.toString().length > 6){
      this.showErrorMsg = true;
      this.roomKey = parseInt(this.roomKey.toString().slice(0, 6)); 
      console.log();
      console.log(this.roomKey)
    } else {
      this.showErrorMsg = false;
    }
  }
}
