import { AfterViewInit, Component, Input, OnInit, Output, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Question } from '../Question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements AfterViewInit, OnInit  {
  @ViewChild('choicesDiv') choicesDiv: any; 
  question: string = "";
  correctAnswer: string = ""
  questionType: any;;
  explanation: string = "";
  roomInfo: any;
  questionNumber: any;
  roomKey: any; 

  

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    //getting Room info
    this.route.queryParams.subscribe((params) => {
      this.roomInfo = JSON.parse( decodeURIComponent(params['roomInfo']));
      console.log(this.roomInfo);
      this.questionType = this.roomInfo.allowedQuestionTypes[0];
    })

    

    //question Number (out of total questionsRequiredPerUser)
    this.route.paramMap.subscribe(params => {
      this.questionNumber = params.get('number');
      this.roomKey = params.get('key')
    })
    console.log(this.roomKey);

  }

  ngAfterViewInit() {
    for (let i = 0; i < 4; i++) {
      this.addChoice();
    }
  }

  //-----------------------------------------Topics
  selectedTopics: number[] = [];

  //submit
  addQuestion(){
    //base
    var questionModel: Question = {
      questionType: this.questionType,
      roomKey: this.roomKey,
      question: this.question,
      answers: [],
      correctAnswer: this.correctAnswer,
      explanation: this.explanation,
      topicIds: this.selectedTopics
    }

    //Multiple Choice
    if(this.questionType == 'MULTIPLECHOICE'){
      var answers: string[] = [];
      for(let i=0; i<this.choicesArray.length; i++){
        if(this.choicesArray[i] != null){
          answers.push(this.choicesArray[i].firstChild.value);
        }
      }  
      questionModel.answers = answers;
    //Free Response
    } else if (this.questionType == 'TRUEFALSE')  {
      questionModel.answers = ['true', 'false'];
    }

    this.questionService.createQuestion(questionModel).subscribe(
      (response: any) => {
        console.log(this.questionNumber + " " + (this.roomInfo.questionsRequiredPerUser-1));
        if(this.questionNumber >= this.roomInfo.questionsRequiredPerUser){
          this.router.navigate([`/quiz/${this.roomKey}`]);
          return;
        }
        this.router.navigate([`/question/${this.roomKey}/${parseInt(this.questionNumber) +1}`], 
        {queryParams: {roomInfo: encodeURIComponent(JSON.stringify(this.roomInfo))}});
      }, (error: any) => {
        console.log("Error: " + error);
      }
    )
  }

  //-----------------------------------------MULTIPLE CHOICE:
  
  //If two or less choices remaining
  cantRemoveChoiceMsg: boolean = false;
  //containing all divs of choices (input field  + removeButton + selectAsCorrectBtn), the index of the choice is the id of the div, 
  //and the button is set to delete based on that id 
  //Everytime it deletes, the index in that array is not deleted, but rather set to null, 
  //so it doesnt mess up the other choices indexes
  choicesArray: any[] = [];
  numOfChoices = 0;

  addChoice(){
    this.numOfChoices++;
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, "my-2");
    this.renderer.addClass(div, "p-2");
    this.renderer.addClass(div, "w-3/4");
    div.id = this.choicesArray.length;
    
    const input =  this.renderer.createElement('input');
    this.renderer.addClass(input, "mx-5");
    this.renderer.addClass(input, "my-0");
    this.renderer.addClass(input, "p-2");
    this.renderer.addClass(input, "border-b-2");
    this.renderer.addClass(input, "border-slate-950");
    this.renderer.addClass(input, "w-3/4");
    
    const removeButton = this.renderer.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove Choice';
    this.renderer.listen(removeButton, 'click', () => {
      this.removeChoice(div.id)
    })

    const addCorrectChoiceButton = this.renderer.createElement('button');
    addCorrectChoiceButton.type = 'button';
    addCorrectChoiceButton.id = 'addCorrectChoice';
    addCorrectChoiceButton.textContent = 'Select as Correct Choice';
    this.renderer.listen(addCorrectChoiceButton, 'click', () => {
      this.selectChoice(div.id)
    })

    // const removeCorrectChoiceButton = this.renderer.createElement('button');
    // removeCorrectChoiceButton.type = 'button';
    // removeCorrectChoiceButton.id = 'removeCorrectChoice';
    // removeCorrectChoiceButton.textContent = 'Remove Correct Choice';
    // this.renderer.listen(removeCorrectChoiceButton, 'click', () => {
    //   this.removeCorrectChoice(div.id)
    // })
    // removeCorrectChoiceButton.hidden = true;

    this.choicesArray.push(div);
    this.renderer.appendChild(div, input);
    this.renderer.appendChild(div, removeButton);
    this.renderer.appendChild(div, addCorrectChoiceButton);
    // this.renderer.appendChild(div, removeCorrectChoiceButton);
    this.renderer.appendChild(this.choicesDiv.nativeElement, div);
  }

  removeChoice(index: number): void{
    if(this.numOfChoices<3){
      this.cantRemoveChoiceMsg = true;
      return;
    }
    this.numOfChoices--;
    this.renderer.removeChild(this.choicesDiv.nativeElement, this.choicesArray[index]);
    this.choicesArray[index] = null;
  }

  

  selectChoice(index: number){
    var correctChoice: any = this.choicesArray[index];
    this.correctAnswer = correctChoice.firstChild.value;
    this.renderer.setStyle(correctChoice, 'outline', '2px solid teal');

    for(let i=0; i<this.choicesArray.length; i++){
      if(i != index && this.choicesArray[i] != null) this.choicesArray[i].style.outline = "";
    }
  }

  // removeCorrectChoice(index: number){
  //   var correctChoice: any = this.choicesArray[index];
  //   this.correctChoices.splice(this.correctChoices.indexOf(correctChoice), 1);
  
  //   correctChoice.querySelector('#addCorrectChoice').hidden = false;
  //   correctChoice.querySelector('#removeCorrectChoice').hidden = true;
  //   this.renderer.removeStyle(correctChoice, 'outline');
  // }


  
}
