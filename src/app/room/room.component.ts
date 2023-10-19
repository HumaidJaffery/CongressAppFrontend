import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../Room';
import { flatMap } from 'rxjs';
import { UserRoomService } from '../user-room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomKey: any = "";
  roomDoesntExist = true;
  roomInfo: any = {};
  userRoomInfo: any;
  
  constructor(private route: ActivatedRoute, private roomService: RoomService, public router: Router, private userRoomService: UserRoomService ) {}
  
  ngOnInit(): void {
    //getting room Info based on key
    this.route.paramMap.subscribe(params => {
      this.roomKey = params.get('key');
      this.roomService.getRoom(this.roomKey).subscribe(
        (response: any) => {
          console.log(response);
          this.roomInfo = response;
          this.roomDoesntExist = false;
      }, (error: any) => {
          console.log(error);
      }
      )
    })

    //getting userStatus
    this.userRoomService.getUserRoomInfo(this.roomKey).subscribe(
      (response: any) =>{
        this.userRoomInfo = response;
        console.log(this.userRoomInfo.userStatus);
        console.log(this.userRoomInfo)
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  joinRoom(){
    console.log(this.roomInfo.questionsRequiredPerUser);
    const routeInfo: any = {
      questionsRequiredPerUser: this.roomInfo.questionsRequiredPerUser,
      allowedQuestionTypes: this.roomInfo.allowedQuestionTypes,
      bgColor: this.roomInfo.bgColor,
      textColor: this.roomInfo.textColor,
      topics: this.roomInfo.topics
    }
    const routeInfoSerialized = encodeURIComponent(JSON.stringify(routeInfo)); 
    this.router.navigate([`/question/${this.roomInfo.key}/${this.userRoomInfo.questionsCreated.length+1}`], {queryParams: {roomInfo: routeInfoSerialized}});
  }

  goToGrade(grade:any ){
    var serializedgradeInfo = encodeURIComponent( JSON.stringify(grade) );
    this.router.navigate([`grade/${this.roomKey}`], {queryParams: {gradeInfo: serializedgradeInfo}});
  }
  

  viewStatistics(){
    this.router.navigate([`statistics/${this.roomKey}`], {queryParams: {name: this.roomInfo.title}});
  }
}
