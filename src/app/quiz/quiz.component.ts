import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Question } from '../Question';
import { QuestionService } from '../question.service';
import { UserRoomService } from '../user-room.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  roomKey: any;
  numberOfQuestionsSliderHidden = false;
  numOfQuestions: any;
  totalNumberOfQuestions: any;
  userStatus: any;
  questions: any[] = [];

  answers: any[] = [];
  missingAnswersError = false;
  missingAnswers: any = [];

  constructor(private route: ActivatedRoute, private roomService: RoomService, public router: Router, private questionService: QuestionService, private userRoomService: UserRoomService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.roomKey = params.get('key');
    })

    this.userRoomService.getUserRoomInfo(this.roomKey).subscribe(
      (response: any) => {
        this.userStatus = response.userStatus;
        console.log(response);
      },
      (error: any) => {
        this.router.navigate(['home/'])
      }
    )

    this.roomService.getTotalNumberOfQuestions(this.roomKey).subscribe(
      (response: any) => {
        this.totalNumberOfQuestions = response;
        this.numOfQuestions = Math.round(this.totalNumberOfQuestions/2);
      }, (error: any) => {
        console.log(error);
      }
    )

  }

  getQuestions(){
    this.questionService.getQuestions(this.roomKey, this.numOfQuestions).subscribe(
      (response: any) => {
        console.log(response);
        this.questions = response;
      }, (error: any) => {
        console.log(error);
      }
    )
    this.numberOfQuestionsSliderHidden = true;

    //pre-setting all the answers to ""
    for(let i=0; i<this.numOfQuestions; i++){
      this.answers.push("");
    }
    console.log(this.answers);
  }

  selectAnswer(index: number, type: String, value: String){
    console.log(index + " " + type + " " + value);
    this.answers[index] = value
    console.log(this.answers);
  }

  submit(){
    //check if all questions answered
    this.missingAnswers = [];
    if(this.answers.includes("")){
      this.missingAnswersError = true;
      for(let i=0; i<this.answers.length; i++){
        if(this.answers[i] == "") this.missingAnswers.push(i);
      }
      return;
    }

    //sending post request to get grade
    var answeredQuestions = [];
    for(let i=0; i < this.questions.length; i++){
      var answeredQuestion = {
        questionId: this.questions[i].id, 
        selectedAnswer: this.answers[i]
      }
      answeredQuestions.push(answeredQuestion);
    }

    console.log(answeredQuestions);
    this.userRoomService.gradeQuiz(this.roomKey, answeredQuestions).subscribe(
      (response: any) => {
        console.log(response);
        var serializedGradeInfo = encodeURIComponent(JSON.stringify(response)); 
        this.router.navigate([`grade/${this.roomKey}`], {queryParams: {gradeInfo: serializedGradeInfo}});
      }, (error: any) => {
        console.log(error);
      }
    )
  }

}
