import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../Room';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomKey: any = "";
  roomDoesntExist = true;
  roomInfo: any = {};
  
  constructor(private route: ActivatedRoute, private roomService: RoomService, public router: Router ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomKey = params.get('key');
      this.roomService.getRoom(this.roomKey).subscribe(
        (response: any) => {
          this.roomInfo = response;
          this.roomDoesntExist = false;
      }, (error: any) => {
          console.log(error);
      }
      )
    })
  }

  goToQuiz(){
    const roomInfoSerialized = encodeURIComponent(JSON.stringify(this.roomInfo)); 
    console.log(this.roomInfo.questionsRequiredPerUser);
    this.router.navigate([`/room/${this.roomInfo.key}/questions/0`], {queryParams: {roomInfo: roomInfoSerialized}});
  }
  
}
