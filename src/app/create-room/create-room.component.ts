import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../Room';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  questionsPerUserValue = 2;
  backgroundColor: string = '#FFFFFF';
  textColor: string = '#000000';
  isPublic = false;
  showAddTopic = false;
  topicList: any[] = [];
  selectedQuestionTypes: any[] = ["MULTIPLECHOICE"];

  questionTypes: any[] = [
    {name: "Multiple Choice", value: "MULTIPLECHOICE"},
    {name: "Free Response", value: "FREERESPONSE"},
    {name: "True False", value: "TRUEFALSE"},
    {name: "Multiple Select", value: "MULTIPLESELECT"},

  ];
  
  publicOrPrivate: any[] = [
    { label: 'Public', value: true },
    { label: 'Private', value: false }
];


  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(data: any){
    var roomData = data.value;
    // console.log(roomData + " " + this.topicList);
    var room: Room = {
      title: roomData.title,
      description: roomData.description,
      isPublic: roomData.isPublic,
      questionsRequiredPerUser: roomData.questionsPerUser,
      bgColor: roomData.backgroundColor,
      textColor: roomData.textColor,
      topics: this.topicList,
      allowedQuestionTypes: roomData.questionType
    } 

    this.roomService.createRoom(room).subscribe(
      (response: any) => {
        this.router.navigate([`room/${response.key}`]);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  recieveTopicList(data: any){
    this.topicList = data;
  }


 

}
