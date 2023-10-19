import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoomService } from '../user-room.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  userRoomRelations: any;
  questions: any;
  averageGrade: any;
  roomKey: any;
  roomName: any;
  viewingMode: string = "USER";

  constructor(private router: Router, private route: ActivatedRoute, private userRoomService: UserRoomService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roomKey = params.get('key');
    })

    this.route.queryParams.subscribe(params => {
      this.roomName = params['name'];
    })

    //checking if user is allowed to check statistics (if they are the owner of the room)
    this.userRoomService.getUserRoomInfo(this.roomKey).subscribe(
      (reponse: any) => {
        if(reponse.userStatus != 'OWNER'){
          this.router.navigate([`room/${this.roomKey}`]);
        }
      }, (error: any) => {
        this.router.navigate(['home']);
      }
    )

    this.userRoomService.getUserRoomStatistics(this.roomKey).subscribe(
      (response: any) => {
        console.log(response);
        this.userRoomRelations = response.userRoomRelations;
        this.questions = response.questions;
        this.averageGrade = response.averageGrade;
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  navToUserStat(relation: any){
    var serializedRelation = encodeURIComponent(JSON.stringify(relation));
    this.router.navigate([`statistics/${this.roomKey}/${this.roomName}/user/${relation.user.username}`], {queryParams: {relation: serializedRelation}})
  }

}
