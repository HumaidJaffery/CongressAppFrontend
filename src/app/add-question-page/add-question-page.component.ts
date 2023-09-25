import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType } from '../QuestionType';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-add-question-page',
  templateUrl: './add-question-page.component.html',
  styleUrls: ['./add-question-page.component.css']
})
export class AddQuestionPageComponent implements OnInit, AfterViewInit {
  @ViewChildren(AddQuestionComponent, {read: ElementRef}) questionComponents!: any;
  roomInfo: any;
  questions: any[] = [];

  constructor(private route: ActivatedRoute, ) {}

  ngAfterViewInit(): void {
    // console.log(this.questionComponents);
    // this.questionComponents.forEach((element: any, index: any) => {
    //   this.questions[index] = element;  
    // });
  }

  ngOnInit(): void {
    //getting Room info
    this.route.queryParams.subscribe((params) => {
      this.roomInfo = JSON.parse( decodeURIComponent(params['roomInfo']));
      console.log(this.roomInfo);
    })

    
    //Adding numberOfQuestionsTo questions
    this.questions.push(false);
    for(let i=0; i<this.roomInfo.questionsRequiredPerUser-1; i++){
      this.questions.push(true);
    }

    

  }

  sendTopics(): number[]{
    var topicIds: any[] = [];
    for(let i=0; i<this.roomInfo.topics.length; i++){
      topicIds.push(this.roomInfo.topics[i]);
    }
    return topicIds;
  }

  onSubmit(data: any){
    console.log(data);
  }

  nextQuestion(event: any){
    // this.questions[event].nativeElement.hidden = true;
  }
}
