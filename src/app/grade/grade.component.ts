import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRoomService } from '../user-room.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit, AfterViewInit {
  roomKey: any;
  gradeInfo: any;
  showExplanation: any[] = [];

  constructor(private route: ActivatedRoute, private userRoomService: UserRoomService) {}


  ngAfterViewInit(): void {
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(this.gradeInfo);
      this.userRoomService.getGradeInfo(params['gradeInfoId']).subscribe(
        (response: any) => {
          this.gradeInfo = response;
        }, (error: any) => {
          console.log(error);
        }
      )
    })


    this.route.paramMap.subscribe(params => {
      this.roomKey = params.get('key');
    })

    console.log(this.gradeInfo.gradedQuestions[0].answers.length)
    for(let i=0; i<this.gradeInfo.gradedQuestions; i++){
      this.showExplanation.push(false);
    }
   
  }

}
