import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  username: any;
  roomName: any;
  roomKey: any;
  userRoomRelation: any;

  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.roomKey = params.get('roomKey');
      this.roomName = params.get('roomName');
    })

    this.route.queryParams.subscribe(params => {
      this.userRoomRelation = JSON.parse(decodeURIComponent(params['relation']));
      console.log(this.userRoomRelation);
    })
  }

  navToGradedQuiz(grade: any){
    this.router.navigate([`grade/${this.roomKey}`], {queryParams: {gradeInfoId: grade.id }})
  }

}
