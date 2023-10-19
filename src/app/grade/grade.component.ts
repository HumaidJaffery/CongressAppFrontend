import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit, AfterViewInit {
  roomKey: any;
  gradeInfo: any;
  showExplanation: any[] = [];

  constructor(private route: ActivatedRoute) {}


  ngAfterViewInit(): void {
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.gradeInfo = JSON.parse( decodeURIComponent(params['gradeInfo']) );
      console.log(this.gradeInfo);
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
