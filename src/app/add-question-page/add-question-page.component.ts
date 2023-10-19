import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType } from '../QuestionType';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-add-question-page',
  templateUrl: './add-question-page.component.html',
  styleUrls: ['./add-question-page.component.css']
})
export class AddQuestionPageComponent implements OnInit {
  roomInfo: any;
  roomKey: any;
  number: any;

  constructor(private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    //getting Room info
    this.route.queryParams.subscribe((params) => {
      this.roomInfo = params['roomInfo'];
      console.log(this.roomInfo);
    })

    this.route.paramMap.subscribe(param => {
      this.roomKey = param.get('key');
      this.number = param.get('number');
    })
    console.log(this.roomKey + " " + this.number);
    this.router.navigate([`room/${this.roomKey}/question/${this.number}`], {queryParams: {roomInfo: this.roomInfo}});
  }


}
